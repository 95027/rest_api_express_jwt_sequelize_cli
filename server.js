const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./src/routes');
require('dotenv').config();

var corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500']
}
// midddleware for json data from req.body
app.use(cors(corsOptions));
app.use(bodyParser.json());

// for logging every http request
//app.use(morgan('combined'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: "success"
    });
});

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});