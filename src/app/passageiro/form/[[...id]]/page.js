'use client'

import Pagina from "@/app/components/Pagina";
import PassageiroValidator from "@/validators/PassageiroValidator"; // Importando o validador
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const passageiros = JSON.parse(localStorage.getItem('passageiros')) || []
    const dados = passageiros.find(item => item.id == params.id)
    const passageiro = dados || { nome: '', documento: '', email: '' }

    function salvar(dados) {
        if (passageiro.id) {
            const index = passageiros.findIndex(item => item.id === passageiro.id);
            passageiros[index] = dados;
        } else {
            dados.id = v4();
            passageiros.push(dados);
        }

        localStorage.setItem('passageiros', JSON.stringify(passageiros));

        route.push('/passageiro');
    }

    return (
        <Pagina titulo="Passageiro">

            <Formik
                initialValues={passageiro}
                validationSchema={PassageiroValidator} // Adicionando o schema de validação
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors, // Pegando os erros
                }) => {

                    return (
                        <Form>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                    isInvalid={errors.nome} // Verificando se há erro
                                />
                                <Form.Control.Feedback className="text-danger">{errors.nome}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="documento">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="documento"
                                    value={values.documento}
                                    onChange={handleChange('documento')}
                                    isInvalid={errors.documento} // Verificando se há erro
                                />
                                <Form.Control.Feedback className="text-danger">{errors.documento}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    isInvalid={errors.email} // Verificando se há erro
                                />
                                <Form.Control.Feedback className="text-danger">{errors.email}</Form.Control.Feedback>
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
                    )
                }}
            </Formik>
        </Pagina>
    )
}
