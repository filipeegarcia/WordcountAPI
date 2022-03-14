const request = require("supertest");
const app = require("./../server");

describe("WordCount", () => {
  describe(".getFileWordCounts", () => {
    it("should return 400 if no file is uploaded", async () => {
      const res = await request(app).post("/upload").send({ files: null });
      files.file.name;
      expect(res.status).toEqual(400);
    });

    it("should return 400 if no file the file is not .txt", async () => {
      const file = {
        name: "nontextfile.png",
      };

      const res = await request(app).post("/upload").send({ files: file });
      expect(res.status).toEqual(400);
    });

    it("should return 400 if no file the file is larger than 10MB", async () => {
      const file = {
        size: 10000001,
      };
      const res = await request(app).post("/upload").send({ files: file });

      expect(res.status).toEqual(400);
    });

    it("should return the word counts for a valid file", async () => {
      const fileContent = "wordcount content sample for test test test";
      const file = {
        size: 10000,
        name: "sample.txt",
        data: Buffer.from(fileContent, "utf-8"),
      };
      const res = await request(app).post("/upload").send({ files: file });

      expect(res.body).toEqual({
        fileName: file.name,
        wordTotalCount: 7,
        eachWordCount: '"wordcount":1 "content":1 "sample":1 "for":1 "test":3"',
      });
    });
  });
});
