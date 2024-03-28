const express = require('express');
const app = express();
const routes = require('./src/routes');

// midddleware for json data from req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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