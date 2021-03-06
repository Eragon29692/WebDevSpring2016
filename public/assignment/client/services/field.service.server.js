/**
 * Created by duyvu on 3/18/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            updateOrder: updateOrder
        };
        return api;

        function createFieldForForm(newField, formId) {
            return $http.post("/api/assignment/form/" + formId + "/field", newField);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(fieldId, formId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(fieldId, formId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(fieldId, formId, newField) {
            console.log("ran");
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, newField);
        }

        function updateOrder(newOrder, formId) {
            console.log(newOrder);
            return $http.put("/api/assignment/form/" + formId + "/field", newOrder);
        }
    }
})();