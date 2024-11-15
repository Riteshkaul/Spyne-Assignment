const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerPaths = require("./swaggerPath.js");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car Management Application API",
      description:
        "API documentation for the Car Management Application with cookie-based authentication",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://spyne-assignment-3.onrender.com/api",
      },
    ],
    paths: swaggerPaths,
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const router = express.Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
