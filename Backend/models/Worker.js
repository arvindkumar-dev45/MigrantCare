const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    state: String,
    bloodGroup: String,
    disease: String,
    phone: String,
    photo: String,
});

module.exports = mongoose.model("Worker", workerSchema);

