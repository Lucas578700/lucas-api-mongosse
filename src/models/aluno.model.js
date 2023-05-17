//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  id: Number,
  nome: String,
  image_profile: String,
  email: String,
  cpf: String,
  telefone: String,
  password: String,
  status: Boolean,
}, { collection: 'aluno' });


const Aluno = mongoose.model('aluno', schema);

export default Aluno;