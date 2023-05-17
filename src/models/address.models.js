//importa o mongoose
import mongoose from 'mongoose';

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema({
  id: Number,
  street: String,
  city: String,
  state: String,
  zip: String,
  owner: { type: mongoose.Types.ObjectId, ref: "users" }
}, { collection: 'address' });

//cria uma model chamada Users com esse schema passado
const Address = mongoose.model('address', schema);

export default Address;
