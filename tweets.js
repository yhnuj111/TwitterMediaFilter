const Twitter = require('twitter');
const dotenv = require('dotenv');
const result = dotenv.config();
async function searchTweet(name) {
    let client = new Twitter({
        consumer_key: result.parsed.TWITTER_CONSUMER_KEY,
        consumer_secret: result.parsed.TWITTER_CONSUMER_SECRET,
        bearer_token: result.parsed.TWITTER_BEARER_TOKEN
    });
    let params = {screen_name: name, count: 100};
    return new Promise((resolve, reject) => {client.get('statuses/user_timeline', params, async function(error, tweets, response) {
        let ans = (JSON.parse(JSON.stringify(tweets)));
        console.log(ans);
        if (!error) {
            resolve({status: 200, msg: ans});
        } else {
            // console.log(error);
            reject(error);
        }
    })});
}



module.exports = {
    searchTweet
}
