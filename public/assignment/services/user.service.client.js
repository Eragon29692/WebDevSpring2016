/**
 * Created by duyvu on 2/28/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];
        users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            for (var u in users) {
                if (username === users[u].username && password === users[u].password) {
                    return callback(users[u]);
                }
            }
            return callback(null);
        }

        function findAllUsers(callback) {
            return callback(users);
        }

        function createUser(user, callback) {
            var newUser = {
                _id      : (new Date()).getTime(),
                username : user.username,
                password : user.password,
                email    : user.email
            };
            users.push(newUser);
            return callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for (var i = users.length - 1; i >= 0; i--) {
                if (userId === users[i]._id) {
                    users.splice(i, 1);
                    return callback(users);
                }
            }
            return null;
        }

        function updateUser(userId, user, callback) {
            var newUser = {
                _id      : userId,
                username : user.username,
                password : user.password,
                firstName: user.firstName,
                lastName : user.lastName,
                email    : user.email
            };
            for (var u in users) {
                if (userId === users[u]._id) {
                    users[u] = newUser
                    return callback(newUser);
                }
            }
            return null;
        }


    }
})();