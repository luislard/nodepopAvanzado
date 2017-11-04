const request = require('supertest');
const should = require('should');

// llamamos a la base de datos real
var mongoose = require('mongoose');

// Iniciamos mockgoose para crear la base de datos de testing
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
const mongodbFixtures = require('./mongodb.fixtures');

const app = require('../app');


describe('***** Advertisement API TESTs *****', function(){

    before(async function(){ //
        await mockgoose.prepareStorage();
        await mongoose.connect('mongodb://example.com/TestingDb', {
            useMongoClient: true
        });
        // limpiamos las definiciones de modelos y esquemas de mongoose
        mongoose.models = {};
        mongoose.modelSchemas = {};
        await mongodbFixtures.initAdvertisements();
        
    });

    // despues de cada test
    afterEach(function(){

    });

    it('should return 200', function(done){
        request(app)
        .get('/apiv1/advertisements')
        .expect(200, done)
    });
    it('should return json response', function(done){
        request(app)
        .get('/apiv1/advertisements')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('should return json response with the property success', function(done){
        request(app)
        .get('/apiv1/advertisements')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            res.body.should.have.property('success');
        done();
      });
    });
    it('should return json response with the property success equal to true', function(done){
        request(app)
        .get('/apiv1/advertisements')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            res.body.should.have.property('success', true);
        done();
      });
    });
    it('should return json with property rows and 4 objects', function(done){
        request(app)
        .get('/apiv1/advertisements')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            res.body.rows.length.should.equal(4);
        done();
      });
    });
    it('should return json with property rows and 1 objects', function(done){
        request(app)
        .get('/apiv1/advertisements?name=bici')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            res.body.rows.length.should.equal(1);
        done();
      });
    });
    it('should return json with property rows and 1 objects', function(done){
        request(app)
        .get('/apiv1/advertisements?name=bici')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            res.body.rows.length.should.equal(1);
        done();
      });
    });
    
});