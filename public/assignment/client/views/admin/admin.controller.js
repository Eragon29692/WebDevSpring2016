/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $location, $rootScope) {
        var vm = this;
        vm.selectUser = selectUser;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.sortAscending = sortAscending;
        vm.sortDescending = sortDescending;


        function init() {
            render();
        }

        init();


        function render(user) {
            UserService.findAllUsersAdmin().then(
                function (response) {
                    vm.users = response.data;
                }
            );
        }

        function selectUser(user) {
            var selectedUser = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roles: user.roles,
                username: user.username,
                phones: user.phones
            };
            vm.selectedUser = selectedUser;
        }

        function addUser(user) {
            vm.selectedUser = undefined;
            if (!(user === undefined)) {
                UserService.createUserAdmin(user).then(
                    function (response) {
                        vm.selectedUser = undefined;
                        render();
                    }
                );
            }
        }

        function deleteUser(userId) {
            UserService.deleteUserByIdAdmin(userId).then(
                function (response) {
                    render();
                }
            );
        }

        function updateUser(user) {
            if (user && (!(user._id === undefined))) {
                UserService.updateUserAdmin(user).then(
                    function (response) {
                        vm.selectedUser = undefined;
                        render();
                    }
                );
            }
        }

        function sortAscending(param) {
            var users = vm.users;
            if (param === "username") {
                users.sort(function (a, b) {
                        return a.username.toLowerCase().localeCompare(b.username.toLowerCase());
                    }
                )
                vm.username = "des";
            } else if (param === "firstName") {
                users.sort(function (a, b) {
                        return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
                    }
                )
                vm.firstName = "des";
            } else {
                users.sort(function (a, b) {
                    return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());

                })
                vm.lastName = "des";
            }
            vm.users = users;
            return;
        }

        function sortDescending(param) {
            var users = vm.users;
            if (param === "username") {
                users.sort(function (a, b) {
                    return b.username.toLowerCase().localeCompare(a.username.toLowerCase());
                })
                vm.username = "asc";
            } else if (param === "firstName") {
                users.sort(function (a, b) {
                    return b.firstName.toLowerCase().localeCompare(a.firstName.toLowerCase());
                })
                vm.firstName = "asc";
            } else {
                users.sort(function (a, b) {
                    return b.lastName.toLowerCase().localeCompare(a.lastName.toLowerCase());
                })
                vm.lastName = "asc";
            }
            vm.users = users;
            return;
        }
    }
})();