/**
 * Created by DUY on 3/24/2016.
 */
/**
 * Created by duyvu on 3/18/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .factory("PlaylistDetailService", PlaylistDetailService);

    function PlaylistDetailService($http) {

        var api = {
            //createSongForPlaylist: createSongForPlaylist,
            getSongsForPlaylist: getSongsForPlaylist,
            getSongForPlaylist: getSongForPlaylist,
            deleteSongFromPlaylist: deleteSongFromPlaylist,
            //updateSong: updateSong,
            updateOrder: updateOrder
        };
        return api;
/*
        function createSongForPlaylist(newSong, playlistId) {
            return $http.post("/api/project/playlist/" + playlistId + "/song", newSong);
        }
*/
        function getSongsForPlaylist(playlistId) {
            return $http.get("/api/project/playlist/" + playlistId + "/song");
        }

        function getSongForPlaylist(songId, playlistId) {
            return $http.get("/api/project/playlist/" + playlistId + "/song/" + songId);
        }

        function deleteSongFromPlaylist(songId, playlistId) {
            return $http.delete("/api/project/playlist/" + playlistId + "/song/" + songId);
        }
/*
        function updateSong(songId, playlistId, newSong) {
            console.log("ran");
            return $http.put("/api/project/playlist/" + playlistId + "/song/" + songId, newSong);
        }
*/
        function updateOrder(newOrder, playlistId) {
            console.log(newOrder);
            return $http.put("/api/project/playlist/" + playlistId + "/song", newOrder);
        }
    }
})();