/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootScope) {
        var vm = this;

        vm.login = login;

        function init() {
            vm.invalidSubmit = false;
        }

        init();


        function login(user) {
            if (vm.myform.$valid) {
                console.log(user);
                UserService
                    .login({
                        username: user.username,
                        password: user.password
                    })
                    .then(
                        function (response) {
                            console.log(response.data);
                            $rootScope.currentUser = response.data;
                            $location.url("/profile");

                        },
                        function (err) {
                            console.log("invalid combination");
                            vm.invalidSubmit = true;
                        }
                    );
            }
        }
    }
})();