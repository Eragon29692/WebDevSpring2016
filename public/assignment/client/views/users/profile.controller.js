/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {
        var vm = this;

        vm.update = update;
        vm.user = {};

        function init() {
            var user = UserService.findUserByUsername($rootScope.currentUser.username).then(function (respone) {
                vm.user = respone.data;
            });
        }

        init();

        function update(user) {
            if (vm.myform.$valid)
                UserService.updateUser(user._id, user).then (function (respone) {
                    console.log(respone.data);
                    $location.url("/profile");
                });
        }
    }
})();