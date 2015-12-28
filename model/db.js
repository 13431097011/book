var express = require('express');
var app = express();
var settings = require('../settings')(app);
var mongoose = require('mongoose');
var connectStr = 'mongodb://'+settings.host+':'+settings.port+'/'+settings.db;
mongoose.connect(connectStr);
module.exports = mongoose;

