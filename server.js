const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const routes = require('./src/routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5500']
}
app.use(cors(corsOptions));


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Swagger API Documentation',
        version: '1.0.0',
        description: '',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: [
        "server.js",
        "src/controllers/*.js",
        "src/routes/*.js",
    ],
  };

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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







/**
 * @swagger
 * /:
 *   get:
 *     summary: Get home
 *     description: Returns a success message
 *     responses:
 *       200:
 *         description: Success message
 */