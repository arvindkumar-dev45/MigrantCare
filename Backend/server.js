const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

mongoose.connect(
"mongodb://arvindstudy9507_db_user:Arvind1234@ac-nrhf0ha-shard-00-00.ggalijo.mongodb.net:27017,ac-nrhf0ha-shard-00-01.ggalijo.mongodb.net:27017,ac-nrhf0ha-shard-00-02.ggalijo.mongodb.net:27017/?ssl=true&replicaSet=atlas-feqyls-shard-0&authSource=admin&appName=migrantcare-db"
)
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