module.exports = function (app, formModel) {


    app.get("/api/assignment/user/:userId/form", findUserForm);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);//add useriD to josn
    app.put("/api/assignment/form/:formId", updateForm);

    function findUserForm(req, res) {
        var userId = parseInt(req.params.userId);
        formModel.findUserForms(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findByID(formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.Delete(formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function createForm(req, res) {
        var userId = parseInt(req.params.userId);
        var newForm = req.body;
        newForm.userId = userId;
        formModel.Create(newForm).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        formModel.Update(formId, newForm).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

}