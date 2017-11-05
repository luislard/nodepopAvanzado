/**
 * Author: Luis Rosales
 **/
'use strict';

const express = require('express');
const router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/images' });
var Jimp = require("jimp");
const path = require('path');


// Le pedimos a mongoose que nos de el modelo de agente

//  1ra forma de traer el modelo de agente, sin tener el export en el modelo.
// const mongoose = require('mongoose');
// const Agente = mongoose.model('Agente');

// 2da forma de traer el modelo de agente, teniendo el module exports en el modelo
// importando el modelo 
const Advertisement = require('../../models/Advertisement');

/* GET advertisements. */
router.get('/', function(req, res, next) {

    const name = req.query.name;
    let tags = req.query.tags;
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);
    const isSale = req.query.isSale;
    const isWanted = req.query.isWanted;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    const filter = {};

    if (name) {
        let regexp = new RegExp("\^"+name ,'i');
        filter.name = { $regex: regexp };
    }
    if (isSale && !isWanted) {
        filter.isSale = true;
    }
    if (!isSale && isWanted) {
        filter.isSale = false;
    }

    if(tags){
        
        if( typeof tags === 'string' ) {
            tags = [ tags ];
        }

        filter.tags = { $in: tags };
    }

    if(!isNaN(minPrice) && isNaN(maxPrice)){
        filter.price = { $gte: minPrice };
    }
    if(isNaN(minPrice) && !isNaN(maxPrice)){
        filter.price = { $lte: maxPrice };
    }
    if(!isNaN(minPrice) && !isNaN(maxPrice)){
        filter.price = { $lte: maxPrice, $gte: minPrice };
    }

    // recuperar una lista de agentes
    Advertisement.list(filter, skip, limit).then( lista => {
        res.json({ ok: true, rows: lista });
    }).catch( err => {
        console.log('Error', err);
        next(err);
        return;
    });
});


/* GET advertisement. */
router.get('/:id', function(req, res, next) {
    
    const _id = req.params.id;
    // recuperar un advertisement
    Advertisement.findOne({_id: _id}, (err, advertisement) => {
        if(err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ success: true, result: advertisement });
    });
});
/**
 * POST
 * Crear un advertisement
 */
router.post('/', upload.single('photo'), (req,res,next)=>{
    console.log('/*************/');
    console.log(req.file);
    console.log(req.body);
    console.log('/*************/');
    // res.json({});
    
    // open a file called "lenna.png"
    // Jimp.read('/Users/luisrosales/Documents/projects/keepcoding/backend-avanzado/nodepopAvanzado/public/images/'+req.file.filename, function (err, file) {
    Jimp.read(path.normalize(__dirname+'/../..') +'/public/images/'+req.file.filename, function (err, file) {
        if (err) throw err;
        file.resize(100, 100)            // resize
            .quality(80)                 // set JPEG quality
            .write(path.normalize(__dirname+'/../..') +'/public/images/'+ req.file.filename+"-small-100x100.jpg"); // save
    });

    const advertisement = new Advertisement();

    advertisement.name = req.body.name;
    advertisement.isSale = req.body.isSale;
    advertisement.price = req.body.price;
    advertisement.photo = req.file.filename+"-small-100x100.jpg";
    advertisement.tags = req.body.tags.split(",");
    /**
     * lo guardamos en la base de datos
     */
    advertisement.save((err,savedAdvertisement)=>{
        if (err) {
            console.log('/*************/');
            console.log('Error', err);
            console.log('/*************/');
            next(err);
            return
        }
    
        res.json({ok: true, result: savedAdvertisement});
    
    });

    // res.json(req.body);

});

/**
 * PUT
 * Actualizar un advertisement 
 */
router.put('/:advertisementKey',(req,res,next)=>{
    const _id = req.params.advertisementKey;

    /**
     * actualizo con {new:true} para que regrese el recurso actualizado y no el anterior
     */
    Advertisement.findOneAndUpdate({_id:_id},req.body,{new:true},(err,updatedAdvertisement)=>{
        if (err) {
            console.log('/*************/');
            console.log('Error', err);
            console.log('/*************/');
            next(err);
            return
        }
        res.json({ success: true, result: updatedAdvertisement});
    });
});

/**
 * DELETE
 * Borrar el advertisement
 */
router.delete('/:id', (req,res,next)=>{
    
    const _id = req.params.id; 
    Advertisement.remove({_id: _id },(err)=>{
        if (err) {
            console.log('/*************/');
            console.log('Error', err);
            console.log('/*************/');
            next(err);
            return
        }
        res.json({success:true});

    });



});
module.exports = router;