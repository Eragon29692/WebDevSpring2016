/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("HomeController", HomeController);

    function HomeController(SpotifyService, $location, $rootScope) {
        var vm = this;

        vm.search = search;

        function init() {

        }
        init();

        function search(songTitle) {
            SpotifyService
                .searchSongByName(songTitle)
                .then(function(response){
                    vm.data = response.data;
                });
        }
    }
})();