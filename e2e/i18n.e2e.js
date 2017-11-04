const request = require('supertest');

// llamamos a la base de datos real
var mongoose = require('mongoose');

// Iniciamos mockgoose para crear la base de datos de testing
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

const app = require('../app');


describe('***** Home Page TESTs *****', function(){

    before(async function(){ //
        await mockgoose.prepareStorage();
        await mongoose.connect('mongodb://example.com/TestingDb', {
            useMongoClient: true
        });
        // limpiamos las definiciones de modelos y esquemas de mongoose
        mongoose.models = {};
        mongoose.modelSchemas = {};
    });

    // despues de cada test
    afterEach(function(){

    });

    it('should return 200', function(done){
        request(app)
        .get('/')
        .expect(200, done)
    });
});