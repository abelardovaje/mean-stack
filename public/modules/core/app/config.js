/**
 * Initializing Angular App Configuration
 * @author TMJP Web Development Team 2016
 */

(function(window) {
    'use strict';

    var moduleName = 'tmj';
    var moduleSharedDependencies = [
        // insert global shared modules here
        'ui.router',
        'navigation'
    ];

    var config = {
        moduleName : moduleName, //
        moduleSharedDependencies: moduleSharedDependencies,
        registerModule: registerModule
    };

    window.angularAppConfig = config;

    function registerModule(moduleName, dependencies) {
        // create a new module
        angular.module(moduleName, dependencies || []);

        // Add the new module to the core module as dependencies
        angular.module(config.moduleName).requires.push(moduleName);
    }
})(window);
