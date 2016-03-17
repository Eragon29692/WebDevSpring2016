/**
 * Created by duyvu on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $location, $rootScope) {
        var vm = this;
        var currentForm;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function init() {
            render();
        }
        init();

        function render() {
            FormService.findAllFormsForUser($rootScope.currentUser._id).then (function (response) {
                $scope.forms = response.data;
            });
        }

        function addForm(form) {
            if (!(form === undefined))
            FormService.createFormForUser($rootScope.currentUser._id, form).then (function (respone) {
                console.log(respone.data);
                render();
            });
        }

        function updateForm(form) {
            if (!(form === undefined))
            FormService.updateFormById(form._id, form).then (function (respone) {
                console.log(respone.data);
            });
            render();
        }

        function deleteForm(form) {
            FormService.deleteFormById(form._id).then (function (respone) {
                console.log(respone.data);
            });
            render();
        }

        function selectForm(form) {
            var selectedForm = {
                _id    : form._id,
                title  : form.title,
                userId : form.userId,
                fields : form.fields
            };
            $scope.form = selectedForm;
        }
    }
})();