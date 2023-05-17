// importamos o model de user
// importamos a função de criar o token
import bcrypt from 'bcrypt';
import Users from '../models/user.models.js';
import { generateJWTToken } from '../utils/jwt.js';
import Address from '../models/address.models.js';

// vamos criar um novo usuario
// recebemos os dados do usuario (dados)
// criamos uma instancia do modelo Users passando os dados recebidos
// e chamamos a funcao de inserir dados na collection Users
// retornamos os dados salvos
const criarDocumento = async (dados) => {
  console.log(dados);
  dados.password = bcrypt.hashSync(dados.password, 8);
  const documento = new Users(dados);
  const resultado = await documento.save();
  return documento;
};

const criarUsuarioEndereco = async (dados) => {
  const { user, address } = dados;
  console.log(dados);

  user.password = bcrypt.hashSync(user.password, 8);
  const userCreate = new Users(user);
  await userCreate.save();

  address.owner = userCreate._id;
  const addressCreate = new Address(address);
  await addressCreate.save();

  return { userCreate, addressCreate };
};

// a partir da model Users, buscamos os dados solicitados
// ele vai buscar os dados de todos usuarios registrados
const listarDocumentos = async () => {
  const documentos = await Users.find();
  return documentos;
};

// a partir da model Users, buscamos os dados solicitados
// ele vai buscar os dados de todos usuarios registrados
const buscarUsuarioEndereco = async () => {
  const documentos = await Address.find().populate("owner");
  return documentos;
};

// a partir da model Users, buscamos os dados solicitados
// ele vai buscar os dados de um unico usuario baseado no ID passado
const listarDocumento = async (id) => {
  const documento = await Users.findById(id).select('-password');
  return documento;
};

// recebemos o id do user e os dados para fazer a atualizacao
// chamamos a funcao que busca o registro baseado no id passado e faz o update
// o new: true significa que vamos retornar os dados ja atualizados
const atualizarDocumento = async (id, dados) => {
  dados.password = bcrypt.hashSync(dados.password, 8);
  const documento = await Users.findByIdAndUpdate(id, dados, { new: true });
  return documento;
};

// com base no id, vamos achar o registro e deletar ele
const deletarDocumento = async (id) => {
  await Users.findByIdAndDelete(id);
};

// aqui recebemos o email e password para fazer login
// verificamos se os dados estao presentes
// achamos os dados do user baseado em seu email
// se nao tiver, retornamos erro
// se tiver, vamos verificar se a senha e email estao corretos
// se estiverem corretos, gera o token e salva o id, name e email no payload do token
// retorna o token já criado
const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: 'Campos faltantes.' };
  }

  const user = await Users.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, user.password);
  console.log(password, user.password);
  console.log(comparePassword);

  if (!user || !comparePassword) {
    throw { status: 401, message: 'Usuário ou senha inválido' };
  }

  const { _id, name } = user;

  // Gerar o token
  const token = generateJWTToken({ _id, name, email });
  return { token };
};

export {
  criarDocumento,
  listarDocumentos,
  listarDocumento,
  atualizarDocumento,
  deletarDocumento,
  authentication,
  criarUsuarioEndereco,
  buscarUsuarioEndereco
};
