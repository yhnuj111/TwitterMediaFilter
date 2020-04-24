const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');
const tweets = require('./tweets');
const functions = require('firebase-functions');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({origin: true}));


var port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({
  extended: false
}));
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// app.get('/twitters', async (req, res) => {
//     try {
//     let allTweets =  await tweets.getTweet();
        
//         res.send(allTweets);
       
//     } catch (err) {
//         console.log("err: "+ err);
//         res.send({status: 500});
//     }
// });

app.get('/index', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.send(`
      <!doctype html>
      <head>
        <title>Time</title>
        <link rel="stylesheet" href="/style.css">
        <script src="/script.js"></script>
      </head>
      <body>
        <p>In London, the clock strikes:
          <span id="bongs">${'BONG '.repeat(hours)}</span></p>
        <button onClick="refresh(this)">Refresh</button>
      </body>
    </html>`);
  });
  app.get('/api', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.json({bongs: 'BONG '.repeat(hours)});
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
exports.app = functions.https.onRequest(app);

