//The WordCountService service is responsible to execute the word count logic.
const countWordsFromFile = (textFile) => {
  const x = textFile.data.toString();

  //First, the new lines are replaced to spaces.
  const removedNewLines = x.replace(/\n/g, " ");

  //If the text file starts or ends with spaces, they are removed.
  const removedStartEndSpaces = removedNewLines.replace(/(^\s*)|(\s*$)/gi, "");

  //All multiple spaces are reduced to a single space.
  const normalizedTextInput = removedStartEndSpaces.replace(/[ ]{2,}/gi, " ");

  const totalWordCount = normalizedTextInput.split(" ").length;

  const eachWordOccuranceCount = countEachWordOccurance(normalizedTextInput);

  return {
    name: textFile.name,
    totalCount: totalWordCount,
    eachWordCount: eachWordOccuranceCount,
  };
};

//This function counts the occurance of each word on the given input
function countEachWordOccurance(textInput) {
  const object = {};

  textInput.split(" ").forEach(function (word) {
    object[word] = object[word] ? ++object[word] : 1;
  });

  const result = JSON.stringify(object);

  return result.split(",").join("\n");
}

module.exports = {
  countWordsFromFile,
};
