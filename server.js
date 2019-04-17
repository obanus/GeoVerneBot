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
