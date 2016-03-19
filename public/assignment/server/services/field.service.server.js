module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/field", findAllFieldInForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldInForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldInForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);
    //update sort order
    app.put("/api/assignment/form/:formId/field", updateOrder);


    function findAllFieldInForm(req, res) {
        var formId = req.params.formId;
        var forms = formModel.findAllFieldInForm(formId);
        res.json(forms);
    }

    function findFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldInForm(fieldId, formId);
        res.json(field);
    }

    function deleteFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldInForm(fieldId, formId);
        res.json(fields);
    }

    function createFieldInForm(req, res) {
        var newField = req.body;
        var formId = req.params.formId;
        var field = formModel.createFieldInForm(newField, formId);
        res.json(field);
    }

    function updateFieldInForm(req, res) {
        var newField = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.updateFieldInForm(fieldId, newField, formId);
        res.json(forms);
    }

    function updateOrder(req, res) {
        var newOrder = req.body;
        var formId = req.params.formId;
        console.log(newOrder);
        var forms = formModel.updateOrder(newOrder, formId);
        res.json(forms);
    }

}



