const express = require("express");
const router = express.Router();

const Worker = require("../models/Worker");

router.get("/", async (req, res) => {
    const workers = await Worker.find();
    res.json(workers);
});

router.post("/register", async (req, res) => {
    console.log(req.body);

    await Worker.create(req.body);

    res.send("Worker Registered Successfully");
});

router.put("/:id", async (req, res) => {

    await Worker.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.send("Worker Updated Successfully");

});

router.delete("/:id", async (req, res) => {
    console.log("ID =", req.params.id);
    await Worker.findByIdAndDelete(req.params.id);
    res.send("Worker Deleted Successfully");

});

module.exports = router;