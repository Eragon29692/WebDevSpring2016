var mock = require("./song.mock.json");
// load q promise library
var q = require("q");

module.exports = function (db, mongoose) {

    // load user schema
    var SongSchema = require("./song.schema.server.js")(mongoose);
    /*
    var SongSchema = mongoose.Schema({
        "_id": String,
        title: String,
        artist: String,
        album: String,
        year: String
    }, {"id": false, collection: 'songProject'});
*/
    // create user model from schema
    var SongModel = mongoose.model('songProject', SongSchema);

    var api = {
        deleteSongById: deleteSongById,
        updateSongById: updateSongById,
        createSong: createSong,
        findAllSongs: findAllSongs,
        findSongById: findSongById,
        findSongs: findSongs
    };
    return api;

    function deleteSongById(songId) {
        var deferred = q.defer();
        SongModel.findById(songId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateSongById(songId, newSong) {
        var deferred = q.defer();
        SongModel.findById(songId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.title = newSong.title;
                doc.artist = newSong.artist;
                doc.album = newSong.album;
                doc.year = newSong.year;
                doc.save();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createSong(song) {
        var deferred = q.defer();
        SongModel.create(song, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllSongs() {
        var deferred = q.defer();
        SongModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //return null if not found
    function findSongById(songId) {
        var deferred = q.defer();
        SongModel.find({_id: songId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                if (doc.length == 0) {
                    deferred.resolve(null);
                    return;
                }
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findSongs(songs) {
        var deferred = q.defer();
        SongModel.find({_id :  { $in: songs }}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}