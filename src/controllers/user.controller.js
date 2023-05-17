//importo a parte de rotas e os metodos a serem chamados em service
//importo também o middleware que verifica o token
import { Router } from 'express';
import { criarDocumento, listarDocumentos, listarDocumento, atualizarDocumento, 
    deletarDocumento, authentication, criarUsuarioEndereco, 
    buscarUsuarioEndereco } from '../services/user.service.js';
import authenticationMiddleware from '../middlewares/auth.middleware.js';
import { userSchema } from '../utils/schemaValidation.js';

//habilito as rotas
const userRoutes = Router();

// Define a rota para listar todos os usuários
userRoutes.get('/', async (req, res) => {
    const users = await listarDocumentos();
    return res.status(200).json(users);
});

// Define a rota para listar todos os usuários com seus endereços associados
userRoutes.get('/user_address', async (req, res) => {
    const usersAddress = await buscarUsuarioEndereco();
    return res.status(200).json(usersAddress);
});

// Define a rota para buscar um usuário por ID
userRoutes.get('/:id', authenticationMiddleware, async (req, res) => {
    const { id } = req.params;

    const user = await listarDocumento(id);
    return res.status(200).json(user);
});

// Define a rota para criar um novo usuário
userRoutes.post('/', async (req, res) => {

    const { error } = await userSchema.validate(req.body);

    if (error) {
        throw { status: 401, message: error.message };
    }

    const userCreated = await criarDocumento(req.body);

    return res.status(200).json(userCreated);
});

// Define a rota para criar um novo usuário com endereço
userRoutes.post('/user_address', async (req, res) => {
    const userAddress = await criarUsuarioEndereco(req.body);

    return res.status(200).json(userAddress);
});

// Define a rota para atualizar um usuário existente por ID
userRoutes.put('/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await userSchema.validate(req.body);

    if (error) {
        throw { status: 401, message: error.message };
    }

    const userUpdated = await atualizarDocumento(id, req.body);
    return res.status(200).json(userUpdated);
});

// Define a rota para excluir um usuário existente por ID
userRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userDeleted = await deletarDocumento(id);
    return res.status(200).json(userDeleted);
});

userRoutes.post('/login', async (req, res) => {
    const token = await authentication(req.body);
    res.status(200).json(token);
})

export default userRoutes;