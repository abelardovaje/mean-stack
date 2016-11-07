/**
 * Response Error Event Handler in Angular
 * @author TMJP Web Development Team 2016
 */
 
(function(app) {
    'use strict';

    angular
        .module(app.moduleName)
        .factory('ResponseErrorEvent', ResponseErrorEvent);

    ResponseErrorEvent.$inject = [];

    /* @ngInject */
    function ResponseErrorEvent() {
        var eventName = 'response-error',
            service = {
                fire: fire,
                listen: listen
            };

        return service;

        function fire(data) {
            $rootScope.$emit(eventName, data);
        }

        function listen(callback) {
            var deregister = $rootScope.$on(eventName, listener);

            function listener() {
                if (callback) {
                    callback.apply($rootScope, arguments);
                }
            }

            return deregister;
        }
    }
})(angularAppConfig);
