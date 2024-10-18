import * as Yup from 'yup';
 
 const  PassagemValidator = Yup.object().shape({
   nome: Yup.string()
     .min(3, 'O minimo de caracteres é 3')
     .max(10, 'O minimo de caracteres é 10')
     .required('Campo obrigatorio'),
   logo: Yup.string()
    .min(2, 'O mínino de caracteres é 2').required('Campo obrigatorio'),
   site: Yup.string().required('Campo obrigatorio'),
 });
 
 export default PassagemValidator