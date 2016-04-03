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
            render();

        }

        function render() {
            var user = UserService.findUserByUsername($rootScope.currentUser.username).then(function (respone) {
                vm.user = respone.data;
                ToString();
            });
        }

        init();

        function ToString() {
            if (vm.user.phones != undefined) {
                var phones = vm.user.phones;
                var resultString = "";
                for (var o in phones) {
                    resultString = resultString.concat(phones[o], ",  ");
                }
                resultString = resultString.substring(0, resultString.length - 3);
                vm.user.phones = resultString;
            }
            if (vm.user.email != undefined) {
                var emails = vm.user.email;
                var resultString = "";
                for (var o in emails) {
                    resultString = resultString.concat(emails[o], ",  ");
                }
                resultString = resultString.substring(0, resultString.length - 3);
                vm.user.email = resultString;
            }
        }

        function update(user) {
            if (vm.myform.$valid) {
                var emails = user.email;
                if (emails != "") {
                    emails = emails.split(",");
                    for (var o in emails) {
                        emails[o] = emails[o].trim();
                    }
                }
                else {
                    emails = [];
                }
                var phones = user.phones;
                if (phones != "") {
                    phones = phones.split(",");
                    for (var o in phones) {
                        phones[o] = phones[o].trim();
                    }
                } else {
                    phones = [];
                }
                user.email = emails;
                user.phones = phones;

                UserService.updateUser(user._id, user).then(function (respone) {
                    console.log(respone.data);
                    render();
                    $location.url("/profile");
                });
            }
        }
    }
})();