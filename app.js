const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
// const bodyParser = require('body-parser')
let storage = multer.diskStorage({
  destination: __dirname + "/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".mp3");
  },
});
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ storage: storage });
const type = upload.single("upl");

app.post("/upload", type, (req, res) => {
  console.log(req.file);
});

app.get("/file/:filename", (req, res) => {
  filename = req.params.filename;
  console.log(filename);
  try {
    res.sendFile(path.join(__dirname, "public", "uploads", filename));
  } catch (err) {
    res.send("No File");
  }
});

app.listen(3000, () => console.log("listening on port 3000"));
