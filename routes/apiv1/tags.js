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
const Tag = require('../../models/Tag');

/* GET agentes. */
router.get('/', function(req, res, next) {

    const name = req.query.name;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    const filter = {};

    if (name) {
        let regexp = new RegExp("\^"+name ,'i');
        filter.name = { $regex: regexp };
    }

    // recuperar una lista de agentes
    Tag.list(filter, skip, limit).then( lista => {
        res.json({ success: true, rows: lista });
    }).catch( err => {
        console.log('Error', err);
        next(err);
        return;
    });
});


/* GET tag. */
router.get('/:id', function(req, res, next) {
    
    const _id = req.params.id;
    // recuperar un tag
    Tag.findOne({_id: _id}, (err, tag) => {
        if(err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ success: true, result: tag });
    });
});
/**
 * POST
 * Crear un tag
 */
router.post('/',(req,res,next)=>{
    console.log('/*************/');
    console.log(req.body);
    console.log('/*************/');
    // res.json({});    

    const tag = new Tag(req.body);

    /**
     * lo guardamos en la base de datos
     */
    tag.save((err,savedTag)=>{
        if (err) {
            console.log('/*************/');
            console.log('Error', err);
            console.log('/*************/');
            next(err);
            return
        }
    
        res.json({success: true, result: savedTag});
    
    });



});

/**
 * PUT
 * Actualizar un tag 
 */
router.put('/:tagKey',(req,res,next)=>{
    const _id = req.params.tagKey;

    /**
     * actualizo con {new:true} para que regrese el recurso actualizado y no el anterior
     */
    Tag.findOneAndUpdate({_id:_id},req.body,{new:true},(err,updatedTag)=>{
        if (err) {
            console.log('/*************/');
            console.log('Error', err);
            console.log('/*************/');
            next(err);
            return
        }
        res.json({ success: true, result: updatedTag});
    });
});

/**
 * DELETE
 * Borrar el tag
 */
router.delete('/:id', (req,res,next)=>{
    
    const _id = req.params.id; 
    Tag.remove({_id: _id },(err)=>{
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