const {google} = require('googleapis');
const express = require('express');
const jwtDecode = require('jwt-decode');

const PORT = 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


const app = express();

const urlLogger = (request, response, next) => {
    console.log('Request URL:', request.url);
    next();
};

const timeLogger = (request, response, next) => {
    console.log('Request time:', new Date(Date.now()).toString());
    next();
};

const client = new google.auth.OAuth2(CLIENT_ID);

app.use(urlLogger, timeLogger);
app.use(express.static('public'));
app.use(express.urlencoded(type='application/x-www-form-urlencoded'));

app.get('/', function (req, res) {});

app.post('/signin', async function(request, response) {
    const ticket = await client.verifyIdToken({
	idToken: request.body.idtoken,
	audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    console.log('Verified user ' + payload['name'] + ' ' + payload['email']);
    response.send(payload['email']);
});

app.get('/signup', async function(request, response) {
    response.send('hello, ' + request.query.email + ': Sign up for a new CIDir profile! form below')
})



let server = app.listen(PORT, () => {
    console.log('Listening on localhost:' + PORT);
});
