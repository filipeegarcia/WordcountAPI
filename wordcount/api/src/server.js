const express = require("express");
const fileUpload = require("express-fileupload");
const fileController = require("./FileController");

//This file is only responsible to start the server and forward the request to the controller.

const app = express();
app.use(fileUpload());

app.post("/upload", (request, response) => {
  return fileController.getFileWordCounts(request, response);
});

module.exports = app.listen(5000, () => console.log("Server Started..."));
