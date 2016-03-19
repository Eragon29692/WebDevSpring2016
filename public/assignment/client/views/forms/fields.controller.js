/**
 * Created by duyvu on 2/26/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, $scope, $location, $rootScope, $routeParams, $uibModal) {
        var vm = this;


        vm.addField = addField;
        vm.deleteField = deleteField;
        vm.updateForm = updateForm;

        vm.selectForm = selectForm;
        vm.open = open;

        vm.render = render;

        function init() {
            render();
        }

        init();

        function render() {
            FieldService.getFieldsForForm($routeParams.formId).then(function (response) {
                vm.fields = response.data;
                console.log(response.data);
            });
        }

        function addField(fieldType) {
            var newField;
            if (fieldType === "singleLine") {
                newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            if (fieldType === "textFiled") {
                newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            if (fieldType === "date") {
                newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }
            if (fieldType === "dropDown") {
                newField = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
            }
            if (fieldType === "checkBox") {
                newField = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            }
            if (fieldType === "button") {
                newField = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            }
            if (vm.myform.$valid)
            FieldService.createFieldForForm(newField, $routeParams.formId).then(function (respone) {
                console.log(respone.data);
                render();
            });
        }

        function updateForm(form) {
            if (!(form === undefined))
                FormService.updateFormById(form._id, form).then(function (respone) {
                    console.log(respone.data);
                });
            render();
        }

        function deleteField(fieldId) {
            FieldService.deleteFieldFromForm(fieldId, $routeParams.formId).then(function (respone) {
                console.log(respone.data);
            });
            render();
        }

        function selectForm(form) {
            var selectedForm = {
                _id: form._id,
                title: form.title,
                userId: form.userId,
                fields: form.fields
            };
            $scope.form = selectedForm;
        }


        //modal
        function open(field) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/forms/modal.template.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    field: function () {
                        return field;
                    }
                }
            });
        }


    }


    angular.module("FormBuilderApp").controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, field) {
        $scope.field = field;

        console.log(field);
        function init() {

        }

        init();

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

})();