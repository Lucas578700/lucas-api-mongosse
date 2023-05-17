import { Router } from "express";
import {
  listMatricula,
  createMatricula,
  updateMatricula,
  deleteMatricula,
} from "../services/matricula.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";

import {matriculaSchema} from "../utils/schemaValidation.js";

const matriculaRoutes = Router();

matriculaRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const matriculas = await listMatricula();
  return res.status(200).json(matriculas);
});

matriculaRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const matricula = await listMatricula(id);
  return res.status(200).json(matricula);
});

matriculaRoutes.post("/", authenticationMiddleware, async (req, res) => {
  const { error } = await matriculaSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const matriculaCreated = await createMatricula(req.body);

  return res.status(200).json(matriculaCreated);
});

matriculaRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await matriculaSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const matriculaUpdated = await updateMatricula(id, req.body);
  return res.status(200).json(matriculaUpdated);
});

matriculaRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const matriculaDeleted = await deleteMatricula(id);
  return res.status(200).json(matriculaDeleted);
});

export default matriculaRoutes;