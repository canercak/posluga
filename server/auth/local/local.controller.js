'use strict';
// ********************* Mail ***********************
var passport = require('passport');
var jwt = require('jsonwebtoken');
var mail = require('../../mail');
var smsservice = require('../../sms/sms.service');
var config = require('../../config/environment');
//var User = require('mongoose').model('User');
var auth = require('../auth.service');
var _ = require('lodash');
var Provider = require('../../api/provider/provider.model');
var User = require('../../api/user/user.model');
var Request = require('../../api/request/request.model');
var Quote = require('../../api/quote/quote.model');
var Service = require('../../api/service/service.model');
var Transaction = require('../../api/transaction/transaction.model');
var moment = require('moment-timezone');
// ********************* Mail ***********************
exports.root = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {
            message: 'Something went wrong, please try again.'
        });
        var token = auth.signToken(user._id, user.role);
        res.json({
            token: token
        });
    })(req, res, next)
};
/**
 * Send confirmation mail
 */
exports.sendMailAdressConfirmationMail = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(error, user) { // don't ever give out the password or salt
        if (error) return next(error);
        if (!user) return res.json(401);
        var mailConfirmationToken = jwt.sign({
            user: user._id,
            email: user.email
        }, config.secrets.mailConfirmation, {
            expiresInMinutes: 1
        })
        mail.mailConfirmation.sendMail(user, mailConfirmationToken, function() {
            res.send(200);
        });
    });
};
/**
 * Confirm mail address
 */
exports.confirmMailAddress = function(req, res, next) {
    console.log('Confirm email address');
    var mailConfirmationToken = req.param('mailConfirmationToken');
    jwt.verify(mailConfirmationToken, config.secrets.mailConfirmation, function(error, data) {
        if (error) return res.send(403);
        if (data.exp < Date.now()) return res.send(403, {
            message: "The validation token has expired. You should signin and ask for a new one."
        });
        User.findById(data.user, function(error, user) {
            if (error) return res.send(403, {
                message: "The validation token is invalid. You should signin and ask for a new one."
            });
            if (!user) return res.send(403, {
                message: "The validation token is invalid. You should signin and ask for a new one."
            });
            user.confirmMail(function() {
                res.json({
                    token: auth.signToken(user._id)
                });
            });
        });
    });
};
/**
 * Send password resset mail
 */
exports.resetPassword = function(req, res, next) {
    var email = String(req.query.email);
    var newPassword = String(req.query.newPassword);
    console.log('Reset mail: ' + email);
    console.log('newPassword: ' + newPassword);
    User.findOne({
        email: email
    }, function(error, user) {
        if (error) return next(error);
        if (!user) return res.send(403, {
            message: 'This email address is unknown'
        });
        var passwordResetToken = jwt.sign({
            userId: user._id,
            newPassword: newPassword
        }, config.secrets.passwordReset, {
            expiresInMinutes: 60 * 24
        })
        mail.passwordReset.sendMail(user, passwordResetToken, function() {
            res.send(200);
        });
    });
};
/**
 * Reset and change password
 */
exports.confirmResetedPassword = function(req, res, next) {
    var passwordResetToken = String(req.body.passwordResetToken);
    jwt.verify(passwordResetToken, config.secrets.passwordReset, function(error, data) {
        if (error) return res.send(403);
        User.findById(data.userId, function(error, user) {
            if (error) return res.send(403);
            user.password = data.newPassword;
            user.save(function(error) {
                if (error) return res.send(403);
                res.json({
                    token: auth.signToken(user._id)
                });
            });
        });
    });
};
/////////////////////
exports.sendWelcomeEmail = function(user) {
    console.log(user)
    mail.welcome.sendMail(user, function() {
        console.log('welcome email sent')
    });
};
exports.sendLoginEmail = function(req, res, next) {
    var email = String(req.query.email);
    var pass = String(req.query.pass);
    console.log('Login mail to: ' + email);
    User.findOne({
        email: email
    }, function(error, user) {
        if (error) return next(error);
        if (!user) return res.send(403, {
            message: 'This email address is unknown'
        });
        mail.login.sendMail(user, pass, function() {
            console.log('login email sent')
            res.send(200);
        });
    });
};
exports.sendLoginProviderEmail = function(req, res, next) {
    var email = String(req.query.email);
    var pass = String(req.query.pass);
    console.log('Login mail to: ' + email);
    User.findOne({
        email: email
    }, function(error, user) {
        if (error) return next(error);
        if (!user) return res.send(403, {
            message: 'This email address is unknown'
        });
        mail.loginprovider.sendMail(user, pass, function() {
            console.log('login email sent')
            user.loginemailsent = true;
            user.save().then(function() {
                res.send(200);
            })
        });
    });
};
exports.sendProviderEmail = function(provider) {
    User.findOne({
        _id: provider.user
    }, function(error, user) {
        mail.profile.sendMail(user, provider.searchtext, provider._id, function() {
            console.log('login email sent')
        });
    });
};
exports.sendOpportunityEmail = function(req, res, next) {
    var userid = String(req.query.userid);
    var requestid = String(req.query.requestid);
    var providerid = String(req.query.providerid);
    User.findOne({
        _id: userid
    }, function(error, user) {
        if (error) return next(error);
        if (!user) return res.send(403, {
            message: 'user error on opp mail'
        });
        Provider.findOne({
            _id: providerid
        }, function(error, provider) {
            if (error) return next(error);
            if (!provider) return res.send(403, {
                message: 'request error on opp mail'
            });
            Request.findOne({
                _id: requestid
            }, function(error, request) {
                if (error) return next(error);
                if (!request) return res.send(403, {
                    message: 'request error on opp mail'
                });
                Service.findOne({
                    _id: request.service
                }, function(error, service) {
                    if (error) return next(error);
                    if (!service) return res.send(403, {
                        message: 'service error on opp mail'
                    });
                    console.log('oopportunity email sending')
                    mail.opportunity.sendMail(user, provider, request, service, function() {
                        console.log('oopportunity email sent')
                        request.opportunityemailsent.push(provider._id);
                        request.save().then(function() {
                            res.send(200);
                        })
                    });
                })
            })
        });
    });
};
exports.updateProviderQuoteStats = function(happened, provider, quote, oldquote, requestuser) {
    var score = {
        files: 10,
        documents: 10,
        links: 15,
        established: 5,
        securitycheck: 5,
        recommended: 10,
        givequote: 5,
        quotewin: 5,
        quotecomplete: 5,
        addreview: 0 //quote.comment.rating
    }
    var transaction = undefined;
    if (happened === "updatequote") {
        if (quote.latestevent === "givequote") {
            ///providerupdatedquoteeemail
        } else if (quote.latestevent === "addchatmessage") {
            quote.save().then(function() {
                console.log("SENT MESSAGE")
                var lastitem = quote.chat.slice(-1).pop()
                var toprovider = false;
                if (lastitem.sendertype !== 'provider') {
                    toprovider = true;
                }
                var message = lastitem.message;
                sendSendMesageEmail(quote.request.user, quote.provider, quote.request, quote.request.service, toprovider, quote._id, message);
                sendAdminMessageEmail(quote.request.user, quote.provider, quote.request, quote.request.service, toprovider, quote._id, message);
            })
        } else if (quote.latestevent === "selectquote") {
            console.log("SELECTED QUOTE")
            provider.stats.quotewincount += 1;
            provider.stats.totalscore += score.quotewin;
            quote.selected = true;
            quote.request.status = {
                'objectid': 4,
                'date': quote.date
            }
            quote.save().then(function() {
                quote.request.save().then(function() {
                    provider.save();
                    sendSelectQuoteEmail(quote.request.user, quote.provider, quote.request, quote.request.service);
                    sendAdminSelectQuoteEmail(quote.request.user, quote.provider, quote.request, quote.request.service);
                    sendWinQuoteEmail(quote.provider.user, quote.provider, quote.request, quote.request.service, quote._id);
                })
            })
        } else if (quote.latestevent === "providercompletequote") {
            quote.servicecomplete = true;
            provider.stats.finishedcount += 1;
            provider.stats.totalscore += score.quotecomplete;
            provider.stats.turnover.value += quote.price.value;
            var pricearray = [];
            provider.quotes.forEach(function(q) {
                pricearray.push(q.price.value);
            })
            var max_of_array = Math.max.apply(Math, pricearray);
            var min_of_array = Math.min.apply(Math, pricearray);
            provider.stats.prices.lowprice = min_of_array;
            provider.stats.prices.highprice = max_of_array;
            quote.request.status = {
                'objectid': 5,
                'date': moment().tz('Europe/Kiev')
            }
            var transactiondata = {
                transactionType: {
                    objectid: 2,
                    name: 'Quote Commission to Pay',
                    add: false
                },
                amount: {
                    value: quote.commission.value,
                    currency: 'грн.'
                },
                date: moment().tz("Europe/Kiev"),
                user: provider.user._id,
                provider: provider._id,
                quote: quote._id,
                request: quote.request._id,
            }
            transaction = new Transaction(transactiondata);
            sendWriteReviewEmail(quote.request.user, quote.provider, quote.request, quote.request.service, quote._id);
            sendAdminCompleteQuoteEmail(quote.request.user, quote.provider, quote.request, quote.request.service);
            quote.save().then(function() {
                quote.request.save().then(function() {
                    provider.save().then(function() {
                        if (transaction) {
                            Transaction.find({
                                'user': provider.user._id
                            }, function(err, transactions) {
                                var total = 0;
                                transactions.forEach(function(t) {
                                    if (t.transactionType.add === false) {
                                        total -= t.amount.value;
                                    } else {
                                        total += t.amount.value;
                                    }
                                })
                                if (transaction.transactionType.add === false) {
                                    total -= quote.commission.value;
                                } else {
                                    total += quote.commission.value;
                                }
                                transaction.balance = {
                                    value: total,
                                    currency: 'грн.'
                                }
                                transaction.save();
                            })
                        }
                    })
                })
            })
        } else if (quote.latestevent === "userreviewquote") {
            requestuser.stats.reviewcount += 1;
            requestuser.stats.reviewscore += quote.comment.rating;
            requestuser.stats.scorefive = String((requestuser.stats.reviewscore * 5) / (requestuser.stats.reviewcount * 5))
            if (quote.comment.rating === 5 || quote.comment.rating === 4 ) {
                requestuser.stats.happycount += 1;
            }
            provider.stats.reviewcount += 1;
            provider.stats.reviewscore += quote.comment.rating;
            provider.stats.totalscore += quote.comment.rating;
            provider.stats.scorefive = String((provider.stats.reviewscore * 5) / (provider.stats.reviewcount * 5))
            if (quote.comment.rating === 5 || quote.comment.rating === 4 ) {
                provider.stats.happycount += 1;
            }
            provider.save().then(function() {
                requestuser.save().then(function() {
                    sendReadReviewEmail(quote.provider.user, quote.provider, quote.request, quote.request.service, quote._id);
                    sendAdminCompleteQuoteEmail(quote.request.user, quote.provider, quote.request, quote.request.service);
                })
            })
        } else if (quote.latestevent === "updateuserreviewquote") {
            provider.stats.reviewscore -= oldquote.comment.rating;
            provider.stats.reviewscore += quote.comment.rating;
            provider.stats.totalscore -= oldquote.comment.rating;
            provider.stats.totalscore += quote.comment.rating;
            provider.stats.scorefive = String((provider.stats.reviewscore * 5) / (provider.stats.reviewcount * 5))
            if (oldquote.comment.rating === 5 || oldquote.comment.rating === 4 ) {
                provider.stats.happycount -= 1;
            }
            if (quote.comment.rating === 5 || quote.comment.rating === 4 ) {
                provider.stats.happycount += 1;
            }
            provider.save()
        } else if (quote.latestevent === "userreviewcompletequote") {
            quote.servicecomplete = true;
            provider.stats.finishedcount += 1;
            provider.stats.totalscore += score.quotecomplete;
            provider.stats.turnover.value += quote.price.value;
            var pricearray = [];
            provider.quotes.forEach(function(q) {
                pricearray.push(q.price.value);
            })
            var max_of_array = Math.max.apply(Math, pricearray);
            var min_of_array = Math.min.apply(Math, pricearray);
            provider.stats.prices.lowprice = min_of_array;
            provider.stats.prices.highprice = max_of_array;
            quote.request.status = {
                'objectid': 5,
                'date': moment().tz('Europe/Kiev')
            }
            provider.stats.reviewcount += 1;
            provider.stats.reviewscore += quote.comment.rating;
            provider.stats.totalscore += quote.comment.rating;
            provider.stats.scorefive = String((provider.stats.reviewscore * 5) / (provider.stats.reviewcount * 5))
            if (quote.comment.rating === 5 || quote.comment.rating === 4 ) {
                provider.stats.happycount += 1;
            }
            var transactiondata = {
                transactionType: {
                    objectid: 2,
                    name: 'Quote Commission to Pay',
                    add: false
                },
                amount: {
                    value: quote.commission.value,
                    currency: 'грн.'
                },
                date: moment().tz("Europe/Kiev"),
                user: provider.user._id,
                provider: provider._id,
                quote: quote._id,
                request: quote.request._id,
            }
            transaction = new Transaction(transactiondata);
            sendUserReviewCompleteQuoteEmail(quote.request.user, quote.provider, quote.request, quote.request.service, quote._id);
            sendAdminCompleteQuoteEmail(quote.request.user, quote.provider, quote.request, quote.request.service);
            quote.save().then(function() {
                quote.request.save().then(function() {
                    provider.save().then(function() {
                        if (transaction) {
                            Transaction.find({
                                'user': provider.user._id
                            }, function(err, transactions) {
                                var total = 0;
                                transactions.forEach(function(t) {
                                    if (t.transactionType.add === false) {
                                        total -= t.amount.value;
                                    } else {
                                        total += t.amount.value;
                                    }
                                })
                                if (transaction.transactionType.add === false) {
                                    total -= quote.commission.value;
                                } else {
                                    total += quote.commission.value;
                                }
                                transaction.balance = {
                                    value: total,
                                    currency: 'грн.'
                                }
                                transaction.save();
                            })
                        }
                    })
                })
            })
        }
    } else if (happened === "providerrecommended") {
        provider.stats.finishedcount += 1;
        provider.stats.totalscore += score.recommended;
        provider.save();
    } else if (happened === "providerupdatelink") {
        provider.stats.totalscore += score.links;
        provider.stats.profile.issues.forEach(function(issue, index) {
            if (issue.objectid === 2) {
                provider.stats.profile.issues.splice(index, 1);
                provider.stats.profile.completeness += score.links;
                provider.stats.totalscore += score.links;
            }
        })
        provider.save();
    } else if (happened === "providerupdateimage") {
        provider.stats.totalscore += score.files;
        provider.stats.profile.issues.forEach(function(issue, index) {
            if (issue.objectid === 1) {
                provider.stats.profile.issues.splice(index, 1);
                provider.stats.profile.completeness += score.files;
                provider.stats.totalscore += score.files;
            }
        })
        provider.save();
    } else if (happened === "providerupdatedoc") {
        provider.stats.totalscore += score.documents;
        provider.stats.profile.issues.forEach(function(issue, index) {
            if (issue.objectid === 3) {
                provider.stats.profile.issues.splice(index, 1);
                provider.stats.profile.completeness += score.documents;
                provider.stats.totalscore += score.documents;
            }
        })
        provider.save();
    } else if (happened === "providerupdatedate") {
        provider.stats.totalscore += score.established;
        provider.stats.profile.issues.forEach(function(issue, index) {
            if (issue.objectid === 4) {
                provider.stats.profile.issues.splice(index, 1);
                provider.stats.profile.completeness += score.established;
                provider.stats.totalscore += score.established;
            }
        })
        provider.save();
    } else if (happened === "setrankprofilecomplete") {
        Provider.find({
            'oblast.ru': provider.oblast.ru,
            'service': provider.service,
            'stats.totalscore': {
                $gt: provider.stats.totalscore
            }
        }, function(err, docs) {
            if (!docs) {
                provider.stats.priority.initial = 1;
            } else {
                provider.stats.priority.initial = docs.length + 1;
            }
            var potential = 100 - provider.stats.profile.completeness;
            Provider.find({
                'oblast.ru': provider.oblast.ru,
                'service': provider.service,
                'stats.totalscore': {
                    $gt: provider.stats.totalscore + potential
                }
            }, function(err, docs2) {
                if (!docs2) {
                    provider.stats.priority.profilecomplete = 1;
                } else {
                    provider.stats.priority.profilecomplete = docs2.length + 1;
                }
                provider.save();
            });
        });
    }
}
exports.sendNewrequestEmail = function(userid, requestid) {
    User.findOne({
        _id: userid
    }, function(error, user) {
        console.log("2222222");
        console.log(user);
        Request.findOne({
            _id: requestid
        }, function(error, request) {
            Service.findOne({
                _id: request.service
            }, function(error, service) {
                console.log("222222");
                console.log(user);
                mail.newrequest.sendMail(user, request, service, function() {
                    console.log('new request email sent')
                });
            })
        })
    });
};
exports.sendAdminNewRequestEmail = function(userid, requestid) {
    Request.findOne({
        _id: requestid
    }, function(error, request) {
        Service.findOne({
            _id: request.service
        }, function(error, service) {
            User.find({
                $or: [{
                    'role': 'admin'
                }, {
                    'role': 'editor'
                }]
            }, function(err, docs) {
                if (!err) {
                    console.log(docs)
                    docs.forEach(function(doc) {
                        mail.adminnewrequest.sendMail(doc, request, service, function() {
                            console.log('admin request email sent')
                        });
                    })
                }
            });
        });
    });
};
exports.sendChosenProviderEmail = function(userid, requestid) {
    Request.findOne({
        _id: requestid
    }, function(error, request) {
        Service.findOne({
            _id: request.service
        }, function(error, service) {
            Provider.findOne({
                _id: request.preselectedprovider
            }, function(error, provider) {
                User.findOne({
                    _id: userid
                }, function(error, usercustomer) {
                    User.findOne({
                        _id: provider.user
                    }, function(err, userprovider) {
                        if (!err) {
                            console.log('chosen provider email sending')
                            mail.chosenprovider.sendMail(usercustomer, userprovider, provider, request, service, function() {
                                console.log('chosen provider email sent')
                            });
                        }
                    });
                });
            });
        });
    });
};
exports.sendAdminUpdateRequestEmail = function(userid, requestid) {
    Request.findOne({
        _id: requestid
    }, function(error, request) {
        Service.findOne({
            _id: request.service
        }, function(error, service) {
            User.find({
                $or: [{
                    'role': 'admin'
                }, {
                    'role': 'editor'
                }]
            }, function(err, docs) {
                if (!err) {
                    docs.forEach(function(doc) {
                        mail.adminupdaterequest.sendMail(doc, request, service, function() {
                            console.log('admin update request email sent')
                        });
                    })
                }
            });
        });
    });
};
exports.sendAllquotesEmail = function(user, request) {
    mail.allquotes.sendMail(user, request, request.service, function() {
        console.log('all quote email sent');
    });
};
exports.sendAdminAllquotesEmail = function(user, request) {
    User.find({
        role: {
            '$ne': 'user'
        }
    }).exec(function(err, adminseditors) {
        adminseditors.forEach(function(admineditor) {
            mail.adminallquotes.sendMail(admineditor, user, request, request.service, function() {
                console.log('all quote email sent');
            });
        })
    })
};
exports.sendNewquoteEmail = function(provider, request, quoteid) {
    Quote.findById(quoteid).exec(function(err, quote) {
        if (err) {
            console.log("errrorrrrr:" + err);
        }
        if (!quote) {
            return "not found  quote";
        }
        mail.newquote.sendMail(request.user, request, quote, provider, function() {
            console.log('new quote email sent');
            var smsbody = {
                requestid: request._id,
                quoteid: quote._id,
                userid: request.user._id,
                language: request.user.language,
                to: request.phone,
                price: quote.price.value,
                sequence: request.sequence
            }
            console.log(smsbody)
            //smsservice.newQuote(smsbody)
        })
    });
}
exports.sendAdminNewquoteEmail = function(provider, request, quoteid) {
    Quote.findById(quoteid).exec(function(err, quote) {
        if (err) {
            console.log("errrorrrrr:" + err);
        }
        if (!quote) {
            return "not found  quote";
        }
        User.find({
            role: {
                '$ne': 'user'
            }
        }).exec(function(err, adminseditors) {
            console.log(adminseditors)
            adminseditors.forEach(function(admineditor) {
                mail.adminnewquote.sendMail(admineditor, request.user, request, quote, provider, function() {
                    console.log('new quote email sent');
                })
            })
        })
    });
}
exports.sendAdminNewquoteEmail = function(provider, request, quoteid) {
    Quote.findById(quoteid).exec(function(err, quote) {
        if (err) {
            console.log("errrorrrrr:" + err);
        }
        if (!quote) {
            return "not found  quote";
        }
        User.find({
            role: {
                '$ne': 'user'
            }
        }).exec(function(err, adminseditors) {
            adminseditors.forEach(function(admineditor) {
                mail.adminnewquote.sendMail(admineditor, request.user, request, quote, provider, function() {
                    console.log('new quote email sent');
                })
            })
        })
    });
}
exports.sendSelectQuoteEmail = function(user, provider, request, service) {
    sendSelectQuoteEmail(user, provider, request, service)
}

function sendAdminSelectQuoteEmail(user, provider, request, service) {
    User.find({
        role: {
            '$ne': 'user'
        }
    }).exec(function(err, adminseditors) {
        adminseditors.forEach(function(admineditor) {
            mail.adminselectquote.sendMail(admineditor, user, provider, request, service, function() {
                console.log('select quote email sent');
            })
        })
    })
}

function sendAdminCompleteQuoteEmail(user, provider, request, service) {
    User.find({
        role: {
            '$ne': 'user'
        }
    }).exec(function(err, adminseditors) {
        adminseditors.forEach(function(admineditor) {
            mail.admincompletequote.sendMail(admineditor, user, provider, request, service, function() {
                console.log('admin complete quote email sent');
            })
        })
    })
}

function sendAdminMessageEmail(user, provider, request, service, toprovider, quoteid, message) {
    User.find({
        role: {
            '$ne': 'user'
        }
    }).exec(function(err, adminseditors) {
        adminseditors.forEach(function(admineditor) {
            mail.adminnewmessage.sendMail(admineditor, provider, request, service, toprovider, quoteid, message, function() {
                console.log('admin adminnewmessage email sent');
            })
        })
    })
}
exports.sendAdminMessageEmail = function(user, provider, request, service, toprovider, quoteid, message) {
    sendSendMesageEmail(user, provider, request, service, toprovider, quoteid, message)
}

function sendSelectQuoteEmail(user, provider, request, service) {
    mail.selectquote.sendMail(user, provider, request, service, function() {
        console.log('select quote email sent');
    })
}
exports.sendWinQuoteEmail = function(user, provider, request, service, quoteid) {
    sendWinQuoteEmail(user, provider, request, service, quoteid)
}

function sendWinQuoteEmail(user, provider, request, service, quoteid, message) {
    mail.winquote.sendMail(user, provider, request, service, quoteid, message, function() {
        console.log('win quote email sent');
    })
}
exports.sendSendMesageEmail = function(user, provider, request, service, toprovider, quoteid, message) {
    sendSendMesageEmail(user, provider, request, service, toprovider, quoteid, message)
}

function sendSendMesageEmail(user, provider, request, service, toprovider, quoteid, message) {
    console.log("bbbb2")
    mail.newmessage.sendMail(user, provider, request, service, toprovider, quoteid, message, function() {
        console.log('new message email sent');
    })
}
exports.sendWriteReviewEmail = function(user, provider, request, service, quoteid) {
    sendWriteReviewEmail(user, provider, request, service, quoteid)
}
exports.sendUserReviewCompleteQuoteEmail = function(user, provider, request, service, quoteid) {
    sendUserReviewCompleteQuoteEmail(user, provider, request, service, quoteid)
}

function sendWriteReviewEmail(user, provider, request, service, quoteid) {
    mail.writereview.sendMail(user, provider, request, service, quoteid, function() {
        console.log('write review email sent');
    })
}

function sendUserReviewCompleteQuoteEmail(user, provider, request, service, quoteid) {
    mail.readreview.sendMail(user, provider, request, service, quoteid, function() {
        console.log('read review email sent');
    })
}