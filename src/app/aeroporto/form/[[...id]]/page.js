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

    const aeroportos = Array.isArray(JSON.parse(localStorage.getItem('aeroporto'))) ? 
        JSON.parse(localStorage.getItem('aeroporto')) : [];
    
    const dados = aeroportos.find(item => item.id == params.id);
    const aeroporto = dados || { nome: '', codigo: '', localizacao: '' };

    function salvar(dados) {

        if (aeroporto.id) {
            Object.assign(aeroporto, dados);
        } else {
            dados.id = v4();
            aeroportos.push(dados);
        }

        localStorage.setItem('aeroporto', JSON.stringify(aeroportos));
        return route.push('/aeroporto');
    }

    return (
        <Pagina titulo="Aeroporto">

            <Formik
                initialValues={aeroporto}
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
                        <Form.Group className="mb-3" controlId="codigo">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                type="text"
                                name="codigo"
                                value={values.codigo}
                                onChange={handleChange('codigo')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="localizacao">
                            <Form.Label>Localização</Form.Label>
                            <Form.Control
                                type="text"
                                name="localizacao"
                                value={values.localizacao}
                                onChange={handleChange('localizacao')}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/aeroporto"
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
