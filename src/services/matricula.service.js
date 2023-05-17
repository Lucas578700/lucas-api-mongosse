import Matricula from "../models/matricula.model.js";

const createMatricula = async (dados) => {
  const matricula = new Matricula(dados);
  const result = await matricula.save();
  return result;
};

const listMatricula = async (id) => {
  const matricula = await Matricula.findById(id).select("-password");
  return matricula;
};

const updateMatricula = async (id, dados) => {
  const matricula = await Matricula.findByIdAndUpdate(id, dados, { new: true });
  return matricula;
};

const deleteMatricula = async (id) => {
  const matricula = await Matricula.findByIdAndUpdate(id, { status: true });
  return matricula;
};

export {
  listMatricula,
  createMatricula,
  updateMatricula,
  deleteMatricula,
};