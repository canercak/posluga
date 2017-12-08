// 'use strict';
// var app = require('../..');
// import User from '../user/user.model';
// import Request from '../request/request.model';
// import Provider from '../provider/provider.model';
// import Quote from '../quote/quote.model';
// import quotetest from 'supertest';
// var moment = require('moment-timezone');
// var newQuote;
// describe('Quote API:', function() {
//     before(function() {})
//     after(function() {
//         User.removeAsync();
//         Request.removeAsync();
//         Provider.removeAsync();
//         Quote.removeAsync();
//     });
//     describe('GET /api/quotes', function() {
//         var quotes;
//         beforeEach(function(done) {
//             quotetest(app).get('/api/quotes').expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 quotes = res.body;
//                 done();
//             });
//         });
//         it('should respond with JSON array', function() {
//             quotes.should.be.instanceOf(Array);
//         });
//     });
//     describe('POST /api/quotes', function() {
//         var user;
//         var request;
//         var request2;
//         var provider;
//         var provider2;
//         User.removeAsync().then(function() {
//             user = new User({
//                 name: 'Fake User',
//                 email: 'test@example.com',
//                 password: 'password'
//             });
//             user.saveAsync().then(function() {
//                 Request.removeAsync().then(function() {
//                     request = new Request({
//                         searchtext: 'Boya Badana',
//                         category: {
//                             objectid: 1,
//                             name: "Cleaning"
//                         },
//                         subcategory: {
//                             objectid: 1,
//                             name: "Boya Badana"
//                         },
//                         questions: [{
//                             'objectid': 1,
//                             'qtype': 'textinput',
//                             'question': 'Kaç metrekare ev/oda boyanacak?',
//                             'width': '100px',
//                             answers: [{
//                                 'objectid': 1,
//                                 'option': '100'
//                             }],
//                             'options': [{
//                                 'objectid': 1,
//                                 'option': ''
//                             }]
//                         }, {
//                             'objectid': 2,
//                             'qtype': 'Singleselect',
//                             'question': 'Bu alan kaç oda?',
//                             answers: [{
//                                 'objectid': 1,
//                                 'option': '1 Oda'
//                             }],
//                             'options': [{
//                                 'objectid': 1,
//                                 'option': '1 Oda'
//                             }, {
//                                 'objectid': 2,
//                                 'option': '2 Oda'
//                             }, {
//                                 'objectid': 3,
//                                 'option': '3 Oda'
//                             }, {
//                                 'objectid': 4,
//                                 'option': '4 Oda'
//                             }, {
//                                 'objectid': 5,
//                                 'option': '5 Oda'
//                             }, {
//                                 'objectid': 6,
//                                 'option': 'Daha Büyük'
//                             }]
//                         }, {
//                             'objectid': 3,
//                             'qtype': 'Singleselect',
//                             'question': 'Tavanlar boyanacak mı?',
//                             answers: [{
//                                 'objectid': 1,
//                                 'option': 'Evet'
//                             }],
//                             'options': [{
//                                 'objectid': 1,
//                                 'option': 'Evet'
//                             }, {
//                                 'objectid': 2,
//                                 'option': 'Hayır'
//                             }]
//                         }, {
//                             'objectid': 4,
//                             'qtype': 'Singleselect',
//                             'question': 'Fiyata malzeme dahil olsun mu?',
//                             answers: [{
//                                 'objectid': 1,
//                                 'option': 'Malzeme Dahil'
//                             }],
//                             'options': [{
//                                 'objectid': 1,
//                                 'option': 'Malzeme Dahil'
//                             }]
//                         }],
//                         description: "Tüm Evimi Boyatmak istiyorum",
//                         files: [{
//                             location: "https://cdn4.iconfinder.com/data/icons/twitter-ui-set/128/Persone-128.png"
//                         }],
//                         province: {
//                             objectid: 1,
//                             name: "İzmir"
//                         },
//                         district: {
//                             objectid: 1,
//                             name: "Konak"
//                         },
//                         when: "Today",
//                         date: moment.tz("Europe/Kiev"),
//                         phone: '5322814780',
//                         termsaccepted: true,
//                         email: 'alihanbilir@gmail.com',
//                         code: 1234,
//                         notes: 'ayrıca kartonpiyer yaptırmayı da düşünüyor',
//                         codesent: moment.tz("Europe/Kiev"),
//                         status: {
//                             'objectid': 1
//                         },
//                         phonenotify: {
//                             objectid: 1,
//                             name: "Teklif veren arayabilir"
//                         },
//                         user: user._id
//                     });
//                     request.saveAsync().then(function() {
//                         Provider.removeAsync().then(function() {
//                             provider = new Provider({
//                                 firstname: "Bill",
//                                 lastname: "Cosby",
//                                 phone: "5323223213",
//                                 address: "21th Madaline Way, Astoria New York",
//                                 searchtext: "Cleaning",
//                                 description: "I can clean a house very well",
//                                 termsaccepted: true,
//                                 documents: [{
//                                     docname: "Cleaning School Licence",
//                                     docnumber: "K1TLN",
//                                     docdate: moment.tz("2016-01-04", "Europe/Kiev"),
//                                     docfile: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5228%24gregplitt.png",
//                                     doctype: {
//                                         objectid: 2,
//                                         name: "Licence"
//                                     }
//                                 }],
//                                 payment_types: {
//                                     card: true,
//                                     cash: true
//                                 },
//                                 established: {
//                                     objectid: 2016,
//                                     name: "2016"
//                                 },
//                                 district: {
//                                     objectid: 1,
//                                     name: "Konak"
//                                 },
//                                 province: {
//                                     objectid: 1,
//                                     name: "İzmir"
//                                 },
//                                 files: [{
//                                     location: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5549%24overcomeapproachanxiety-171d936471e4b4a0d560a0d227403c24.jpg"
//                                 }],
//                                 subcategory: {
//                                     objectid: 1,
//                                     name: "Home Cleaning"
//                                 },
//                                 category: {
//                                     objectid: 1,
//                                     name: "Cleaning"
//                                 },
//                                 businesstype: {
//                                     objectid: 1,
//                                     name: "Personal"
//                                 }
//                             });
//                             provider.saveAsync();
//                             provider2 = new Provider({
//                                 firstname: "Bill",
//                                 lastname: "Cosby",
//                                 phone: "5323223213",
//                                 address: "21th Madaline Way, Astoria New York",
//                                 searchtext: "Cleaning",
//                                 description: "I can clean a house very well",
//                                 termsaccepted: true,
//                                 documents: [{
//                                     docname: "Cleaning School Licence",
//                                     docnumber: "K1TLN",
//                                     docdate: moment.tz("2016-01-04", "Europe/Kiev"),
//                                     docfile: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5228%24gregplitt.png",
//                                     doctype: {
//                                         objectid: 2,
//                                         name: "Licence"
//                                     }
//                                 }],
//                                 payment_types: {
//                                     card: true,
//                                     cash: true
//                                 },
//                                 established: {
//                                     objectid: 2016,
//                                     name: "2016"
//                                 },
//                                 district: {
//                                     objectid: 1,
//                                     name: "Konak"
//                                 },
//                                 province: {
//                                     objectid: 1,
//                                     name: "İzmir"
//                                 },
//                                 files: [{
//                                     location: "https://mybucketdev.s3.amazonaws.com/s3UploadExample%2F5549%24overcomeapproachanxiety-171d936471e4b4a0d560a0d227403c24.jpg"
//                                 }],
//                                 subcategory: {
//                                     objectid: 1,
//                                     name: "Home Cleaning"
//                                 },
//                                 category: {
//                                     objectid: 1,
//                                     name: "Cleaning"
//                                 },
//                                 businesstype: {
//                                     objectid: 1,
//                                     name: "Personal"
//                                 }
//                             });
//                             provider2.saveAsync().then(function() {
//                                 request2 = new Request({
//                                     searchtext: 'Boya Badana',
//                                     category: {
//                                         objectid: 1,
//                                         name: "Cleaning"
//                                     },
//                                     subcategory: {
//                                         objectid: 1,
//                                         name: "Boya Badana"
//                                     },
//                                     questions: [{
//                                         'objectid': 1,
//                                         'qtype': 'textinput',
//                                         'question': 'Kaç metrekare ev/oda boyanacak?',
//                                         'width': '100px',
//                                         answers: [{
//                                             'objectid': 1,
//                                             'option': '100'
//                                         }],
//                                         'options': [{
//                                             'objectid': 1,
//                                             'option': ''
//                                         }]
//                                     }, {
//                                         'objectid': 2,
//                                         'qtype': 'Singleselect',
//                                         'question': 'Bu alan kaç oda?',
//                                         answers: [{
//                                             'objectid': 1,
//                                             'option': '1 Oda'
//                                         }],
//                                         'options': [{
//                                             'objectid': 1,
//                                             'option': '1 Oda'
//                                         }, {
//                                             'objectid': 2,
//                                             'option': '2 Oda'
//                                         }, {
//                                             'objectid': 3,
//                                             'option': '3 Oda'
//                                         }, {
//                                             'objectid': 4,
//                                             'option': '4 Oda'
//                                         }, {
//                                             'objectid': 5,
//                                             'option': '5 Oda'
//                                         }, {
//                                             'objectid': 6,
//                                             'option': 'Daha Büyük'
//                                         }]
//                                     }, {
//                                         'objectid': 3,
//                                         'qtype': 'Singleselect',
//                                         'question': 'Tavanlar boyanacak mı?',
//                                         answers: [{
//                                             'objectid': 1,
//                                             'option': 'Evet'
//                                         }],
//                                         'options': [{
//                                             'objectid': 1,
//                                             'option': 'Evet'
//                                         }, {
//                                             'objectid': 2,
//                                             'option': 'Hayır'
//                                         }]
//                                     }, {
//                                         'objectid': 4,
//                                         'qtype': 'Singleselect',
//                                         'question': 'Fiyata malzeme dahil olsun mu?',
//                                         answers: [{
//                                             'objectid': 1,
//                                             'option': 'Malzeme Dahil'
//                                         }],
//                                         'options': [{
//                                             'objectid': 1,
//                                             'option': 'Malzeme Dahil'
//                                         }]
//                                     }],
//                                     description: "Tüm Evimi Boyatmak istiyorum",
//                                     files: [{
//                                         location: "https://cdn4.iconfinder.com/data/icons/twitter-ui-set/128/Persone-128.png"
//                                     }],
//                                     province: {
//                                         objectid: 1,
//                                         name: "İzmir"
//                                     },
//                                     district: {
//                                         objectid: 1,
//                                         name: "Konak"
//                                     },
//                                     when: "Today",
//                                     date: moment.tz("Europe/Kiev"),
//                                     phone: '5322814780',
//                                     termsaccepted: true,
//                                     email: 'alihanbilir@gmail.com',
//                                     budget: null,
//                                     code: 1234,
//                                     notes: 'ayrıca kartonpiyer yaptırmayı da düşünüyor',
//                                     codesent: moment.tz("Europe/Kiev"),
//                                     status: {
//                                         'objectid': 1,
//                                         'name': 'Yeni',
//                                         'condition': 'Aktif'
//                                     },
//                                     phonenotify: {
//                                         objectid: 1,
//                                         name: "Teklif veren arayabilir"
//                                     },
//                                     user: user._id
//                                 });
//                                 request2.saveAsync().then(function() {
//                                     Quote.create({
//                                         price: {
//                                             value: 20000,
//                                             currency: 'TL'
//                                         },
//                                         commission: {
//                                             percentage: 500,
//                                             value: 500
//                                         },
//                                         request: request._id,
//                                         provider: provider2._id,
//                                         questions: [{
//                                             'objectid': 1,
//                                             'qtype': 'Singleselect',
//                                             'question': 'Malzeme dahil mi?',
//                                             answers: [{
//                                                 'objectid': 1,
//                                                 'option': 'Evet'
//                                             }],
//                                             'options': [{
//                                                 'objectid': 1,
//                                                 'option': 'Evet'
//                                             }, {
//                                                 'objectid': 1,
//                                                 'option': 'Hayır'
//                                             }]
//                                         }, {
//                                             'objectid': 2,
//                                             'qtype': 'Singleselect',
//                                             'question': 'Ekipte kaç kişi çalışacak?',
//                                             answers: [{
//                                                 'objectid': 1,
//                                                 'option': '3'
//                                             }],
//                                             'options': [{
//                                                 'objectid': 2,
//                                                 'option': '2'
//                                             }, {
//                                                 'objectid': 2,
//                                                 'option': '2'
//                                             }, {
//                                                 'objectid': 3,
//                                                 'option': '3'
//                                             }]
//                                         }],
//                                         date: moment.tz("Europe/Kiev"),
//                                         chat: [{
//                                             message: "Beni Seç Beni Seç",
//                                             date: moment.tz("Europe/Kiev"),
//                                             sender: user._id
//                                         }]
//                                     })
//                                 })
//                             })
//                         });
//                     })
//                 });
//             })
//         });
//         beforeEach(function(done) {
//             quotetest(app).post('/api/quotes').send({
//                 price: {
//                     value: 10000,
//                     currency: 'TL'
//                 },
//                 commission: {
//                     percentage: 500,
//                     value: 500
//                 },
//                 request: request._id,
//                 provider: provider._id,
//                 questions: [{
//                     'objectid': 1,
//                     'qtype': 'Singleselect',
//                     'question': 'Malzeme dahil mi?',
//                     answers: [{
//                         'objectid': 1,
//                         'option': 'Evet'
//                     }],
//                     'options': [{
//                         'objectid': 1,
//                         'option': 'Evet'
//                     }, {
//                         'objectid': 1,
//                         'option': 'Hayır'
//                     }]
//                 }, {
//                     'objectid': 2,
//                     'qtype': 'Singleselect',
//                     'question': 'Ekipte kaç kişi çalışacak?',
//                     answers: [{
//                         'objectid': 1,
//                         'option': '3'
//                     }],
//                     'options': [{
//                         'objectid': 2,
//                         'option': '2'
//                     }, {
//                         'objectid': 2,
//                         'option': '2'
//                     }, {
//                         'objectid': 3,
//                         'option': '3'
//                     }]
//                 }],
//                 date: moment.tz("Europe/Kiev"),
//                 chat: [{
//                     message: "Beni Seç Beni Seç",
//                     date: moment.tz("Europe/Kiev"),
//                     sender: user._id
//                 }]
//             }).expect(201).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 newQuote = res.body;
//                 done();
//             });
//         });
//         it('should respond with the newly created quote', function() {
//             newQuote.price.value.should.equal(10000);
//         });
//     });
//     describe('GET /api/quotes/:id/', function() {
//         var quote;
//         beforeEach(function(done) {
//             quotetest(app).get('/api/quotes/' + newQuote._id).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 quote = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             quote = {};
//         });
//         it('should respond with the quoteed quote', function() {
//             quote.price.value.should.equal(10000);
//         });
//     });
//     // describe('GET /api/quotes/comments/:providerid', function() {
//     //   var quote;
//     //   beforeEach(function(done) {
//     //     quotetest(app)
//     //       .get('/api/quotes/provider/' + newQuote.provider)
//     //       .expect(200)
//     //       .expect('Content-Type', /json/)
//     //       .end((err, res) => {
//     //         if (err) {
//     //           return done(err);
//     //         }
//     //         quote = res.body;
//     //         done();
//     //       });
//     //   });
//     //   afterEach(function() {
//     //     quote = {};
//     //   });
//     //   it('should respond with the quoteed quote', function() {
//     //     quote.price.value.should.equal(10000);  
//     //   });
//     // });
//     describe('GET /api/quotes/otherquotes', function() {
//         var quote;
//         beforeEach(function(done) {
//             quotetest(app).get('/api/quotes/otherquotes/' + newQuote.request + '/' + newQuote.provider).expect(200).expect('Content-Type', /json/).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 quote = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             quote = {};
//         });
//         it('should respond with quotes from other providers than the given provider', function() {});
//     });
//     describe('PUT /api/quotes/:id', function() {
//         var updatedQuote;
//         beforeEach(function(done) {
//             quotetest(app).put('/api/quotes/' + newQuote._id).send({
//                 price: {
//                     value: 50000,
//                     currency: 'TL'
//                 }
//             }).expect(200).expect('Content-Type', /json/).end(function(err, res) {
//                 if (err) {
//                     return done(err);
//                 }
//                 updatedQuote = res.body;
//                 done();
//             });
//         });
//         afterEach(function() {
//             updatedQuote = {};
//         });
//         it('should respond with the updated quote', function() {
//             updatedQuote.price.value.should.equal(50000);
//         });
//     });
//     describe('DELETE /api/quotes/:id', function() {
//         it('should respond with 204 on successful removal', function(done) {
//             quotetest(app).delete('/api/quotes/' + newQuote._id).expect(204).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
//         });
//         it('should respond with 404 when quote does not exist', function(done) {
//             quotetest(app).delete('/api/quotes/' + newQuote._id).expect(404).end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 done();
//             });
//         });
//     });
// });