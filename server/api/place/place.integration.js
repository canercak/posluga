// 'use strict';
// var app = require('../..');
// import request from 'supertest';
// var newPlace;
// describe('Place API:', function() {
//     describe('GET /api/places', function() {
//         var places;
//         beforeEach(function(done) {
//             request(app).get('/api/places').expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 places = res.body;
//                 done();
//             });
//         });
//         it('should respond with JSON array', function() {
//             places.should.be.instanceOf(Array);
//         });
//     });
//     describe('POST /api/places', function() {
//         beforeEach(function(done) {
//             request(app).post('/api/places').send({
//                 name: 'New Place',
//                 info: 'This is the brand new place!!!'
//             }).expect(201).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 newPlace = res.body;
//                 done();
//             });
//         });
//         it('should respond with the newly created place', function() {
//             newPlace.name.should.equal('New Place');
//             newPlace.info.should.equal('This is the brand new place!!!');
//         });
//     });
//     describe('GET /api/places/:id', function() {
//         var place;
//         beforeEach(function(done) {
//             request(app).get('/api/places/' + newPlace._id).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 place = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             place = {};
//         });
//         it('should respond with the requested place', function() {
//             place.name.should.equal('New Place');
//             place.info.should.equal('This is the brand new place!!!');
//         });
//     });
//     describe('PUT /api/places/:id', function() {
//         var updatedPlace;
//         beforeEach(function(done) {
//             request(app).put('/api/places/' + newPlace._id).send({
//                 name: 'Updated Place',
//                 info: 'This is the updated place!!!'
//             }).expect(200).expect('Content-Type', /json/).end(function(err, res) {
//                 if (err) {
//                     return done(err);
//                 }
//                 updatedPlace = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             updatedPlace = {};
//         });
//         it('should respond with the updated place', function() {
//             updatedPlace.name.should.equal('Updated Place');
//             updatedPlace.info.should.equal('This is the updated place!!!');
//         });
//     });
//     describe('DELETE /api/places/:id', function() {
//         it('should respond with 204 on successful removal', function(done) {
//             request(app).delete('/api/places/' + newPlace._id).expect(204).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
//         });
//         it('should respond with 404 when place does not exist', function(done) {
//             request(app).delete('/api/places/' + newPlace._id).expect(404).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
//         });
//     });
// });