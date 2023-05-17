import Curso from "../models/curso.model.js";

const createCurso = async (dados, isProfessor) => {
  if (!isProfessor) {
    throw { status: 401, message: "Apenas professores podem cadastrar cursos." };
  }

  const curso = new Curso(dados);
  const result = await curso.save();
  return result;
};

const listCurso = async (id) => {
  const curso = await Curso.findById(id);
  return curso;
};

const listInfosCurso = async (nome) => {
   const curso = await Curso.findOne({ name: nome })
    .populate("professor_responsible", "nome email")
    .populate({
      path: "matriculas",
      populate: { path: "estudante", select: "nome email" },
    });
  return curso;
};

const updateCurso = async (id, dados, isProfessor) => {
  if (!isProfessor) {
    throw { status: 401, message: "Apenas professores podem editar cursos." };
  }

  const curso = await Curso.findByIdAndUpdate(id, dados, { new: true });
  return curso;
};

const deleteCurso = async (id, isProfessor) => {
  if (!isProfessor) {
    throw { status: 401, message: "Apenas professores podem remover cursos." };
  }

  const curso = await Curso.findByIdAndUpdate(id, { status: true });
  return curso;
};

export {
  listCurso,
  createCurso,
  updateCurso,
  deleteCurso,
  listInfosCurso,
};