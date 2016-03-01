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

    function ProfileController(UserService, $scope, $location, $rootScope) {
        var vm = this;

        vm.update = update;

        function init() {
            $scope.user = $rootScope.currentUser;
        }

        init();

        function update(user) {
            UserService.updateUser($scope.user._id, user, function (user) {
                //var currentUser = user;
                //if(currentUser != null) {
                //UserService.setCurrentUser(currentUser);
                console.log(user);
                $rootScope.currentUser = user;
                UserService.findAllUsers(function(users){ console.log(users)});
                $location.url("/profile");
                //}
            });
        }
    }
})();