import bcrypt from "bcrypt";
import Aluno from "../models/aluno.model.js";
import { generateJWTToken } from "../utils/jwt.js";

const createAluno = async (dados) => {
  const { cpf, name, email } = dados;

  const existingAluno = await Aluno.findOne({ $or: [{ cpf }, { name }, { email }] });

  if (existingAluno) {
    throw { status: 400, message: "Já existe um aluno com esses dados." };
  }

  dados.password = bcrypt.hashSync(dados.password, 8);
  const aluno = new Aluno(dados);
  const result = await aluno.save();
  return result;
};

const listAluno = async (id) => {
  const aluno = await Aluno.findById(id).select("-password");
  return aluno;
};

const updateAluno = async (id, dados) => {
  const { cpf, name, email } = dados;

  const existingAluno = await Aluno.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ cpf }, { name }, { email }] }
    ]
  });

  if (existingAluno) {
    throw { status: 400, message: "Já existe um aluno com esses dados." };
  }

  dados.password = bcrypt.hashSync(dados.password, 8);
  const aluno = await Aluno.findByIdAndUpdate(id, dados, { new: true });
  return aluno;
};

const deleteAluno = async (id) => {
  const aluno = await Aluno.findByIdAndUpdate(id, { status: true });
  return aluno;
};

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: "Campos faltantes." };
  }

  const aluno = await Aluno.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, aluno.password);

  if (!aluno || !comparePassword) {
    throw { status: 401, message: "Aluno ou senha inválido" };
  }

  const { _id, name } = aluno;

  // Gerar o token
  const token = generateJWTToken({ _id, name, email, isProfessor: false });
  return { token };
};

export {
  listAluno,
  createAluno,
  updateAluno,
  deleteAluno,
  authentication,
};