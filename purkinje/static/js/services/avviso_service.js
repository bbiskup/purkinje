(function() {
    'use strict';
    /**
     * Desktop notifications
     * see http://caniuse.com/#search=notifications
     *
     * If the browser does not support notifications, the message will
     * be logged to the browser console
     */
    angular.module('purkinje').factory('AvvisoService', ['$window',
        AvvisoService
    ]);

    function AvvisoService($window) {
        var hasNotifications = $window.Notification !== undefined;

        if (hasNotifications) {
            Notification.requestPermission();
        }

        var Service = {
            notify: function(title, body) {
                if (hasNotifications) {
                    var notif = new Notification(title, {
                        body: body,
                        // icon: // TODO: add purkinje icon (only displayed in Firefox; not Chrome)
                    });
                } else {
                    console.debug(title + ': ' + body);
                }
            }
        };

        return Service;
    }
})();
