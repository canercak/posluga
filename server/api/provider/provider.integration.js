// 'use strict';
// var app = require('../..');
// import request from 'supertest';
// import User from '../user/user.model';
// var moment = require('moment-timezone');
// var newProvider;
// describe('Provider API:', function() {
//     var user;
//     // Clear users before testing
//     before(function() {
//         return User.removeAsync().then(function() {
//             user = new User({
//                 name: 'Fake User',
//                 email: 'test1@example.com',
//                 password: 'password'
//             });
//             return user.saveAsync();
//         });
//     });
//     // Clear users after testing
//     after(function() {
//         return User.removeAsync();
//     });
//     describe('GET /api/providers', function() {
//         var providers;
//         beforeEach(function(done) {
//             request(app).get('/api/providers').expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 providers = res.body;
//                 done();
//             });
//         });
//         it('should respond with JSON array', function() {
//             providers.should.be.instanceOf(Array);
//         });
//     });
//     describe('POST /api/providers', function() {
//         beforeEach(function(done) {
//             request(app).post('/api/providers').send({
//                 firstname: "Hasan",
//                 lastname: "Pulur",
//                 phone: "5323223213",
//                 address: "21th Madaline Way, Astoria New York",
//                 logo: {
//                     location: 'http://www.nationwidecleaningservicesinc.com/wp-content/uploads/2013/10/sidebar_cleaning_man.png'
//                 },
//                 searchtext: "Ev Temizliği",
//                 description: "I can clean a house very well",
//                 termsaccepted: true,
//                 user: user._id,
//                 stats: {
//                     scorefive: '4.5',
//                     finishedcount: 32,
//                     happycount: 30,
//                     prices: {
//                         lowprice: 8000,
//                         highprice: 25000,
//                         currency: 'TL'
//                     }
//                 },
//                 documents: [{
//                     docname: "Cleaning School Licence",
//                     docnumber: "K1TLN",
//                     docdate: moment.tz("2016-01-04", "Europe/Kiev"),
//                     docfile: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5228%24gregplitt.png",
//                     doctype: {
//                         objectid: 2,
//                         name: "Licence"
//                     }
//                 }],
//                 payment_types: [{
//                     objectid: 1,
//                     name: 'kredi kartı'
//                 }, {
//                     objectid: 2,
//                     name: 'nakit'
//                 }],
//                 established: {
//                     objectid: 2016,
//                     name: "2016"
//                 },
//                 neighborhood: {
//                     objectid: 1,
//                     name: "Yenişehir"
//                 },
//                 district: {
//                     objectid: 1,
//                     name: "Konak"
//                 },
//                 province: {
//                     objectid: 1,
//                     name: "İzmir"
//                 },
//                 files: [{
//                     location: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5549%24overcomeapproachanxiety-171d936471e4b4a0d560a0d227403c24.jpg"
//                 }],
//                 subcategory: {
//                     objectid: 3,
//                     name: "Ev Temizliği"
//                 },
//                 category: {
//                     objectid: 1,
//                     name: "Temizlik"
//                 },
//                 businesstype: {
//                     objectid: 1,
//                     name: "Şahıs"
//                 }
//             }).expect(201).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 newProvider = res.body;
//                 done();
//             });
//         });
//         it('should respond with the newly created provider', function() {
//             newProvider.businesstype.name.should.equal('Şahıs');
//         });
//     });
//     describe('GET /api/providers/:id', function() {
//         var provider;
//         beforeEach(function(done) {
//             request(app).get('/api/providers/' + newProvider._id).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 provider = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             provider = {};
//         });
//         it('should respond with the requested provider', function() {
//             provider.businesstype.name.should.equal('Şahıs');
//         });
//     });
//     describe('GET /api/providers/slug/:slug', function() {
//         var provider;
//         beforeEach(function(done) {
//             request(app).get('/api/providers/slug/' + newProvider.slug).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 provider = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             provider = {};
//         });
//         it('should respond with the requested provider', function() {
//             provider.businesstype.name.should.equal('Şahıs');
//         });
//     });
//     describe('GET /api/providers/user/:userid', function() {
//         var provider;
//         beforeEach(function(done) {
//             request(app).get('/api/providers/user/' + newProvider.user).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 provider = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             provider = {};
//         });
//         it('should respond with the requested providers of the user', function() {
//             provider[0].businesstype.name.should.equal('Şahıs');
//         });
//     });
//     describe('PUT /api/providers/:id', function() {
//         var updatedProvider;
//         beforeEach(function(done) {
//             request(app).put('/api/providers/' + newProvider._id).send({
//                 firstname: "James",
//                 lastname: "Billmore",
//                 phone: "+905322814785",
//             }).expect(200).expect('Content-Type', /json/).end(function(err, res) {
//                 if (err) {
//                     return done(err);
//                 }
//                 updatedProvider = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             updatedProvider = {};
//         });
//         it('should respond with the updated provider', function() {
//             updatedProvider.firstname.should.equal('James');
//             updatedProvider.lastname.should.equal('Billmore');
//             updatedProvider.phone.should.equal('+905322814785');
//         });
//     });
//     describe('DELETE /api/providers/:id', function() {
//         it('should respond with 204 on successful removal', function(done) {
//             request(app).delete('/api/providers/' + newProvider._id).expect(204).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
//         });
//         it('should respond with 404 when provider does not exist', function(done) {
//             request(app).delete('/api/providers/' + newProvider._id).expect(404).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
//         });
//     });
// });