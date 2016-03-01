/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;

        vm.register = register;

        function init() {

        }

        init();

        function register(user) {
            UserService.createUser(user, function (user) {
                //var currentUser = user;
                //if(currentUser != null) {
                //UserService.setCurrentUser(currentUser);
                console.log(user);
                $rootScope.currentUser = user;
                UserService.findAllUsers(function(users){ console.log(users)});
                $location.url("/profile");
                //}
            });
        }
    }
})();