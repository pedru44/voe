import * as Yup from "yup";

const PassageiroValidator = Yup.object().shape({
    nome: Yup.string()
        .required('Campo obrigatório')
        .min(3, 'O mínimo de caracteres é 3!'),
    tipo_documento: Yup.string()
        .required('Campo obrigatório'),
    documento: Yup.string()
        .required('Campo obrigatório'),
    email: Yup.string()
        .email('Email inválido')
        .required('Campo obrigatório'),
    telefone: Yup.string()
        .required('Campo obrigatório'),
    data_nascimento: Yup.date()
        .required('Campo obrigatório'),
});

export default PassageiroValidator;