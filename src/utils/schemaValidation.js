import Joi from 'joi';
import JoiDate from '@joi/date';

const JoiExtended = Joi.extend(JoiDate);

const userSchema = JoiExtended.object({
    name: JoiExtended.string().required().max(50),
    cpf: JoiExtended.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    email: JoiExtended.string().email().required().max(50),
    password: JoiExtended.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
});


const alunoSchema = JoiExtended.object({
    nome: JoiExtended.string().required().max(50),
    image_profile: JoiExtended.string().required().max(50),
    email: JoiExtended.string().email().required().max(50),
    cpf: JoiExtended.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    telefone: JoiExtended.string().regex(/^\d{2}-\d{4,5}-\d{4}$/).required(),
    password: JoiExtended.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    status: JoiExtended.boolean().required(),
});


const professorSchema = JoiExtended.object({
    nome: JoiExtended.string().required().max(50),
    image_profile: JoiExtended.string().required().max(50),
    email: JoiExtended.string().email().required().max(50),
    biografia: JoiExtended.string().required().max(50),
    expertise: JoiExtended.string().required().max(50),
    git_hub: JoiExtended.string().required().max(50),
    linkedin: JoiExtended.string().required().max(50),
    password: JoiExtended.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    status: JoiExtended.boolean().required(),
});


const cursoSchema = JoiExtended.object({
    nome: JoiExtended.string().required().max(50),
    descricao: JoiExtended.string().required(),
    carga_horaria: JoiExtended.date().format('DD/MM/YYYY').utc().required(),
    avaliation: JoiExtended.number().required(),
    valor: JoiExtended.number().required().precision(2),
    logo: JoiExtended.string().required().max(50),
    status: JoiExtended.boolean().required(),
    professor_responsible: JoiExtended.number().required(),
});


const matriculaSchema = JoiExtended.object({
    aluno: JoiExtended.number().required(),
    curso: JoiExtended.number().required(),
    data_matricula: JoiExtended.date().format('DD/MM/YYYY').utc().max('now').required(),
    status: JoiExtended.boolean().required(),
});


export {
    userSchema,
    alunoSchema,
    professorSchema,
    cursoSchema,
    matriculaSchema,
};