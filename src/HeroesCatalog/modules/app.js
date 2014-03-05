(function () {
    'use strict';

    var id = 'app';

    var app = angular.module('app', [
        'ngAnimate',
        'ngRoute'
    ]);

    app.run(['$q', '$rootScope',
        function ($q, $rootScope) {

        }]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HeroController as vm',
                templateUrl: 'modules/heroes/views/index.html'
            });
    });
})();