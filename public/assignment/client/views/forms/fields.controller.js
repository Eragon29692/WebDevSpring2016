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
                newField = {
                    "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            }
            if (fieldType === "checkBox") {
                newField = {
                    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            }
            if (fieldType === "button") {
                newField = {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
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

        vm.sortableOptions = {
            /*
            update: function(e, ui) {
                var logEntry = tmpList.map(function(i){
                    return i.value;
                }).join(', ');
                //$scope.sortingLog.push('Update: ' + logEntry);
            },*/
            stop: function(e, ui) {
                // this callback has the changed model
                console.log(ui.field);
            }
        };


        function open(field) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/forms/modal.template.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    field: function () {
                        //console.log("1");
                        return field;
                    }
                }
            });

            modalInstance.result.then(function (newField) {
                field = newField;
                render();
            }, function () {
                //render();
                console.log("dismissed");
            });
        }


    }


    angular.module("FormBuilderApp").controller('ModalInstanceCtrl', function (FieldService, $scope, $uibModalInstance, $routeParams, field) {
        var newField = JSON.parse(JSON.stringify(field));

        //console.log(field);

        function init() {
            optionsToString();
            $scope.field = newField;
        }

        init();

        function optionsToString() {

            if (newField.options != undefined) {
                console.log(newField.options);
                var options = newField.options;
                var resultString = "";
                for (var o in options) {
                    resultString = resultString.concat(options[o].label, ":", options[o].value, "\n");
                }
                console.log(resultString);
                newField.options = resultString;
            }
        }


        $scope.ok = function () {
            if (newField.options != undefined) {
                var resultOptions = [];
                var options = newField.options;
                if (options != "") {
                    var options = options.split("\n");
                    for (var o in options) {
                        options[o] = options[o].split(":");
                        if (options[o].length === 2) {
                            resultOptions.push({label: options[o][0], value: options[o][1]});
                        }
                        else {
                            console.log("invalid format");
                            return null;
                        }
                    }
                }
                newField.options = resultOptions;
            }
            console.log(newField);
            FieldService.updateField(newField._id, $routeParams.formId, newField);
            $uibModalInstance.close(field);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

})();