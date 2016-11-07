/**
 * Default Core Message Constants
 * Can be overriden if neccessary by deferedBoostrapper
 * @author TMJP Web Development Team 2016
 */
(function(app) {
    'use strict';

    var coreMsg = {
        'ERR_PERMISSION' : 'Sorry, you have no permission.',
        'ERR_UNKNOWN' : 'Unknown error occured.',
    };

    angular
        .module(app.moduleName)
        .config('CORE_MSG', coreMsg);

})(angularAppConfig);
