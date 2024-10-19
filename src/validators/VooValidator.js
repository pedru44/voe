import * as Yup from "yup";

const VooValidator = Yup.object().shape({
    identificador: Yup.string()
        .required('Campo obrigatório'),
    data_checkin: Yup.date()
        .required('Campo obrigatório'),
    data_embarque: Yup.date()
        .required('Campo obrigatório'),
    id_origem: Yup.number()
        .required('Campo obrigatório'),
    id_destino: Yup.number()
        .required('Campo obrigatório'),
    empresa_id: Yup.number()
        .required('Campo obrigatório'),
    preco: Yup.number()
        .required('Campo obrigatório')
        .min(0, 'O preço deve ser positivo'),
});

export default VooValidator;