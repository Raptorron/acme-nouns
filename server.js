const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

db.syncAndSeed().then(() => app.listen(3000, console.log('listening on port 3000')));
