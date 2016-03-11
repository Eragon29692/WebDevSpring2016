module.exports = function(app) {
    var userModel    = require("./models/user.model.server.js")();
    var movieModel   = require("./models/song.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, movieModel, userModel);
    var movieService = require("./services/song.service.server.js")(app, movieModel, userModel);
}
