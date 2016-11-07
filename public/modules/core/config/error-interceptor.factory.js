/**
 * Error Interceptor in Angular
 * @author TMJP Web Development Team 2016
 */

 (function(app) {
    'use strict';

    angular
        .module(app.moduleName)
        .factory('errorInterceptor',errorInterceptor);

    errorInterceptor.$inject = ['$q', '$log', 'ResponseErrorEvent', 'CORE_MSG'];

    function errorInterceptor($q, $log, ResponseErrorEvent) {
        var interceptor = {
            response: response,
            responseError: responseError
        };

        return interceptor;

        function response(response) {
            var data = response.data;

            if (data && data.error) {
                var errorMessage = buildErrorMessage(data.error);

                // Fire the response error event
                ResponseErrorEvent.fire(errorMessage);
                return $q.reject(errorMessage);
            }

            return response;
        }

        function responseError(response) {
            var errorMessage = buildErrorMessage(response.data);

            switch (response.status) {
                case 403:
                    errorMessage = CORE_MSG.ERR_PERMISSION;
                    break;
                default:
                    $log.error('Server Error:', response);
            }

            // Fire the response error event
            ResponseErrorEvent.fire(errorMessage);
            return $q.reject(errorMessage);
        }

        function buildErrorMessage(errors) {
            // This is for catching errors returned by Laravel validations
            if (angular.isArray(errors) || angular.isObject(errors)) {
                var message = '';

                for (var field in errors) {
                    message += errors[field].pop();
                    message += '<br>';
                }

                return message;
            } else if (angular.isString(errors)) {
                return errors;
            } else {
                return CORE_MSG.ERR_UNKNOWN;
            }
        }
    }
})(angularAppConfig);
