/**
 * Created by duyvu on 2/28/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: login,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            login: login,
            logout: logout,
            register: register,
            findAllUsersAdmin: findAllUsersAdmin,
            deleteUserByIdAdmin: deleteUserByIdAdmin,
            createUserAdmin: createUserAdmin,
            updateUserAdmin: updateUserAdmin,
            findUserByIdAdmin: findUserByIdAdmin
        };

        return api;


        function logout(user) {
            return $http.post("/api/assignment/logout");
        }

        function login(user) {
            console.log(user);
            return $http.post("/api/assignment/login", user);
        }

        function register(user) {
            console.log(user);
            return $http.post("/api/assignment/register", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/assignment/user/" + userId, newUser);
        }

        function findAllUsersAdmin() {
            return $http.get("/api/assignment/admin/user");
        }

        function updateUserAdmin(user) {
            return $http.put("/api/assignment/admin/user/" + user._id, user);
        }

        function findUserByIdAdmin(userId) {
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function createUserAdmin(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function deleteUserByIdAdmin(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }
    }
})();