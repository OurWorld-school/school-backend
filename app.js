const express = require("express");
const bodyParser = require("body-parser");

const colors = require("colors");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoute = require("./routes/UserRoutes");
const scratchcardRoute = require("./routes/ScratchCard");
const nursery1Route = require("./routes/Nursery1resultRoutes");
const nursery2Route = require("./routes/Nursery2resultRoute");
const nursery3Route = require("./routes/Nursery3resultRoutes");
const basic2Route = require("./routes/Basic2resultRoutes");
const basic1Route = require("./routes/Basic1resultRoutes");
const basic3Route = require("./routes/Basic3resultRoutes");
const basic4Route = require("./routes/Basic4resultRoutes");
const basic5Route = require("./routes/Basic5resultRoutes");
const basic6Route = require("./routes/Basic6resultRoutes");
const prenurseryRoute = require("./routes/PreNurseryRoute");
const prenurseryCommulativeRoute = require("./routes/PreNurseryCommulative");
const nursery1CommulativeRoute = require("./routes/Nursery1Commulative");
const nursery2CommulativeRoute = require("./routes/Nursery2Commulative");
const nursery3CommulativeRoute = require("./routes/Nursery3Commulative");
const basic1CommulativeRoute = require("./routes/Basic1Commulative");
const basic2CommulativeRoute = require("./routes/Basic2Commulative");
const basic3CommulativeRoute = require("./routes/Basic3Commulative");
const basic4CommulativeRoute = require("./routes/Basic4Commulative");
const basic5CommulativeRoute = require("./routes/Basic5Commulative");
const basic6CommulativeRoute = require("./routes/Basic6Commulative");
const scratchcGenRoute = require("./routes/ScratchCardGenerateRoute");

const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const router = express.Router();
const app = express();
app.use(cors());
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
app.use(bodyParser.json({ limit: "150mb" }));
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 10000,
//   })
// );
// / create connection

const db = config.get("mongoURI");

app.get("/items/:my_item", async (req, res) => {
  let my_item = req.params.my_item;
  let item = await db
    .db("my_db")
    .collection("my_collection")
    .findOne({ my_item: my_item });

  return res.json(item);
});
// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,

    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log(`MongoDb Connected`.bgGreen.bold))
  .catch((err) => console.log(err));
/////
app.use(express.json());
app.use("/api/auth/", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/nursery1result", nursery1Route);
app.use("/api/nursery2result", nursery2Route);
app.use("/api/nursery3result", nursery3Route);
app.use("/api/basic1result", basic1Route);
app.use("/api/basic2result", basic2Route);
app.use("/api/basic3result", basic3Route);
app.use("/api/basic4result", basic4Route);
app.use("/api/basic5result", basic5Route);
app.use("/api/basic6result", basic6Route);
app.use("/api/prenurseryresult", prenurseryRoute);
app.use("/api/prenurseryCommulative", prenurseryCommulativeRoute);
app.use("/api/nursery1Commulative", nursery1CommulativeRoute);
app.use("/api/nursery2Commulative", nursery2CommulativeRoute);
app.use("/api/nursery3Commulative", nursery3CommulativeRoute);
app.use("/api/basic1Commulative", basic1CommulativeRoute);
app.use("/api/basic2Commulative", basic2CommulativeRoute);
app.use("/api/basic3Commulative", basic3CommulativeRoute);
app.use("/api/basic4Commulative", basic4CommulativeRoute);
app.use("/api/basic5Commulative", basic5CommulativeRoute);
app.use("/api/basic6Commulative", basic6CommulativeRoute);
app.use("/api/scratchcard", scratchcardRoute);
app.use("/api/scratchGenerate", scratchcGenRoute);
app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// app.listen("5000", () => {
//   console.log("Server started on port 5000");
// });
