/*
*	app.js for initializing angular module container.
*   Defining routes, value and rootscope.
*/

'use strict';

angular.module('consumerApp', ['ngRoute', 'app.routes', 'app.config', 'ui.bootstrap', 'smart-table', 'ngSanitize']);