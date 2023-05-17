//importamos a biblioteca jsonwebtoken e dotenv
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

//sempre que usarmos alguma variavel de ambiente no arquivo
//precisamos adicionar a config do dotenv para ele "enxergar" a variavel e o valor dela
//nesse caso aqui, é a SECRET
dotenv.config();

//criamos um segredo, sendo que o valor desse segredo
//está armazenado na variavel de ambiente chamada SECRET
const SECRET = process.env.SECRET;

//aqui configuramos o JWT para expirar dentro de 1h e usar o alg HS256 para criptografia
const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
}

//aqui criamos uma função para gerar o token
//passamos o payload = dados que queremos guardar do user, não podem ser dados "sensíveis"
//o segredo via variavel de ambiente
//e as configurações para criar o JWT
const generateJWTToken = (payload) => 
    jwt.sign(payload, SECRET, jwtConfig);

//aqui criamos uma função para verificar se o token é válido
//recebemos o token enviado e verificamos se ele existe e é válido
//isso é feito pela funçõa verify, que recebe o token, o segredo e a configuração
//ela retorna erro se for inválido
//ela retorna os dados desconstruidos do payload se estiver valido
const authenticateToken = async (token) => {
    if (!token) {
        throw { status: 401, message: "Sem Token" };
    }

    try{
        const introspection = await jwt.verify(token, SECRET, jwtConfig);
        return introspection;
    } catch (e) {
        console.log("error", e.message)
        throw { status: 401, message: "token inválido" };
    }

}

export {
    generateJWTToken,
    authenticateToken
}