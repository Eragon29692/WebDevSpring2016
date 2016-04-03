module.exports = function (app, userModel) {


    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user?", getUserEndPoint);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);


    function createUser(req, res) {
        var user = req.body;
        user = userModel.Create(user).then(
            function (doc) {
                //req.session.currentUser = doc;
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


    function updateUser(req, res) {
        var user = req.body;
        var userID = req.params.id;
        userModel.Update(userID, user).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteUserById(req, res) {
        var userID = req.userId;
        userModel.Delete(userID).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

}