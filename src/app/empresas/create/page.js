

'use client'
import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";

export default function Page() {

    return (
        <Pagina titulo="Empresas">
            <Formik>
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" name="nome" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="logo">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control type="text" name="logo" />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/empresas"
                                className="btn btn-danger ms-2" >
                                <TiArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}