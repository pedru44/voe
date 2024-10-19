'use client';

import Pagina from "@/app/components/Pagina";
import VooValidator from "@/validators/VooValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();

    const voos = JSON.parse(localStorage.getItem('voos')) || [];
    const dados = voos.find(item => item.id == params.id);
    const voo = dados || { identificador: '', internacional: 0, data_checkin: '', data_embarque: '', id_origem: '', id_destino: '', empresa_id: '', preco: '' };

    function salvar(dados) {
        if (voo.id) {
            Object.assign(voo, dados);
        } else {
            dados.id = v4();
            voos.push(dados);
        }

        localStorage.setItem('voos', JSON.stringify(voos));
        return route.push('/voo'); 
    }

    return (
        <Pagina titulo="Voo">
            <Formik
                initialValues={voo}
                validationSchema={VooValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="identificador">
                            <Form.Label>Identificador</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="identificador" 
                                value={values.identificador}
                                onChange={handleChange('identificador')}
                                isInvalid={!!errors.identificador}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.identificador}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="internacional">
                            <Form.Check 
                                type="checkbox" 
                                label="Internacional" 
                                name="internacional" 
                                checked={values.internacional}
                                onChange={handleChange('internacional')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_checkin">
                            <Form.Label>Data Check-in</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                name="data_checkin"
                                value={values.data_checkin}
                                onChange={handleChange('data_checkin')}
                                isInvalid={!!errors.data_checkin}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.data_checkin}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_embarque">
                            <Form.Label>Data Embarque</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                name="data_embarque"
                                value={values.data_embarque}
                                onChange={handleChange('data_embarque')}
                                isInvalid={!!errors.data_embarque}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.data_embarque}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="id_origem">
                            <Form.Label>Aeroporto Origem (ID)</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="id_origem"
                                value={values.id_origem}
                                onChange={handleChange('id_origem')}
                                isInvalid={!!errors.id_origem}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.id_origem}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="id_destino">
                            <Form.Label>Aeroporto Destino (ID)</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="id_destino"
                                value={values.id_destino}
                                onChange={handleChange('id_destino')}
                                isInvalid={!!errors.id_destino}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.id_destino}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="empresa_id">
                            <Form.Label>Empresa (ID)</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="empresa_id"
                                value={values.empresa_id}
                                onChange={handleChange('empresa_id')}
                                isInvalid={!!errors.empresa_id}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.empresa_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="preco"
                                value={values.preco}
                                onChange={handleChange('preco')}
                                isInvalid={!!errors.preco}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.preco}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link
                                href="/voo"  // URL do botão de voltar
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
