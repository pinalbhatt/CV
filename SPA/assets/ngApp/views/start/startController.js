(function () {
    'use strict';

    angular
        .module('PBDesk.SpaCVApp')
        .controller('summaryController', summaryController);

    summaryController.$inject = ['$location'];

    function summaryController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'summaryController';

        init();

        function init() { }
    }
})();