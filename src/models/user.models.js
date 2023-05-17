//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  id: Number,
  name: String,
  cpf: String,
  email: String,
  password: String
}, { collection: 'users' });

//cria uma model chamada Users com esse schema passado
const Users = mongoose.model('users', schema);

export default Users;
