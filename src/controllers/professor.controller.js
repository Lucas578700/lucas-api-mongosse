import { Router } from "express";
import {
  listProfessor,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  authentication,
} from "../services/professor.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

import {professorSchema} from "../utils/schemaValidation.js";

const professorRoutes = Router();

professorRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const professores = await listProfessor();
  return res.status(200).json(professores);
});

professorRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const professor = await listProfessor(id);
  return res.status(200).json(professor);
});

professorRoutes.post("/", authenticationMiddleware, upload.single('imagem'), async (req, res) => {
  const { error } = await professorSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const professorCreated = await createProfessor(req.body, res.locals.payload.isProfessor);

  return res.status(200).json(professorCreated);
});

professorRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await professorSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const professorUpdated = await updateProfessor(id, req.body, res.locals.payload.isProfessor);
  return res.status(200).json(professorUpdated);
});

professorRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const professorDeleted = await deleteProfessor(id, res.locals.payload.isProfessor);
  return res.status(200).json(professorDeleted);
});

professorRoutes.post('/login', async (req, res) => {
  const token = await authentication(req.body);
  res.status(200).json(token);
})

export default professorRoutes;