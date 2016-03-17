module.exports = function(app, formModel, userModel) {


    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);



    function createUser(req, res) {
        var user = req.body;
        user = userModel.Create(user);
        res.json(user);
    }

    function findAllUsers(req, res) {
        var users = userModel.FindAll();
        res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findByID(userId);
        console.log(user);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        console.log(user);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {};
        credentials.username = username;
        credentials.password = password;
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }


    function updateUser(req, res) {
        var user = req.body;
        var userID = user._id;
        user = userModel.Update(userID, user);
        res.json(user);
    }

    function deleteUserById(req, res) {
        var deleteInfo = req.body;
        var userID = deleteInfo.userID;
        var user = userModel.Delete(userID);
        res.json(user);
    }

}