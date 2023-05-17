//todo middleware de erro tem estes 4 parametros: err, req, res, next
//recebe o status (codigo) do erro, se nao for passado, vai ser padrao o codigo 500
//retorna a mensagem de erro ou aquele texto padrao
const errorMiddleware = (err, req, res, _next) => 
  res.status(err.status || 500)
  .json({ message: err.message || "Erro inesperado. Por favor, tente mais tarde" });

export default errorMiddleware;