/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("LoginController", LoginController);

    function LoginController(SecurityService, UserService, $location, $rootScope) {
        var vm = this;

        vm.login = login;

        function init() {
            vm.invalidSubmit = false;
        }

        init();

        function login(user) {
            if (vm.myform.$valid)
                SecurityService
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
})();