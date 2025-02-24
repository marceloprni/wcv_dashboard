const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const session = require("express-session");
/* SQL */
const connection = require('./database/database');
const routes = require('./routes');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const porta = 3500;

module.exports = {
  app,
  http,
  io,
  porta,
  connection,
  routes,
  express,
  bodyParser
}

