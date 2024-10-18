import * as Yup from 'yup';

const AeroportoValidator = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .max(45, 'O máximo de caracteres é 45')
        .required('Campo obrigatório'),
    sigla: Yup.string()
        .min(2, 'O mínimo de caracteres é 2')
        .max(4, 'O máximo de caracteres é 4')
        .required('Campo obrigatório'),
    cidade: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .required('Campo obrigatório'),
    uf: Yup.string()
        .length(2, 'UF deve ter 2 caracteres')
        .required('Campo obrigatório'),
    pais: Yup.string()
        .min(3, 'O mínimo de caracteres é 3')
        .required('Campo obrigatório')
});

export default AeroportoValidator;
