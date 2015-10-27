(function () {
    'use strict';

    angular
        .module('PBDesk.SpaCVApp')
        .controller('contactController', contactController);

    contactController.$inject = ['$location'];

    function contactController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'contactController';

        init();

        function init() { }
    }
})();