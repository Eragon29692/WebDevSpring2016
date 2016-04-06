/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("HomeController", HomeController);

    function HomeController(SongService, SpotifyService, $location, $rootScope) {
        var vm = this;

        vm.search = search;
        vm.addSong = addSong;

        function init() {
            if ($rootScope.searchWord) {
                search($rootScope.searchWord);
            }
        }
        init();

        function search(songTitle) {
            vm.data = undefined;
            vm.clicked = true;
            if (songTitle) {
                $rootScope.searchWord = vm.songTitle;
                SpotifyService
                    .searchSongByName(songTitle)
                    .then(function (response) {
                        vm.data = response.data;
                        vm.clicked = false;
                    });
            }
        }

        function addSong(song) {
            SongService.createSong(song).then(function (respone) {
                console.log(respone.data);
            });
        }
    }
})();