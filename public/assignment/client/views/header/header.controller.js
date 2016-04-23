/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController );

    function HeaderController(UserService, $scope, $location, $rootScope) {
        $scope.logout = logout;
        function init() {
        }
        init();

        function logout() {
            $rootScope.currentUser = undefined;
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = undefined;
                        $location.url("/");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }

})();