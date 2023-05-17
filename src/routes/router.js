import { Router } from "express";
import alunoController from "../controllers/aluno.controller.js"
import professorController from "../controllers/professor.controller.js"
import cursoController from "../controllers/curso.controller.js"
import matriculaController from "../controllers/matricula.controller.js" 

//habilita o uso de rotas
const routes = Router();

routes.use('/alunos', alunoController);
routes.use('/professores', professorController);
routes.use('/cursos', cursoController);
routes.use('/matriculas', matriculaController);

export default routes;