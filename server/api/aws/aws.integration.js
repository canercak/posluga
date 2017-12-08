// 'use strict';
// var app = require('../..');
// import User from '../user/user.model';
// import request from 'supertest';
// var moment = require('moment-timezone');
// var newAws;
// describe('AWS API:', function() {
//   describe('GET /api/aws/getS3Policy', function() {
//     var aws; 
//     beforeEach(function(done) {
//       request(app)
//         .get('/api/aws/getS3Policy')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           aws = res.body;
//           done();
//         });
//     });
//     it('should respond with JSON object', function() {
//       aws.should.be.instanceOf(Object);
//     }); 
//   });
//   describe('GET /api/aws/config', function() {
//     var aws; 
//     beforeEach(function(done) {
//       request(app)
//         .get('/api/aws/config')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           aws = res.body;
//           done();
//         });
//     });
//     it('should respond with JSON object', function() {
//       aws.should.be.instanceOf(Object);
//     }); 
//   });
// });