'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagina from "../components/Pagina";

export default function Page() {

    const [voos, setVoos] = useState([]);

    useEffect(() => {
        setVoos(JSON.parse(localStorage.getItem('voo')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = voos.filter(item => item.id !== id);
            localStorage.setItem('voo', JSON.stringify(dados));
            setVoos(dados);
        }
    }

    return (
        <Pagina titulo="Voos">

            <Link
                href="/voo/form"
                className="btn btn-primary mb-3 mt-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Número</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Data e Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {voos.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/voo/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.numero}</td>
                            <td>{item.origem}</td>
                            <td>{item.destino}</td>
                            <td>{item.dataHora}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
