// 'use strict';
// var app = require('../..');
// import User from '../user/user.model';
// import Provider from '../provider/provider.model';
// import requesttest from 'supertest';
// var moment = require('moment-timezone');
// var newRequest;
// var user;
// var provider;
// var puser;
// describe('Request API:', function() {
//     // Clear users before testing
//     before(function() {
//         return User.removeAsync().then(function() {
//             user = new User({
//                 name: 'Fake User',
//                 email: 'test@example.com',
//                 password: 'password'
//             });
//             user.saveAsync().then(function() {
//                 puser = new User({
//                     name: 'Fake User',
//                     email: 'ptest@example.com',
//                     password: 'password'
//                 });
//                 puser.saveAsync();
//             }).then(function() {
//                 Provider.find({}).removeAsync().then(() => {
//                     provider = new Provider({
//                         firstname: "Bill",
//                         lastname: "Cosby",
//                         phone: "5323223213",
//                         address: "21th Madaline Way, Astoria New York",
//                         searchtext: "Cleaning",
//                         description: "I can clean a house very well",
//                         termsaccepted: true,
//                         user: puser._id,
//                         documents: [{
//                             docname: "Cleaning School Licence",
//                             docnumber: "K1TLN",
//                             docdate: moment.tz("2016-01-04", "Europe/Kiev"),
//                             docfile: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5228%24gregplitt.png",
//                             doctype: {
//                                 objectid: 2,
//                                 name: "Licence"
//                             }
//                         }],
//                         payment_types: {
//                             card: true,
//                             cash: true
//                         },
//                         established: {
//                             objectid: 2016,
//                             name: "2016"
//                         },
//                         district: {
//                             objectid: 1,
//                             name: "Konak"
//                         },
//                         province: {
//                             objectid: 1,
//                             name: "İzmir"
//                         },
//                         files: [{
//                             location: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5549%24overcomeapproachanxiety-171d936471e4b4a0d560a0d227403c24.jpg"
//                         }],
//                         subcategory: {
//                             objectid: 1,
//                             name: "Home Cleaning"
//                         },
//                         category: {
//                             objectid: 1,
//                             name: "Cleaning"
//                         },
//                         businesstype: {
//                             objectid: 1,
//                             name: "Personal"
//                         }
//                     })
//                     provider.saveAsync();
//                 })
//             })
//         });
//     });
//     // Clear users after testing
//     after(function() {
//         User.removeAsync();
//         Provider.removeAsync();
//     });
//     describe('POST /api/requests', function() {
//         beforeEach(function(done) {
//             requesttest(app).post('/api/requests').send({
//                 searchtext: "Home Cleaning",
//                 category: {
//                     objectid: 1,
//                     name: "Cleaning"
//                 },
//                 subcategory: {
//                     objectid: 1,
//                     name: "Home Cleaning"
//                 },
//                 questions: [{
//                     objectid: 1,
//                     qtype: "Multiselect",
//                     question: "How often?",
//                     answers: [{
//                         objectid: 1,
//                         answer: "Weekly"
//                     }],
//                     options: [{
//                         objectid: 1,
//                         answer: "Weekly"
//                     }, {
//                         objectid: 2,
//                         answer: "Every 2 weeks"
//                     }]
//                 }, {
//                     objectid: 2,
//                     qtype: "Singleselect",
//                     question: "How many rooms?",
//                     answers: [{
//                         objectid: 1,
//                         answer: "1"
//                     }],
//                     options: [{
//                         objectid: 1,
//                         answer: "1"
//                     }, {
//                         objectid: 2,
//                         answer: "2"
//                     }, {
//                         objectid: 3,
//                         answer: "3"
//                     }]
//                 }],
//                 description: "I want full cleaning including carpets.",
//                 files: [{
//                     location: "https://cdn4.iconfinder.com/data/icons/twitter-ui-set/128/Persone-128.png"
//                 }],
//                 province: {
//                     objectid: 1,
//                     name: "İzmir"
//                 },
//                 district: {
//                     objectid: 1,
//                     name: "Konak"
//                 },
//                 when: "Today",
//                 phone: '5322814785',
//                 email: 'canercak@gmail.com',
//                 date: moment.tz("Europe/Kiev"),
//                 code: '76732',
//                 codesent: moment.tz("Europe/Kiev"),
//                 phonenotify: {
//                     objectid: 1,
//                     name: "Don't share my number"
//                 },
//                 user: user._id
//             }).expect(201).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 newRequest = res.body;
//                 done();
//             });
//         });
//         it('should respond with the newly created request', function() {
//             newRequest.searchtext.should.equal('Home Cleaning');
//             newRequest.description.should.equal('I want full cleaning including carpets.');
//             newRequest.category.name.should.equal("Cleaning");
//         });
//     });
//     // describe('GET /api/requests', function() {
//     //   var requests;  
//     //   beforeEach(function(done) {
//     //     requesttest(app)
//     //       .get('/api/requests')
//     //       .expect(200)
//     //       .expect('Content-Type', /json/)
//     //       .end((err, res) => {
//     //         if (err) {
//     //           return done(err);
//     //         }
//     //         requests = res.body;
//     //         done();
//     //       });
//     //   });
//     //   it('should respond with JSON array', function() {
//     //     requests.should.be.instanceOf(Array);
//     //   });
//     // });
//     describe('GET /api/requests/user/:userid', function() {
//         var requests;
//         beforeEach(function(done) {
//             requesttest(app).get('/api/requests/user/' + user._id).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 requests = res.body;
//                 done();
//             });
//         });
//         it('should respond with JSON array', function() {
//             requests.should.be.instanceOf(Array);
//         });
//     });
//     describe('GET /api/requests/:id', function() {
//         var request;
//         beforeEach(function(done) {
//             requesttest(app).get('/api/requests/' + newRequest._id).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 request = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             request = {};
//         });
//         it('should respond with the requested request', function() {
//             request.phone.should.equal('5322814785');
//             request.category.name.should.equal("Cleaning");
//         });
//     });
//     describe('GET /api/requests/code', function() {
//         var request;
//         beforeEach(function(done) {
//             requesttest(app).get('/api/requests/code/' + newRequest._id + '/' + newRequest.code).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 request = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             request = {};
//         });
//         it('should respond with the requested request for code', function() {
//             request.category.name.should.equal("Cleaning");
//         });
//     });
//     describe('GET /api/requests/phone', function() {
//         var request;
//         beforeEach(function(done) {
//             requesttest(app).get('/api/requests/phone/' + newRequest._id + '/' + newRequest.phone).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 request = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             request = {};
//         });
//         it('should respond with the requested request for phone', function() {
//             request.category.name.should.equal("Cleaning");
//         });
//     });
//     describe('GET /api/requests/phoneuser', function() {
//         var request;
//         beforeEach(function(done) {
//             requesttest(app).get('/api/requests/phoneuser/' + newRequest.user + '/' + newRequest.phone).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 request = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             request = {};
//         });
//         it('should respond with the requested request for phone', function() {
//             request.category.name.should.equal("Cleaning");
//         });
//     });
//     describe('GET /api/requests/phoneoremail', function() {
//         var request;
//         beforeEach(function(done) {
//             requesttest(app).get('/api/requests/phoneoremail/' + newRequest.email + '/' + newRequest.phone).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 request = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             request = {};
//         });
//         it('should respond with the requested request for phone', function() {
//             request.result.should.equal('sms');
//         });
//     });
//     describe('GET /api/requests/userlast', function() {
//         var request;
//         beforeEach(function(done) {
//             requesttest(app).get('/api/requests/userlast/' + newRequest.user).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 request = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             request = {};
//         });
//         it('should respond with the users last request', function() {
//             //request.user.name.should.equal("Fake User");  
//         });
//     });
//     describe('PUT /api/requests/:id', function() {
//         var updatedRequest;
//         beforeEach(function(done) {
//             requesttest(app).put('/api/requests/' + newRequest._id).send({
//                 searchtext: "Office Cleaning",
//                 subcategory: {
//                     objectid: 2,
//                     name: "Office Cleaning"
//                 },
//                 description: "I want office cleaning",
//                 potentialproviders: [provider._id]
//             }).expect(200).expect('Content-Type', /json/).end(function(err, res) {
//                 if (err) {
//                     return done(err);
//                 }
//                 updatedRequest = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             updatedRequest = {};
//         });
//         it('should respond with the updated request', function() {
//             updatedRequest.searchtext.should.equal('Office Cleaning');
//             updatedRequest.description.should.equal('I want office cleaning');
//             updatedRequest.subcategory.name.should.equal("Office Cleaning");
//         });
//     });
//     // describe('GET /api/requests/userproviders/:userid', function() { 
//     //   var requests;  
//     //   beforeEach(function(done) {
//     //     requesttest(app)
//     //       .get('/api/requests/userproviders/'+ puser._id)
//     //       .expect(200)
//     //       .expect('Content-Type', /json/)
//     //       .end((err, res) => {
//     //         if (err) {
//     //           return done(err);
//     //         }
//     //         requests = res.body;
//     //         done();
//     //       });
//     //   });
//     //   it('should respond with JSON array', function() {
//     //     requests.should.be.instanceOf(Array);
//     //   });
//     // }); 
//     describe('DELETE /api/requests/:id', function() {
//         it('should respond with 204 on successful removal', function(done) {
//             requesttest(app).delete('/api/requests/' + newRequest._id).expect(204).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
//         });
//         it('should respond with 404 when request does not exist', function(done) {
//             requesttest(app).delete('/api/requests/' + newRequest._id).expect(404).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
//         });
//     });
// });