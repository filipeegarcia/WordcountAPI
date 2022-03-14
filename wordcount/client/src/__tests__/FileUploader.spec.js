import React from "react";
import FileUploader from "../components/FileUploader";
import { render, screen } from "@testing-library/react";

it("shoud render upload button", () => {
  render(<FileUploader></FileUploader>);

  const fileUploaderTitle = screen.getAllByText("Upload");
  expect(fileUploaderTitle).toBeDefined();
});

it("shoud render file name field", () => {
  render(<FileUploader></FileUploader>);

  const fileUploaderTitle = screen.getAllByText("File name:");
  expect(fileUploaderTitle).toBeDefined();
});

it("shoud render total word count field", () => {
  render(<FileUploader></FileUploader>);

  const fileUploaderTitle = screen.getAllByText("Total word count:");
  expect(fileUploaderTitle).toBeDefined();
});

it("shoud render each word count field", () => {
  render(<FileUploader></FileUploader>);

  const fileUploaderTitle = screen.getAllByText("Each word count:");
  expect(fileUploaderTitle).toBeDefined();
});
