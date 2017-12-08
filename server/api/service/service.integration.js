// 'use strict';
// var app = require('../..');
// import request from 'supertest';
// import User from '../user/user.model';
// import Service from '../service/service.model';
// var moment = require('moment-timezone');
// var newservice;
// describe('service API:', function() {
//     var service1, service2, service3, service4, service5;
//     // Clear users before testing
//     before(function() {
//         return Service.removeAsync().then(function() {
//             service1 = new Service({
//                 categoryid: '1',
//                 category: 'Academic Lessons',
//                 subcategory: 'Algebra Tutoring'
//             });
//             service1.saveAsync();
//             service2 = new Service({
//                 categoryid: '2',
//                 category: 'Recreational Lessons',
//                 subcategory: 'Yoga Training'
//             });
//             service2.saveAsync();
//             service3 = new Service({
//                 categoryid: '3',
//                 category: 'Arts and Crafts Lessons',
//                 subcategory: 'Piano Lessons'
//             });
//             service3.saveAsync();
//         });
//     });
//     // Clear users after testing
//     after(function() {
//         return Service.removeAsync();
//     });
//     describe('GET /api/services/categories', function() {
//         var services;
//         beforeEach(function(done) {
//             request(app).get('/api/services/categories').expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 services = res.body;
//                 done();
//             });
//         });
//         it('should respond with JSON array', function() {
//             services.should.be.instanceOf(Array);
//         });
//     });
//     describe('GET /api/services/:id/', function() {
//         // var quote;
//         // beforeEach(function(done) {
//         //     servicetest(app).get('/api/services/' + newService._id).expect(200).expect('Content-Type', /json/).end((err, res) => {
//         //         if (err) {
//         //             return done(err);
//         //         }
//         //         quote = res.body;
//         //         done();
//         //     });
//         // });
//         // afterEach(function() {
//         //     quote = {};
//         // });
//         // it('should respond with the quoteed quote', function() {
//         //     //quote.price.value.should.equal(10000);  
//         // });
//     });
//     // describe('GET /api/services/subcategories/:categoryid', function() {
//     //   var service;
//     //   beforeEach(function(done) {
//     //     request(app)
//     //       .get('/api/services/subcatgories/' + newservice.slug)
//     //       .expect(200)
//     //       .expect('Content-Type', /json/)
//     //       .end((err, res) => {
//     //         if (err) {
//     //           return done(err);
//     //         }
//     //         service = res.body;
//     //         done();
//     //       });
//     //   });
//     //   afterEach(function() {
//     //     service = {};
//     //   });
//     //   it('should respond with the requested service', function() {
//     //     service.businesstype.name.should.equal('Şahıs'); 
//     //   }); 
//     // });
// });