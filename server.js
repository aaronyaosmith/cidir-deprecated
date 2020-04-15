// OAuth
// Client ID 310338910105-n7o4orobs4o30n9jjsb40pnsfhe46ijq.apps.googleusercontent.com
// Client Secret 59E93GQE5Z9jNN-fyJTQKCvx


const {google} = require('googleapis');
const express = require('express');
const jwtDecode = require('jwt-decode');

const PORT = 5000;
const CLIENT_ID = '310338910105-n7o4orobs4o30n9jjsb40pnsfhe46ijq.apps.googleusercontent.com'
const CLIENT_SECRET = '59E93GQE5Z9jNN-fyJTQKCvx'


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'http://lvh.me:5000');
const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'profile', 'email']
});

const app = express();

const urlLogger = (request, response, next) => {
    console.log('Request URL:', request.url);
    next();
};

const timeLogger = (request, response, next) => {
    console.log('Request time:', new Date(Date.now()).toString());
    next();
};

// add these callbacks to all handlers
app.use(urlLogger, timeLogger);

app.get('/', async function(request, response) {
    if (typeof request.query.code === 'undefined') {
	response.send('WELCOME TO CTAS<br /><a href=' + url + '>Login</a>');
    } else {
	let {tokens} = await oauth2Client.getToken(request.query.code);
	oauth2Client.setCredentials(tokens);
	let profile = jwtDecode(tokens.id_token);
	response.send('WELCOME TO CTAS, ' + profile.email + '!<br /><a href=http://lvh.me:5000>Logout</a>');
    }
});

let server = app.listen(PORT, () => {
    console.log('Express intro running on localhost:' + PORT);
});
