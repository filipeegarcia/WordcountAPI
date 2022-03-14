# Wordcount App

Welcome to the Wordcount App!
This is an application that receives a .txt file on the frontend, and submit this file to a REST API that counts the total words, and each word occurance, from a given .txt

### Installing the dependencies

With the repo cloned on your machine, on the `$yourpath/WordCountAPI/wordcount` directory, you'll need to first move to the client directory: `cd client`.

On `$yourpath/WordCountAPI/wordcount/client`, run `yarn install`. After that, you need to move to the api directory: `cd ../api`.

On `$yourpath/WordCountAPI/wordcount/api`, run `yarn install`.

### Running the application

Running the application is very simple. On the `$yourpath/WordCountAPI/wordcount/api` directory, run `yarn dev`. The server will be launch on your `http://localhost:3000/`.
