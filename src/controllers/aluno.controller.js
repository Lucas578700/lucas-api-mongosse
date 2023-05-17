import { Router } from "express";
import {
  listAluno,
  createAluno,
  updateAluno,
  deleteAluno,
  authentication,
} from "../services/aluno.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";

import {alunoSchema} from "../utils/schemaValidation.js";

const alunoRoutes = Router();

alunoRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const alunos = await listAluno();
  return res.status(200).json(alunos);
});

alunoRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const aluno = await listAluno(id);
  return res.status(200).json(aluno);
});

alunoRoutes.post("/", async (req, res) => {
  const { error } = await alunoSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const alunoCreated = await createAluno(req.body);

  return res.status(200).json(alunoCreated);
});

alunoRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await alunoSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const alunoUpdated = await updateAluno(id, req.body);
  return res.status(200).json(alunoUpdated);
});

alunoRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const alunoDeleted = await deleteAluno(id);
  return res.status(200).json(alunoDeleted);
});

alunoRoutes.post('/login', async (req, res) => {
  const token = await authentication(req.body);
  res.status(200).json(token);
})

export default alunoRoutes;