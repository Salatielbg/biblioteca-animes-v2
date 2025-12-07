import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BIBLIOTECA DE ANIMES API",
      version: "1.0.0",
      description: "API para gerenciar biblioteca de animes",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento"
      }
    ]
  },
  apis: [join(__dirname, '../routes/*.js')], // caminho correto para as rotas
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
