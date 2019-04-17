var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    tracery = require('tracery-grammar'),
    config = require(path.join(__dirname, 'config.js')),
    images = require(path.join(__dirname, 'images.js')),
    mainGrammar = require(path.join(__dirname, 'mainGrammar.js'));

var T = new Twit(config),
    grammar = tracery.createGrammar(mainGrammar);

function random_from_array(images) {
    return images[Math.floor(Math.random() * images.length)];
}
