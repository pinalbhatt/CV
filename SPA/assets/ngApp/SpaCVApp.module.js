(function () {
    'use strict';

    angular
        .module('PBDesk.SpaCVApp', ['ngCookies', 'ngSanitize', 'ngRoute'])
        .config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'assets/ngApp/views/home/home.html',
                controller  : 'homeController',
                controllerAs: 'vm'
            })

            // route for the about page
            .when('/summary', {
                templateUrl : 'assets/ngApp/views/summary/summary.html',
                controller  : 'summaryController',
                controllerAs: 'vm'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'assets/ngApp/views/contact/contact.html',
                controller  : 'contactController',
                controllerAs: 'vm'
            })
            .otherwise( { redirectTo: '/' } );
    });
})();