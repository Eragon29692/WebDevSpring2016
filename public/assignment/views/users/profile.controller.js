/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location, $rootScope) {
        var vm = this;

        vm.update = update;
        vm.user = $rootScope.currentUser;

        function init() {
            //$scope.user = $rootScope.currentUser;
            //$scope.username = $rootScope.currentUser.username;
        }

        init();

        function update(user) {
            UserService.updateUser(user._id, user, function (user) {
                console.log(user);
                $rootScope.currentUser = user;
                UserService.findAllUsers(function(users){ console.log(users)});
                $location.url("/profile");
            });
        }
    }
})();