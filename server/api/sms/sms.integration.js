'use strict';
var app = require('../..');
var request = require('supertest');
var response;
describe('SMS API:', function() {
    describe('POST /api/sms', function() {
        beforeEach(function(done) {
            request(app).post('/api/sms').send({
                to: "+905322814785",
                message: "test sms message"
            }).expect(201).end((err, res) => {
                if (err) {
                    return done(err);
                }
                response = res.status;
                done();
            });
        });
        it('should respond with successful sms response', function() {
            response.should.equal(201);
        });
    });
});