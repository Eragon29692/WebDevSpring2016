module.exports = function(app, formModel, userModel) {


    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user?", getUserEndPoint);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);



    function createUser(req, res) {
        var user = req.body;
        user = userModel.Create(user);
        res.json(user);
    }

    function getUserEndPoint(req, res) {
        var params = req.params;
        var query = req.query;

        if (params.length == 0 && query == {}) {
            var users = userModel.FindAll();
            res.json(users);
        }
        else if (params.length == 0 && query.username != undefined && query.password == undefined) {
            var username = query.username;
            var user = userModel.findUserByUsername(username);
            console.log(user);
            res.json(user);
        }
        else if (params.length == 0 && req.query.username != undefined && req.query.password != undefined) {
            var username = query.username;
            var password = query.password;
            var credentials = {};
            credentials.username = username;
            credentials.password = password;
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        }
        else {
            console.log(req.params);
            console.log(req.query);
        }
    }


    function findUserById(req, res) {
        var userId = parseInt(req.params.id);
        var user = userModel.findByID(userId);
        console.log(user);
        res.json(user);
    }


    function updateUser(req, res) {
        var user = req.body;
        var userID = parseInt(req.params.id);
        user = userModel.Update(userID, user);
        res.json(user);
    }

    function deleteUserById(req, res) {
        var userID = parseInt(req.userId);
        var user = userModel.Delete(userID);
        res.json(user);
    }

}