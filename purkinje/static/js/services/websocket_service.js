(function() {
    'use strict';
    /**
     * Service for WebSocket connections.
     * Based on http://clintberry.com/2013/angular-js-websocket-service/
     */
    angular
        .module('purkinje')
        .factory('WebSocketService', ['$window', '$q', '$rootScope', 'WebSocket',
            WebSocketService
        ]);

    function WebSocketService($window, $q, $rootScope, WebSocket) {
        var Service = {},
            callbacks = {},
            currentCallbackId = 0,
            ws = null,
            wsURLTemplate = _.template('ws://<%= hostname %>:<%= port %>/subscribe'),
            wsURL = wsURLTemplate($window.location);

        console.debug('WS URL:', wsURL);

        var wsPromise = $q(function(resolve, reject) {
            ws = new WebSocket(wsURL);

            ws.onopen = function() {
                console.debug('WebSocket opened');
                resolve(ws);

                Service.registerClient();
                notifyWebSocketStateChange(ws);
            };

            ws.onerror = function(err) {
                console.error('WebSocket error:', err);
                reject(ws);
                notifyWebSocketStateChange(ws);
            };

            ws.onclose = function(){
                notifyWebSocketStateChange(ws);
            };

            ws.onmessage = function(message) {
                // console.debug('Incoming WS message:', message.data);
                listener(JSON.parse(message.data));
            };
        });

        function sendRequest(request) {
            return wsPromise.then(function() {
                var defer = $q.defer(),
                    callbackId = getCallbackId();

                callbacks[callbackId] = {
                    time: new Date(),
                    cb: defer
                };

                request.callback_id = callbackId;
                console.debug('Sending WS request', request);
                ws.send(JSON.stringify(request));
                return defer.promise;
            });
        }

        function listener(data) {
            var messageObj = data;

            // resolve if the ID is known
            var msgID = messageObj.callback_id;
            if (callbacks.hasOwnProperty(msgID)) {
                console.debug('Received data from WebSocket (' + msgID + '): ' + messageObj);
                var theCallback = callbacks[msgID];
                console.debug(theCallback);
                $rootScope.apply(theCallback.cb.resolve(messageObj.data));
                delete callbacks[msgID];
            } else {
                console.debug('WS event:', messageObj);
                $rootScope.$broadcast('webSocketMsg', messageObj);
            }
        }

        function getCallbackId() {
            ++currentCallbackId;
            if (currentCallbackId > 10000) {
                currentCallbackId = 0;
            }
            return currentCallbackId;
        }

        function notifyWebSocketStateChange(webSocket) {
            $rootScope.$emit('webSocketStateChange', webSocket.url, webSocket.readyState);
        }

        Service.registerClient = function() {
            var request = {
                type: 'register_client'
            };

            var promise = sendRequest(request);
            return promise;
        };
        return Service;
    }
})();