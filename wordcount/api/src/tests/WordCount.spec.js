const supertest = require("supertest");
const app = require("./../server");
const request = supertest("localhost:5000");

beforeAll((done) => {
  done();
});

afterAll((done) => {
  done();
});

describe("WordCount", () => {
  describe(".getFileWordCounts", () => {
    it("returns an error if the the file is not .txt, along with a message informing the reason", function (done) {
      request
        .post("/upload")
        .attach("file", __dirname + "/sampleData//nonTextFile.jpg")
        .end(function (err, res) {
          if (err) {
            console.log(err);
          } else {
            expect(res.status).toEqual(400);
            expect(res.text).toEqual('{"msg":"Please, select a .txt file"}');
          }
          done();
        });
    });

    it("returns an error if the file is larger than 10MB, along with a message informing the reason", function (done) {
      request
        .post("/upload")
        .attach("file", __dirname + "/sampleData/largerThan10MB.txt")
        .end(function (err, res) {
          if (err) {
            console.log(err);
          } else {
            expect(res.status).toEqual(400);
            expect(res.text).toEqual(
              '{"msg":"You can upload a .txt file up to 10mb"}'
            );
          }
          done();
        });
    });

    it("sucessfully counts the words of a file with 7 words", function (done) {
      request
        .post("/upload")
        .attach("file", __dirname + "/sampleData/validFileWith7Words.txt")
        .end(function (err, res) {
          if (err) {
            console.log(err);
          } else {
            expect(res.status).toEqual(200);
            expect(res.text).toEqual(
              '{"fileName":"validFileWith7Words.txt","wordTotalCount":7,"eachWordCount":"{\\"wordcount\\":1\\n\\"content\\":1\\n\\"sample\\":1\\n\\"for\\":1\\n\\"test\\":3}"}'
            );
          }
          done();
        });
    });

    it("sucessfully counts the words of a file with 20 words, that starts with a space, and has double spaces", function (done) {
      request
        .post("/upload")
        .attach(
          "file",
          __dirname + "/sampleData/fileWith20wordsAndDoubleSpaces.txt"
        )
        .end(function (err, res) {
          if (err) {
            console.log(err);
          } else {
            expect(res.status).toEqual(200);
            expect(res.text).toEqual(
              '{"fileName":"fileWith20wordsAndDoubleSpaces.txt","wordTotalCount":20,"eachWordCount":"{\\"word\\":20}"}'
            );
          }
          done();
        });
    });
  });
});
