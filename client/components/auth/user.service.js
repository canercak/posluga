'use strict';
angular.module('poslugaApp').factory('User', function($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
    }, {
        changePassword: {
            method: 'PUT',
            params: {
                controller: 'password'
            }
        },
        changeNotifications: {
            method: 'PUT',
            params: {
                controller: 'notifications'
            }
        },
        changeName: {
            method: 'PUT',
            params: {
                controller: 'name'
            }
        },
        verifyphone: {
            method: 'PUT',
            params: {
                controller: 'phone'
            }
        },
        get: {
            method: 'GET',
            params: {
                id: 'me'
            }
        }
    });
});