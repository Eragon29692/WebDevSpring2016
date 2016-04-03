var mock = require("./user.mock.json");
module.exports = function () {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindByID: FindByID,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials

        //deleteUserSong: deleteUserSong
    };
    return api;


    function Create(user) {
        var newUser = {
            _id: (new Date()).getTime(),
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        mock.push(newUser);
        return newUser;
    }

    function FindAll() {
        return mock;
    }

    function FindByID(userId) {
        console.log(userId);
        for (var u in mock) {
            if (userId === mock[u]._id) {
                return mock[u];
            }
        }
        return null;
    }

    function Update(userId, user) {
        var newUser = {
            _id: userId,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        for (var u in mock) {
            if (userId === mock[u]._id) {
                mock[u] = newUser
                return newUser;
            }
        }
        return null;
    }


    function Delete(userId) {
        for (var i = mock.length - 1; i >= 0; i--) {
            if (userId === mock[i]._id) {
                mock.splice(i, 1);
                return mock;
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var u in mock) {
            if (username === mock[u].username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (credentials.username === mock[u].username && credentials.password === mock[u].password) {
                return mock[u];
            }
        }
        return null;
    }


    /////////////////////////////////////////////////////


    /*
     function deleteUserSong(songID, user) {
     var userSongs = user.songs;
     for (var i = userSongs.length - 1; i >= 0; i--) {
     if (songID === userSongs[i]) {
     user.songs.splice(i, 1);
     return user.songs;
     }
     }
     return null;
     }
     */
}/**
 * Created by duyvu on 4/1/2016.
 */
