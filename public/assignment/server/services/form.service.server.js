module.exports = function(app, formModel, userModel) {


    app.get("/api/assignment/user/:userId/form", findUserForm);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);//add useriD to josn
    app.put("/api/assignment/form/:formId", updateForm);

    function findUserForm(req, res) {
        var userId = parseInt(req.params.userId);
        var forms = formModel.findUserForms(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findByID(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.Delete(formId);
        res.json(form);
    }

    function createForm(req, res) {
        var userId = parseInt(req.params.userId);
        var newForm = req.body;
        newForm.userId = userId;
        var form = formModel.Create(newForm);
        res.json(form);
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var form = formModel.Update(formId, newForm);
        res.json(form);
    }

}