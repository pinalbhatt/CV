(function () {
    'use strict';

    angular
        .module('PBDesk.RApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$scope', '$rootScope'];

    function mainController($scope, $rootScope) {

        $scope.accessCode = "";
        $scope.accessGranted = false;
        $scope.title = 'mainController';

        $scope.requestAccess = function(){
            $scope.accessGranted = !$scope.accessGranted ;
        }

        init();

        function init() { }
    }
})();