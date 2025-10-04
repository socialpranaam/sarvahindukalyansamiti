import swaggerJsdoc from "swagger-jsdoc";
import dotenv from 'dotenv';
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AUTH SERVICE",
      version: "1.0.0",
    },
    servers: [{ url: process.env.AUTH_API_BASE_URL }]
  },
  apis: ["./src/routes.js"], 
};

export const swaggerSpec = swaggerJsdoc(options);
