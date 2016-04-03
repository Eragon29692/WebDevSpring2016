var mock = require("./form.mock.json");

// load q promise library
var q = require("q");

module.exports = function (db, mongoose) {

    // load form schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create form model from schema
    var FormModel = mongoose.model('form', FormSchema);

    // load field schema
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    // create field model from schema
    var FieldModel = mongoose.model('field', FieldSchema);


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
        updateFieldInForm: updateFieldInForm,
        updateOrder: updateOrder
    };
    return api;


    function Create(form) {
        var deferred = q.defer();
        FormModel.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        FormModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function FindByID(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function Update(formId, newForm) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                if (doc == null) {
                    deferred.reject(err);
                } else {
                    doc.title = newForm.title;
                    doc.userId = newForm.userId;
                    doc.fields = newForm.fields;
                    doc.save();
                    deferred.resolve(doc);
                }
            }
        });
        return deferred.promise;
    }

    function Delete(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.findOne({title: title}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserForms(userId) {
        var deferred = q.defer();
        FormModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    //field endpoint


    function findAllFieldInForm(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;
    }

    function findFieldInForm(fieldId, formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var f in doc.fields) {
                    if (fieldId === doc.fields[f]._id) {
                        deferred.resolve(doc.fields[f]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    function deleteFieldInForm(fieldId, formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.fields.id(fieldId).remove();
                doc.save();
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;
    }

    function createFieldInForm(field, formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields.push(field);
                form.save();
                deferred.resolve(form.fields[form.fields.length]);
            }
        });
        return deferred.promise;
    }

    function updateFieldInForm(fieldId, newField, formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.fields.id(fieldId).label = newField.label;
                doc.fields.id(fieldId).type = newField.type;
                doc.fields.id(fieldId).placeholder = newField.placeholder;
                doc.fields.id(fieldId).options = newField.options;
                doc.save();
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;
    }

    function updateOrder(newOrder, formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var temp = doc.fields[newOrder.first];
                doc.fields[newOrder.first].remove();
                doc.fields.splice(newOrder.second, 0, temp);
                console.log(doc.fields);

                doc.save();
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;
    }

}