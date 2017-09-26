/**
 * Author: Luis Rosales
 **/
'use strict';

const express = require('express');
const router = express.Router();

// Le pedimos a mongoose que nos de el modelo de agente

//  1ra forma de traer el modelo de agente, sin tener el export en el modelo.
// const mongoose = require('mongoose');
// const Agente = mongoose.model('Agente');

// 2da forma de traer el modelo de agente, teniendo el module exports en el modelo
// importando el modelo 
const Advertisement = require('../../models/Advertisement');

/* GET agentes. */
router.get('/', function(req, res, next) {

    const name = req.query.name;
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
        res.json({ success: true, rows: lista });
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
router.post('/',(req,res,next)=>{
    console.log('/*************/');
    console.log(req.body);
    console.log('/*************/');
    // res.json({});    

    const advertisement = new Advertisement(req.body);

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
    
        res.json({success: true, result: savedAdvertisement});
    
    });



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