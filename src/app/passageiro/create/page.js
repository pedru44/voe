'use client'


import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Page() {

    const route = useRouter()

    function salvar(dados) {
        const passageiro = JSON.parse(localStorage.getItem('passageiro')) || []
        passageiro.push(dados)
        localStorage.setItem('passageiro', JSON.stringify(passageiro))
        return route.push('/passageiro')
    }

    return (
        <Pagina titulo="Passageiro">

            <Formik
                initialValues={{
                    nome: '',
                    tipo_documento: '',
                    documento: '',
                    email: '',
                    telefone: "",
                    data_nascimento: "",
                }}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange('nome')}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="tipo_documento">
                            <Form.Label>Tipo de Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="tipo_documento"
                                value={values.tipo_documento}
                                onChange={handleChange('tipo_documento')}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="documento">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="documento"
                                value={values.documento}
                                onChange={handleChange('documento')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange('email')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="telefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefone"
                                value={values.telefone}
                                onChange={handleChange('telefone')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="data_nascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="text"
                                name="data_nascimento"
                                value={values.data_nascimento}
                                onChange={handleChange('data_nascimento')}
                            />
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
    )
}