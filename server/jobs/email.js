// var email = require('some-email-lib'),
//     User = require('../models/user-model.js');

// module.exports = function(agenda) {
//   agenda.define('registration email', function(job, done) {
//     User.get(job.attrs.data.userId, function(err, user) {
//        if(err) return done(err);
//        email(user.email(), 'Thanks for registering', 'Thanks for registering ' + user.name(), done);
//      });
//   });

//   agenda.define('reset password', function(job, done) {
//     // etc etc
//   })

//   // More email related jobs
// }