var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    tracery = require('tracery-grammar'),
    config = require(path.join(__dirname, 'config.js')),
    images = require(path.join(__dirname, 'images.js')),
    mainGrammar = require(path.join(__dirname, 'mainGrammar.js'));
