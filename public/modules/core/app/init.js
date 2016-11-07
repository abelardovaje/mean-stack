/**
 * Initialize the core module and its dependencies
 * @author TMJP Web Development Team 2016
 */
 
(function(app) {
    'use strict';

    // start defining the module and its dependencies
    angular
        .module(app.moduleName, app.moduleSharedDependencies);

    // wait for the document to load before initializing app
    angular.element(document).ready(init);

    // initialize the app
    function init() {
        angular.bootstrap(document, [app.moduleName]);
    }
})(angularAppConfig);
