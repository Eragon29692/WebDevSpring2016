/**
 * Created by DUY on 3/24/2016.
 */
/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("MusicDBApp")
        .controller("PlaylistDetailController", PlaylistDetailController);

    function PlaylistDetailController(PlaylistDetailService, $scope, $location, $rootScope, $routeParams, $uibModal) {
        var vm = this;


        vm.addSong = addSong;
        vm.deleteSong = deleteSong;
        //vm.updatePlaylist = updatePlaylist;
        //vm.selectPlaylist = selectPlaylist;
        vm.open = open;

        vm.render = render;
        //vm.sortableOptions = sortableOptions;

        function init() {
            render();
        }

        init();

        function render() {
            SongService.getSongsForPlaylist($routeParams.playlistId).then(function (response) {
                vm.songs = response.data;
                console.log(response.data);
            });
        }

        function addSong(songType) {
            var newSong;
            if (songType === "singleLine") {
                newSong = {"_id": null, "label": "New Text Song", "type": "TEXT", "placeholder": "New Song"};
            }
            if (songType === "textFiled") {
                newSong = {"_id": null, "label": "New Text Song", "type": "TEXTAREA", "placeholder": "New Song"};
            }
            if (songType === "date") {
                newSong = {"_id": null, "label": "New Date Song", "type": "DATE"};
            }
            if (songType === "dropDown") {
                newSong = {
                    "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            }
            if (songType === "checkBox") {
                newSong = {
                    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            }
            if (songType === "button") {
                newSong = {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            }
            if (vm.myplaylist.$valid)
                SongService.createSongForPlaylist(newSong, $routeParams.playlistId).then(function (respone) {
                    console.log(respone.data);
                    render();
                });
        }

        function updatePlaylist(playlist) {
            if (!(playlist === undefined))
                PlaylistDetailService.updatePlaylistById(playlist._id, playlist).then(function (respone) {
                    console.log(respone.data);
                });
            render();
        }

        function deleteSong(songId) {
            SongService.deleteSongFromPlaylist(songId, $routeParams.playlistId).then(function (respone) {
                console.log(respone.data);
            });
            render();
        }

        function selectPlaylist(playlist) {
            var selectedPlaylist = {
                _id: playlist._id,
                title: playlist.title,
                userId: playlist.userId,
                songs: playlist.songs
            };
            $scope.playlist = selectedPlaylist;
        }



        //sorting
        vm.sortableOptions = {
            start: function(e, ui) {
                ui.item.data('startPos', $(ui.item).index());
            },
            stop: function(e, ui) {
                console.log(ui.item.data('startPos'));
                console.log($(ui.item).index());
                var newOrder = {first:ui.item.data('startPos'), second:$(ui.item).index()};
                SongService.updateOrder(newOrder, $routeParams.playlistId);
            }
        };

        //modal
        function open(song) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/playlists/modal.template.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    song: function () {
                        //console.log("1");
                        return song;
                    }
                }
            });

            modalInstance.result.then(function (newSong) {
                song = newSong;
                render();
            }, function () {
                //render();
                console.log("dismissed");
            });
        }


    }


    angular.module("MusicDBApp").controller('ModalInstanceCtrl', function (SongService, $scope, $uibModalInstance, $routeParams, song) {
        var newSong = JSON.parse(JSON.stringify(song));

        //console.log(song);

        function init() {
            optionsToString();
            $scope.song = newSong;
        }

        init();

        function optionsToString() {

            if (newSong.options != undefined) {
                console.log(newSong.options);
                var options = newSong.options;
                var resultString = "";
                for (var o in options) {
                    resultString = resultString.concat(options[o].label, ":", options[o].value, "\n");
                }
                console.log(resultString);
                newSong.options = resultString;
            }
        }


        $scope.ok = function () {
            if (newSong.options != undefined) {
                var resultOptions = [];
                var options = newSong.options;
                if (options != "") {
                    var options = options.split("\n");
                    for (var o in options) {
                        options[o] = options[o].split(":");
                        if (options[o].length === 2) {
                            resultOptions.push({label: options[o][0], value: options[o][1]});
                        }
                        else {
                            console.log("invalid playlistat");
                            return null;
                        }
                    }
                }
                newSong.options = resultOptions;
            }
            console.log(newSong);
            SongService.updateSong(newSong._id, $routeParams.playlistId, newSong);
            $uibModalInstance.close(song);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

})();