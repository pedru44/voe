import * as Yup from 'yup';

const PassageiroValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(45, 'O máximo de caracteres é 45')
        .required('Campo obrigatório'),
    documento: Yup.string()
        .min(8, 'O mínimo de caracteres é 8')
        .required('Campo obrigatório'),
    email: Yup.string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
    telefone: Yup.string()
        .min(10, 'O mínimo de caracteres é 10')
        .required('Campo obrigatório')
});

export default PassageiroValidator;
