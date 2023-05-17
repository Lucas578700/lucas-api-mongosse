//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
    id: Number,
    quantity: Number,
    product: { type: mongoose.Types.ObjectId, ref: "products" },
    user: { type: mongoose.Types.ObjectId, ref: "users" }
}, { collection: 'sales' });

//cria uma model chamada Users com esse schema passado
const Sales = mongoose.model('sales', schema);

export default Sales;