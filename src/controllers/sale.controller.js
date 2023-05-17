//importo a parte de rotas e os metodos a serem chamados em service
//importo também o middleware que verifica o token
import { Router } from 'express';
import { criarVenda, listarVendas } from '../services/sale.service.js';

const productRoutes = Router();

productRoutes.get('/', async (req, res) => {
    const sales = await listarVendas();
    return res.status(200).json(sales);
}); 

productRoutes.post('/', async (req, res) => {

    const saleCreated = await criarVenda(req.body);

    return res.status(200).json(saleCreated);
});

export default productRoutes;