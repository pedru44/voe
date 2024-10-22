'use client';

import Pagina from "@/app/components/Pagina";
import PassageiroValidator from "@/validators/PassageiroValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();

    const passageiros = JSON.parse(localStorage.getItem('passageiros')) || [];
    const dados = passageiros.find(item => item.id == params.id);
    const passageiro = dados || { nome: '', tipo_documento: '', documento: '', email: '', telefone: '', data_nascimento: '' };

    function salvar(dados) {
        if (passageiro.id) {
            const index = passageiros.findIndex(item => item.id == passageiro.id);
            passageiros[index] = { ...passageiros[index], ...dados }; 
        } else {
            dados.id = v4();
            passageiros.push(dados);
        }

        localStorage.setItem('passageiros', JSON.stringify(passageiros));
        return route.push('/passageiro'); 
    }

    return (
        <Pagina titulo="Passageiro">
            <Formik
                initialValues={passageiro}
                validationSchema={PassageiroValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange('nome')}
                                isInvalid={!!errors.nome}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nome}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tipo_documento">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="tipo_documento"
                                value={values.tipo_documento}
                                onChange={handleChange('tipo_documento')}
                                isInvalid={!!errors.tipo_documento}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="documento">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="documento"
                                value={values.documento}
                                onChange={(value)=>{
                                    setFieldValue('documento', mask(value.target.value, '999.999.999-99'))
                                }}
                                isInvalid={!!errors.documento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.documento}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="telefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefone"
                                value={values.telefone}
                                onChange={(value)=>{
                                    setFieldValue('telefone', mask(value.target.value, '(99) 99999-9999'))
                                }}
                                isInvalid={!!errors.telefone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.telefone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_nascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="text"
                                name="data_nascimento"
                                value={values.data_nascimento}
                                onChange={(value)=>{
                                    setFieldValue('data_nascimento', mask(value.target.value, '99/99/9999'))
                                }}
                                isInvalid={!!errors.data_nascimento}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.data_nascimento}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/passageiro"  
                                className="btn btn-danger ms-2"
                            >
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
