import React, { Fragment, useState } from "react";
import Message from "./Message";
import axios from "axios";

//Component used to receive the .txt file.
const FileUploader = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose a .txt file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");

  const onChange = (event) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    //Post request to the rest api. The api should return the counts.
    //If the request fails for some reason, the error is displayed on the message.
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, wordTotalCount, eachWordCount } = res.data;

      setUploadedFile({ fileName, wordTotalCount, eachWordCount });

      setMessage("Words counted successfully");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the api");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center"> File name: {uploadedFile.fileName}</h3>
            <h3 className="text-center">
              {" "}
              Total word count: {uploadedFile.wordTotalCount}
            </h3>
            <h3 className="text-center">
              {" "}
              Each word count: {uploadedFile.eachWordCount}
            </h3>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUploader;
