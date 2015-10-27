(function () {
    'use strict';

    angular
        .module('PBDesk.SpaCVApp')
        .controller('mainController', mainController);

    mainController.$inject = ['$scope', '$rootScope', '$cookies', 'APIService'];

    function mainController($scope, $rootScope, $cookies, APIService) {

        var accessCodeCookieName = "ac";

        $scope.requestAccess = function(){
            verifyAccessCode($scope.data.accessCode);
        }

        init();

        function init() {
            $scope.data = {accessCode: "" };
            $scope.cvData = {};
            $scope.accessGranted = false;
            $scope.title = 'mainController';
            activateRSvc();

            var ac = $cookies.get(accessCodeCookieName);
            if(ac){
                verifyAccessCode(ac);
            }

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

        function submitMSG(valid, msg){
            if(valid){
                var msgClasses = "h3 text-center fadeInUp animated text-success";
            } else {
                var msgClasses = "h3 text-center text-danger";
            }
            $("#msgSubmit1").removeClass().addClass(msgClasses).text(msg);
        }

        function verifyAccessCode(code){

            if(code !== undefined){
                if(code.toString().trim().length === 0 ){
                    submitMSG(false, "Please enter access code.");
                    return;
                }

                var d = new Date();
                d.setMinutes(d.getMinutes() + 30);
                APIService.get("Access?a="+code).then(function (success) {
                    console.log(success);
                    if(success && success.data){
                        $scope.cvData = success.data;
                        $scope.accessGranted = true;
                        $cookies.put(accessCodeCookieName, code, {'expires': d});
                    }

                }, function (error) {
                    submitMSG(false, "Invalid Access Code.");
                });
            }

        }
    }
})();