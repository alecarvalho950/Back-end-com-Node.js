import express from "express"; // Importa o módulo express para criar a aplicação web
import multer from "multer"; // Importa o módulo multer para realizar upload de arquivos
import listarPosts, { postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções controladoras do arquivo postsController.js
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

// Configura o armazenamento de arquivos para o multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // Define o diretório de destino para os uploads
        cb(null, 'uploads/'); // Define o caminho como 'uploads/'
    },
    filename: function (req, file, cb) { // Define o nome do arquivo salvo
        cb(null, file.originalname); // Utiliza o nome original do arquivo enviado
    }
})

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Define o diretório de destino e o armazenamento

// Função para definir as rotas da aplicação
const routes = (app) => {
    // Permite que o Express entenda requisições com formato JSON no corpo da requisição
    app.use(express.json());

    app.use(cors(corsOptions));

    // Rota GET para listar todos os posts (veja o controlador listarPosts)
    app.get("/posts", listarPosts);

    // Rota POST para criar um novo post (veja o controlador postarNovoPost)
    app.post("/posts", postarNovoPost);

    // Rota POST para upload de imagem e criação de post (veja o controlador uploadImagem)
    // Utiliza o middleware upload.single('imagem') para processar o upload de um único arquivo chamado 'imagem'
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id",atualizarNovoPost);
}

export default routes; // Exporta a função routes para uso na aplicação principal