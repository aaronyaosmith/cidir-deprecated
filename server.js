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
app.use(express.urlencoded({
    extended: true,
    type: 'application/x-www-form-urlencoded'
}));

app.get('/', function (req, res) {});

let getSessionToken = async function (googleToken) {
    const ticket = await client.verifyIdToken({
	idToken: request.body.idtoken,
	// Specify the CLIENT_ID of the app that accesses the backend
	audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    console.log('Verified user ' + payload['name'] + ' ' + payload['email']);
    return payload(['email']);
};

app.get('/auth', async function(request, response) {
    const googleToken = request.body.googleToken;
    const cookie = getSessionToken(googleToken);
    // send cookie placeholder
    response.send('heres your cookie: ' + cookie);
});


let server = app.listen(PORT, () => {
    console.log('Listening on localhost:' + PORT);
});
