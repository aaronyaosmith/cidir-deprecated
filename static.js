const express = require('express');

const PORT = 5000;

const app = express();
app.use(express.static('public'))

let server = app.listen(PORT, () => {
    console.log('Listening on localhost:' + PORT);
});
