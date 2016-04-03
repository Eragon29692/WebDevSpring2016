var mock = require("./user.mock.json");
// load q promise library
var q = require("q");

module.exports = function (db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('user', UserSchema);

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
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function FindAll() {
        var deferred = q.defer();
        UserModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function FindByID(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Update(userId, user) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.username = user.username;
                doc.password = user.password;
                doc.firstName = user.firstName;
                doc.lastName = user.lastName;
                doc.email = user.email;
                doc.phones = user.phones;
                doc.save();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function Delete(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
}