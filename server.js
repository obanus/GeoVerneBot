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
    names = [];

//use Twitter stream API to track the hashtag (live)
var stream = T.stream('statuses/filter', {
    track: '#GeoVerneBot'
});

function random_from_array(images) {
    return images[Math.floor(Math.random() * images.length)];
}

//Build an array of tweeter accounts with past interactions with the bot hashtag
function getFriends(hashtag) {
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
            console.log(names);
        } else {
            console.log(err);
        }
    });

    setTimeout(function () {
        mainGrammar["nom"] = names;
    }, 40 * 1000);
}

getFriends('#geovernebot');

//Main function
function tweetWithPicture(images) {
    console.log('Opening an image...');
    //step 1 : select random image
    var random_image = random_from_array(images),
        image_path = path.join(__dirname, '/images/' + random_image.file),
        b64content = fs.readFileSync(image_path, {
            encoding: 'base64'
        }),
        altText = random_image.source;

    console.log('Uploading an image...');
    //step 2 : upload image to Twitter's servers
    T.post('media/upload', {
        media_data: b64content
    }, function (err, data, response) {
        if (err) {
            console.log('ERROR:');
            console.log(err);
        } else {
            console.log('Image uploaded!');

            var mediaIdStr = data.media_id_string,
                altText = random_image.source,
                meta_params = {
                    media_id: mediaIdStr,
                    alt_text: {
                        text: altText
                    }
                };

            // step 3 : add metadata to image
            T.post('media/metadata/create', meta_params, function (err, data, response) {
                console.log('Adding metadata...');
                if (!err) {
                    //step 4 : post tweet
                    console.log('Tweeting...');
                    T.post('statuses/update', {
                            status: grammar.flatten('#origin#'), // tracery result
                            media_ids: [mediaIdStr]
                        },
                        function (err, data, response) {
                            if (err) {
                                console.log('ERROR:');
                                console.log(err);
                            } else {
                                console.log('Success : posted status with an image & altText !');
                            }
                        }
                    );
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
grammar = tracery.createGrammar(mainGrammar);
    T.post('statuses/update', {
         status: grammar.flatten('#reponse#'),
        in_reply_to_status_id: tweet.id_str
    }, function (err, data, response) {
        if (err) {
            console.log(err);
        } else {
            console.log('reply done');
        }
    });
});
