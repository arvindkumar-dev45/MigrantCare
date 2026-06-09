const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/migrantcare")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
const workerRoutes = require("./routes/workerRoutes");

app.get("/", (req, res) => {
  res.send("MigrantCare API Running");
});

app.use("/api/workers", workerRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});