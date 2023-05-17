import { Router } from "express";
import {
  listCurso,
  createCurso,
  updateCurso,
  deleteCurso,
  listInfosCurso,
} from "../services/curso.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";

import {cursoSchema} from "../utils/schemaValidation.js";

const cursoRoutes = Router();

cursoRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const cursos = await listCurso();
  return res.status(200).json(cursos);
});

cursoRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const curso = await listCurso(id);
  return res.status(200).json(curso);
});


cursoRoutes.get("infos-curso/", async (req, res) => {
  const { nome } = req.query;

  try {    
    const curso = await listInfosCurso(nome);
    if (!curso) {
      throw { status: 404, message: "Curso não encontrado" };
    }

    res.status(200).json(curso);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});


cursoRoutes.post("/", authenticationMiddleware, async (req, res) => {
  const { error } = await cursoSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const cursoCreated = await createCurso(req.body, res.locals.payload.isProfessor);

  return res.status(200).json(cursoCreated);
});

cursoRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await cursoSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const cursoUpdated = await updateCurso(id, req.body, res.locals.payload.isProfessor);
  return res.status(200).json(cursoUpdated);
});

cursoRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const cursoDeleted = await deleteCurso(id);
  return res.status(200).json(cursoDeleted);
});

export default cursoRoutes;