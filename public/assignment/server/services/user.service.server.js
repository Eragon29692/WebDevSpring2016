var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel) {

    app.post("/api/assignment/admin/user", isAdmin, createUser);
    app.get("/api/assignment/admin/user", isAdmin, getAllUsers);
    app.get("/api/assignment/admin/user/:userId", isAdmin, findUserByIdAdmin);
    app.delete("/api/assignment/admin/user/:userId", isAdmin, deleteUserByIdAdmin);
    app.put("/api/assignment/admin/user/:userId", isAdmin, updateUserAdmin);


    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user?", getUserEndPoint);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);


    var auth = authorized;
    app.post("/api/assignment/login", passport.authenticate('assignment'), login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/register", register);

    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function assignmentLocalStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (!(user.songs)) {
            userModel
                .FindByID(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function createUser(req, res) {
        var user = req.body;
        user.roles = "user";
        userModel
            .findUserByUsername(user.username)
            .then(
                function (newUser) {
                    if (newUser) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        user.password = bcrypt.hashSync(user.password);
                        userModel.Create(user).then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getAllUsers(req, res) {
        userModel.FindAll().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function getUserEndPoint(req, res) {
        var params = req.params;
        var query = req.query;

        if (params.length == 0 && query == {}) {
            userModel.FindAll().then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }
        else if (params.length == 0 && query.username != undefined && query.password == undefined) {
            var username = query.username;
            userModel.findUserByUsername(username).then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }
        else if (params.length == 0 && req.query.username != undefined && req.query.password != undefined) {
            var username = query.username;
            var password = query.password;
            var credentials = {};
            credentials.username = username;
            credentials.password = password;
            userModel.findUserByCredentials(credentials).then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }
        else {
            console.log(req.params);
            console.log(req.query);
        }
    }


    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findByID(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findUserByIdAdmin(req, res) {
        var userId = req.params.userId;
        userModel.findByID(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }


    function updateUserAdmin(req, res) {
        var user = req.body;
        var userID = req.params.userId;
        userModel.FindByID(userID).then(
            function (oldUser) {
                if (user.password)
                    user.password = bcrypt.hashSync(user.password);
                else {
                    user.password = oldUser.password;
                }
                userModel.Update(userID, user).then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateUser(req, res) {
        var user = req.body;
        var userID = req.params.id;
        userModel.FindByID(userID).then(
            function (oldUser) {
                if (user.password)
                    user.password = bcrypt.hashSync(user.password);
                else {
                    user.password = oldUser.password;
                }
                userModel.Update(userID, user).then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteUserById(req, res) {
        var userID = req.params.id;
        userModel.Delete(userID).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteUserByIdAdmin(req, res) {
        var userID = req.params.userId;
        var user = req.body;
        userModel.Delete(userID).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );

    }

    function register(req, res) {
        var user = req.body;
        user.roles = "user";
        userModel
            .findUserByUsername(user.username)
            .then(
                function (newUser) {
                    if (newUser) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        user.password = bcrypt.hashSync(user.password);
                        return userModel.Create(user);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function isAdmin (req, res, next) {
        if (req.user && req.user.roles.indexOf("admin") > 0) {
            next();
        }
        else {
            res.status(403).send("Admin Only");
        }
    }


}