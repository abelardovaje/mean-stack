/**
 * Bootstrapper in Angular
 * @author TMJP Web Development Team 2016
 */

(function(app) {
    'use strict';

    angular
        .module(app.moduleName)
        .config(bootstrapConfig);

    bootstrapConfig.$inject = ['$httpProvider'];

    function bootstrapConfig($httpProvider) {
        $httpProvider.interceptors.push('errorInterceptor');
    }
})(angularAppConfig);
