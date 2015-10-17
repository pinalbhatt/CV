(function () {
    'use strict';

    angular
        .module('PBDesk.RApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$scope', '$rootScope', '$cookies', 'APIService'];

    function mainController($scope, $rootScope, $cookies, APIService) {



        $scope.requestAccess = function(){
            verifyAccessCode($scope.data.accessCode);
        }

        init();

        function init() {
            $scope.data = {accessCode: 1 };
            $scope.cvData = {};
            $scope.accessGranted = false;
            $scope.title = 'mainController';
            activateRSvc();

        }

        function activateRSvc(){
            var activateCookieName = "act"
            var a = $cookies.get(activateCookieName);
            if(a === undefined) {
                var d = new Date();
                d.setMinutes(d.getMinutes() + 15);
                APIService.get("Activate").then(function (data) {
                    console.log(data);
                    $cookies.put(activateCookieName, "1", {'expires': d});
                }, function (error) {
                    console.log(error);
                    $cookies.put(activateCookieName, "0", {'expires': d});
                });
            }
        }

        function verifyAccessCode(code){
            if(code !== undefined && isFinite(code)){
                var accessCodeCookieName = "ac";
                var d = new Date();
                d.setMinutes(d.getMinutes() + 30);
                APIService.get("Access?a="+code).then(function (data) {
                    console.log(data);
                    if(data){
                        $scope.cvData = data;
                        $scope.accessGranted = true;
                        $cookies.put(accessCodeCookieName, code, {'expires': d});
                    }

                }, function (error) {
                    console.log(error);
                });
            }

        }
    }
})();