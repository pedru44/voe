'use client'

import Pagina from "@/app/components/Pagina";
import apiLocalidade from "@/app/services/apiLocalidade";
import AeroportoValidator from "@/validators/AeroportoValidator";  
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter();

    const aeroportos = JSON.parse(localStorage.getItem('aeroportos')) || [];
    const dados = aeroportos.find(item => item.id == params.id);
    const aeroporto = dados || { nome: '', sigla: '', pais: 'Brasil', uf: '', cidade: '' };

    const [paises, setPaises] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [camposBrasil, setCamposBrasil] = useState(false);

    useEffect(() => {
        apiLocalidade.get(`paises`).then(resultado => {
            setPaises(resultado.data);
        });

        apiLocalidade.get(`estados?orderBy=nome`).then(resultado => {
            setUfs(resultado.data);
        });

    }, []);

    function salvar(dados) {
        if (aeroporto.id) {
            const index = aeroportos.findIndex(item => item.id === aeroporto.id);
            aeroportos[index] = dados;
        } else {
            dados.id = v4();
            aeroportos.push(dados);
        }

        localStorage.setItem('aeroportos', JSON.stringify(aeroportos));
        route.push('/aeroporto');
    }

    return (
        <Pagina titulo="Aeroporto">
            <Formik
                initialValues={aeroporto}
                validationSchema={AeroportoValidator}  
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,          
                    touched,          
                }) => {

                    useEffect(() => {
                        setCamposBrasil(values.pais === 'Brasil');
                    }, [values.pais]);

                    useEffect(() => {
                        if (values.uf) {
                            apiLocalidade.get(`estados/${values.uf}/municipios`).then(resultado => {
                                setCidades(resultado.data);
                            });
                        }
                    }, [values.uf]);

                    return (

                        <Form noValidate onSubmit={handleSubmit}> 
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                    isInvalid={touched.nome && errors.nome} 
                                />
                                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback> 
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="sigla">
                                <Form.Label>Sigla</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sigla"
                                    value={values.sigla}
                                    onChange={(value)=>{
                                        setFieldValue('sigla', mask(value.target.value, 'AAA'))
                                    }}
                                    isInvalid={touched.sigla && errors.sigla} 
                                />
                                <Form.Control.Feedback type="invalid">{errors.sigla}</Form.Control.Feedback> 
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="pais">
                                <Form.Label>País</Form.Label>
                                <Form.Select
                                    name="pais"
                                    value={values.pais}
                                    onChange={handleChange('pais')}
                                    isInvalid={touched.pais && errors.pais}  
                                >
                                    <option value=''>Selecione</option>
                                    {paises.map(item => (
                                        <option key={item.nome} value={item.nome}>
                                            {item.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.pais}</Form.Control.Feedback> 
                            </Form.Group>
                            {camposBrasil &&
                                <>
                                    <Form.Group className="mb-3" controlId="uf">
                                        <Form.Label>UF</Form.Label>
                                        <Form.Select
                                            name="uf"
                                            value={values.uf}
                                            onChange={handleChange('uf')}
                                            isInvalid={touched.uf && errors.uf} 
                                        >
                                            <option value=''>Selecione</option>
                                            {ufs.map(item => (
                                                <option key={item.sigla} value={item.sigla}>
                                                    {item.sigla} - {item.nome}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.uf}</Form.Control.Feedback> 
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cidade">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Select
                                            name="cidade"
                                            value={values.cidade}
                                            onChange={handleChange('cidade')}
                                            isInvalid={touched.cidade && errors.cidade}  
                                        >
                                            <option value=''>Selecione</option>
                                            {cidades.map(item => (
                                                <option key={item.nome} value={item.nome}>
                                                    {item.nome}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.cidade}</Form.Control.Feedback> 
                                    </Form.Group>
                                </>
                            }
                            <div className="text-center">
                                <Button type="submit" variant="success">
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
                    )
                }}
            </Formik>
        </Pagina>
    )
}
