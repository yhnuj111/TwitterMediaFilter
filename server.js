const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors');
const tweets = require('./tweets');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
let router = express.Router();


var port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/twitters', async (req, res) => {
    try {
    let allTweets =  await tweets.getTweet();
        
        res.send(allTweets);
       
    } catch (err) {
        console.log("err: "+ err);
        res.send({status: 500});
    }
});

app.post('/search', async (req, res) => {
    const name = req.body.screen_name;
    try {
        let allTweets =  await tweets.searchTweet(name);
            
            res.send(allTweets);
           
        } catch (err) {
            console.log("err: "+ err);
            res.send({status: 500});
        }
});


app.listen(port, ()=>{
    console.log('Listening on port ' + port);
});
