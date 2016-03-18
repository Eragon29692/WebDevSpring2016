var mock = require("./form.mock.json");
module.exports = function () {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindByID: FindByID,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        findUserForms: findUserForms,

        //field endpoint functions
        findAllFieldInForm: findAllFieldInForm,
        findFieldInForm: findFieldInForm,
        deleteFieldInForm: deleteFieldInForm,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm
    };
    return api;


    function Create(form) {
        var newForm = {
            _id: (new Date()).getTime().toString(),
            title: form.title,
            userId: form.userId,
            fields: []
        };
        mock.push(newForm);
        return newForm;
    }

    function  FindAll() {
        return mock;
    }

    function FindByID(formId) {
        for (var f in mock) {
            if (formId === mock[f]._id) {
                return mock[f];
            }
        }
        return null;
    }

    function Update(formId, newForm) {
        var updateForm = {
            _id: newForm._id,
            title: newForm.title,
            userId: newForm.userId,
            fields: newForm.fields
        };
        for (var f in mock) {
            if (formId === mock[f]._id) {
                mock[f] = updateForm;
                return updateForm;
            }
        }
        return null;
    }

    function Delete(formId) {
        console.log(formId);
        for (var i = mock.length - 1; i >= 0; i--) {
            if (formId == mock[i]._id) {
                mock.splice(i, 1);
                return mock;
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var f in mock) {
            if (title === mock[f].title) {
                return mock[f];
            }
        }
        return null;
    }

    function findUserForms(userId) {
        var userForms = [];
        for (var f in mock) {
            if (userId === mock[f].userId) {
                userForms.push(mock[f]);
            }
        }
        return userForms;
    }


    //field endpoint


    function findAllFieldInForm(formId) {
        return FindByID(formId).fields;
    }

    function findFieldInForm(fieldId, formId) {
        var fields = findAllFieldInForm(formId);
        for (var f in fields) {
            if (fieldId === fields[f]._id) {
                return fields[f];
            }
        }
        return null;
    }

    function deleteFieldInForm(fieldId, formId) {
        var fields = findAllFieldInForm(formId);
        for (var i = fields.length - 1; i >= 0; i--) {
            if (fieldId === fields[i]._id) {
                fields.splice(i, 1);
                return fields;
            }
        }
        return null;
    }

    function createFieldInForm(field, formId) {
        var fields = findAllFieldInForm(formId);
        field._id = (new Date()).getTime().toString();
        fields.push(field);
        return field;
    }

    function updateFieldInForm(fieldId, newField, formId) {
        var field = findFieldInForm(fieldId, formId);
        var field = newField;
        return newField;
    }

}