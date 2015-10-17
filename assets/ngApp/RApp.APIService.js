(function () {
    "use strict";

    angular
        .module('PBDesk.RApp')
        .factory('APIService', APIService);

    APIService.$inject = ['$http', '$q'];

    function APIService($http, $q){

        var baseUrl = "http://rsvc.pbdesk.io/RSvc/";

        var service = {
            get: get,
            post: post
        };

        return service;



        function _makeHttpCall(options){
            /*options = {
             method: "",
             data: "",
             url: ""
             }*/
            var deferred = $q.defer();
            var apiUrl = baseUrl +  options.url;

            var req = {
                method: options.method,
                url: apiUrl,
                headers: {
                    "Content-Type": "application/json"
                }
            }
            if(options.data !== undefined){
                req.data = options.data;
            }

            $http(req)
                .then(function(response){
                    deferred.resolve(response);
                },
                function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function get(partialUrl){

            var options = {
                method: "GET",
                url: partialUrl
            }
            var deferred = $q.defer();
            _makeHttpCall(options)
                .then(function(response){
                    if (response.status === 200) {
                        deferred.resolve(response);
                    }
                    else{
                        deferred.reject(response);
                    }
                },
                function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function post(partialUrl, data){

            var options = {
                method: "POST",
                url: partialUrl,
                data: data
            }
            var deferred = $q.defer();
            _makeHttpCall(options)
                .then(function(response){
                    if (response.status === 200) {
                        deferred.resolve(response);
                    }
                    else{
                        deferred.reject(response);
                    }
                },
                function(error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }

})();
