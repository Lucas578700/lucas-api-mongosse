import 'express-async-errors';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware.js';
import routes from './routes/router.js';
import connection from './database/connection.js';

const app = express();

const port = 3001;

// estamos dizendo que nossos dados vão estar no formato JSON
app.use(express.json());

// cria a conexão ao iniciar a API
connection;

// estamos direcionando todas requisições para nossas rotas
app.use(routes); 

// ativa o middleware de erro
app.use(errorMiddleware);

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
