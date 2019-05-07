var fs = require('fs'),
    path = require('path'),
    schedule = require('node-schedule'),
    Twit = require('twit'),
    tracery = require('tracery-grammar'),
    config = require(path.join(__dirname, 'config.js')),
    images = require(path.join(__dirname, 'images.js')),
    mainGrammar = require(path.join(__dirname, 'mainGrammar.js'));

var T = new Twit(config),
    grammar = tracery.createGrammar(mainGrammar),
    names = [],
    replyText;

//use Twitter stream API to track the hashtag (live)
var stream = T.stream('statuses/filter', {
    track: '#GeoVerneBot'
});

function logErrorOrSuccess(err, data, response, msg) {
    if (err) {
        console.log(err);
    } else {
        console.log(msg);
    }
}

function includeSelectedUserInReply(user, callback) {
    mainGrammar.nom = ['@' + user];
    grammar = tracery.createGrammar(mainGrammar);
    replyText = grammar.flatten('#reponse#');
    console.log(replyText);
    callback();
}

function postRewteetReply(text,idStrToReply) {
    console.log(idStrToReply);
    T.post('statuses/update', {
        status: text,
        in_reply_to_status_id: idStrToReply
    }, logErrorOrSuccess('reply to RT done'));
}

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

//Build an array of tweeter accounts with past interactions with the bot hashtag
function getFriends(hashtag) {
    console.log('searching...');
    T.get('search/tweets', {
        q: hashtag,
        count: 1000,
        result_type: 'recent'
    }, function (err, data, response) {
        if (!err) {
            for (var i = 0; i < data.statuses.length; i++) {
                // Get the tweet author names from the returned data
                if (names.indexOf('@' + data.statuses[i].user.screen_name) < 0) names.push('@' + data.statuses[i].user.screen_name);
            }
            mainGrammar.nom = names;
            console.log(names);
        } else {
            console.log(err);
        }
    });
}

getFriends('#geovernebot');

//Main function
function tweetWithPicture(imgArray) {
    console.log('Opening an image...');
    //step 1 : select random image
    var randomImage = randomFromArray(imgArray),
        imagePath = path.join(__dirname, '/images/' + randomImage.file),
        b64Content = fs.readFileSync(imagePath, {
            encoding: 'base64'
        }),
        altText = randomImage.source;

    console.log('Uploading an image...');
    //step 2 : upload image to Twitter's servers
    T.post('media/upload', {
        media_data: b64Content
    }, function (err, data, response) {
        if (err) {
            console.log('ERROR:');
            console.log(err);
        } else {
            console.log('Image uploaded!');

            var mediaIdStr = data.media_id_string,
                altText = randomImage.source,
                params = {
                    media_id: mediaIdStr,
                    alt_text: {
                        text: altText
                    }
                };

            // step 3 : add metadata to image
            T.post('media/metadata/create', params, function (err, data, response) {
                console.log('Adding metadata...');
                if (!err) {
                    //step 4 : post tweet
                    console.log('Tweeting...');
                    T.post('statuses/update', {
                            status: grammar.flatten('#origin#'), // tracery result
                            media_ids: [mediaIdStr]
                        }, logErrorOrSuccess('posted status with an image & altText'));
                }
            });
        }
    });
}

var j = schedule.scheduleJob({
    hour: 15,
    minute: 30
}, function () {
    tweetWithPicture(images);
});

console.log('GeoVerneBot, up and running');

stream.on('tweet', function (tweet) {
    // do not reply if original twit is home made
    grammar = tracery.createGrammar(mainGrammar);
    if (tweet.user.screen_name != config.screen_name && tweet.text.startsWith('RT') === false) {
        T.post('statuses/update', {
            status: grammar.flatten('#reponse#'),
            in_reply_to_status_id: tweet.id_str
        }, logErrorOrSuccess('reply to RT done successfully'));
    }
    if (tweet.user.screen_name != config.screen_name && tweet.text.startsWith('RT')) {
        includeSelectedUserInReply(tweet.user.screen_name, postRewteetReply.bind(replyText, tweet.id_str));
    }
});
