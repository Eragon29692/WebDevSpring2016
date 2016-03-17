var mock = require("./form.mock.json");
module.exports = function () {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindByID: FindByID,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        findUserForms: findUserForms
    };
    return api;


    function Create(form) {
        var newForm = {
            _id: (new Date()).getTime().toString(),
            title: form.title,
            userId: form.userId,
            fields: form.fields
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
}