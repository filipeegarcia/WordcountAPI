const wordCountService = require("./WordCountService");

//The controller handles the received request. Executes some validation, and returns the json with the response.
const getFileWordCounts = (request, response) => {
  //If the user has not added a file, or the format is not .txt, we return an error with the message below.
  if (
    request.files === null ||
    !request.files.file.name.toLowerCase().endsWith(".txt")
  ) {
    return response.status(400).json({ msg: "Please, select a .txt file" });
  }

  const textFile = request.files.file;

  //If the user uploads a file larger than 10mb, an error is returned with the message below.
  if (textFile.size > 10000000) {
    return response
      .status(400)
      .json({ msg: "You can upload a .txt file up to 10mb" });
  }

  //If the file passes the validations, it is sent to the service responsible for the logic.
  const result = wordCountService.countWordsFromFile(textFile);

  return response.json({
    fileName: result.name,
    wordTotalCount: result.totalCount,
    eachWordCount: result.eachWordCount,
  });
};

module.exports = {
  getFileWordCounts,
};
