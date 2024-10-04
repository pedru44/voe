'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter();

    const voos = Array.isArray(JSON.parse(localStorage.getItem('voo'))) ? 
        JSON.parse(localStorage.getItem('voo')) : [];
    
    const dados = voos.find(item => item.id == params.id);
    const voo = dados || { numero: '', origem: '', destino: '', dataHora: '' };

    function salvar(dados) {

        if (voo.id) {
            Object.assign(voo, dados);
        } else {
            dados.id = v4();
            voos.push(dados);
        }

        localStorage.setItem('voo', JSON.stringify(voos));
        return route.push('/voo');
    }

    return (
        <Pagina titulo="Voo">

            <Formik
                initialValues={voo}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="numero">
                            <Form.Label>Número do Voo</Form.Label>
                            <Form.Control
                                type="text"
                                name="numero"
                                value={values.numero}
                                onChange={handleChange('numero')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="origem">
                            <Form.Label>Origem</Form.Label>
                            <Form.Control
                                type="text"
                                name="origem"
                                value={values.origem}
                                onChange={handleChange('origem')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="destino">
                            <Form.Label>Destino</Form.Label>
                            <Form.Control
                                type="text"
                                name="destino"
                                value={values.destino}
                                onChange={handleChange('destino')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dataHora">
                            <Form.Label>Data e Hora</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dataHora"
                                value={values.dataHora}
                                onChange={handleChange('dataHora')}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/voo"
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
