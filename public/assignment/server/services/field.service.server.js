module.exports = function (app, formModel) {

    app.get("/api/assignment/form/:formId/field", findAllFieldInForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldInForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldInForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);
    //update sort order
    app.put("/api/assignment/form/:formId/field", updateOrder);


    function findAllFieldInForm(req, res) {
        var formId = req.params.formId;
        formModel.findAllFieldInForm(formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFieldInForm(fieldId, formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldInForm(fieldId, formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function createFieldInForm(req, res) {
        var newField = req.body;
        var formId = req.params.formId;
        formModel.createFieldInForm(newField, formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateFieldInForm(req, res) {
        var newField = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.updateFieldInForm(fieldId, newField, formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateOrder(req, res) {
        var newOrder = req.body;
        var formId = req.params.formId;
        console.log(newOrder);
        formModel.updateOrder(newOrder, formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

}



