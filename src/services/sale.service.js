import Sales from '../models/sale.model.js';

const criarVenda = async (dados) => {
  console.log(dados);
  const saleCreated = new Sales(dados);
  await saleCreated.save();
  return saleCreated;
}; 

const listarVendas = async () => {
  const sales = await Sales.find().populate("user").populate("product");
  return sales;
};


export {
  criarVenda,
  listarVendas
};
