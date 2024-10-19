import * as Yup from 'yup';

const PassagemValidator = Yup.object().shape({
  voo_id: Yup.string()
    .required('ID do Voo é obrigatório'),
  passageiro_id: Yup.string()
    .required('ID do Passageiro é obrigatório'),
  assento: Yup.string()
    .required('Assento é obrigatório'),
  preco: Yup.number()
    .required('Preço é obrigatório')
    .positive('O preço deve ser um número positivo')
    .min(0, 'O preço não pode ser negativo'),
});

export default PassagemValidator;
