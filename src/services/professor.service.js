import bcrypt from "bcrypt";
import Professor from "../models/professor.model.js";
import { generateJWTToken } from "../utils/jwt.js";

const createProfessor = async (dados, isProfessor, imagePath) => {
  if (!isProfessor) {
    throw { status: 401, message: "Apenas professores podem cadastrar professores." };
  }

  const { name, email } = dados;

  const existingEstudante = await Professor.findOne({ $or: [{ name }, { email }] });

  if (existingEstudante) {
    throw { status: 400, message: "Já existe um professor com esses dados." };
  }

  dados.password = bcrypt.hashSync(dados.password, 8);
  dados.image_profile = imagePath;

  const professor = new Professor(dados);
  const result = await professor.save();
  return result;
};

const listProfessor = async (id) => {
  const professor = await Professor.findById(id).select("-password");
  return professor;
};

const updateProfessor = async (id, dados, isProfessor) => {
  if (!isProfessor) {
    throw { status: 401, message: "Apenas professores podem editar professores." };
  }

  const { name, email } = dados;

  const existingEstudante = await Estudante.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ name }, { email }] }
    ]
  });

  if (existingEstudante) {
    throw { status: 400, message: "Já existe um professor com esses dados." };
  }

  dados.password = bcrypt.hashSync(dados.password, 8);
  const professor = await Professor.findByIdAndUpdate(id, dados, { new: true });
  return professor;
};

const deleteProfessor = async (id, isProfessor) => {
  if (!isProfessor) {
    throw { status: 401, message: "Apenas professores podem remover professores." };
  }

  const professor = await Professor.findByIdAndUpdate(id, { situacao: true });
  return professor;
};

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: "Campos faltantes." };
  }

  const professor = await Professor.findOne({ email });

  const comparePassword = bcrypt.compareSync(password, professor.password);

  if (!professor || !comparePassword) {
    throw { status: 401, message: "Professor ou senha inválido" };
  }

  const { _id, name } = professor;

  // Gerar o token
  const token = generateJWTToken({ _id, name, email, isProfessor: true });
  return { token };
};

export {
  listProfessor,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  authentication,
};