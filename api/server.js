const express = require('express');
const app = new express();
const mongo = require('mongodb');

app.listen(3000, () => {
    console.log("Server Listening");
  });