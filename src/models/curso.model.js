//importa o mongoose
import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

//cria o esquema (schema) a ser adicionado na model
const schema = new mongoose.Schema(
  {
    id: Number,
    nome: String,
    descricao: String,
    carga_horaria: Date,
    avaliation: Number,
    valor: Decimal128,
    logo: String,
    status: Boolean,
    professor_responsible: { type: mongoose.Types.ObjectId, ref: "professor" },
  },
  { collection: "curso" }
);


const Curso = mongoose.model("curso", schema);

export default Curso;