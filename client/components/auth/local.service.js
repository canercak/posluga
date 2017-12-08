'use strict';
angular.module('poslugaApp').factory('Local', function($resource) {
    return $resource('/auth/local/:controller', {
        id: '@_id'
    }, {
        verifyMail: {
            method: 'GET',
            params: {
                controller: 'mailconfirmation'
            }
        },
        confirmMail: {
            method: 'POST',
            params: {
                controller: 'mailconfirmation'
            }
        },
        resetPassword: {
            method: 'GET',
            params: {
                controller: 'passwordreset'
            }
        },
        confirmPassword: {
            method: 'POST',
            params: {
                controller: 'passwordreset'
            }
        },
        sendLoginEmail: {
            method: 'GET',
            params: {
                controller: 'loginemail'
            }
        },
        sendLoginProviderEmail: {
            method: 'GET',
            params: {
                controller: 'loginprovideremail'
            }
        },
        sendOpportunityEmail: {
            method: 'GET',
            params: {
                controller: 'opportunityemail'
            }
        }
    });
});