// Importa o framework Express para criar a aplicação web
import express from "express"; 
import routes from "./src/routes/postsRoutes.js";

// Dados de posts simulados (serão substituídos pelos dados do banco de dados)
const posts = [
  // ... (dados dos posts)
];

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3001, () => {
  console.log("Servidor escutando...");
});



