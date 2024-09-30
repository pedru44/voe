'use client'


import Link from "next/link"
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import Pagina from "../components/Pagina";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Page() {

    const empresas = JSON.parse(localStorage.getItem('empresas')) || []

    return (
        <Pagina titulo="Empresas">

            <Link href="/empresas/create" className="btn btn-primary mb-3 mt-3">
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Logo</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((item, i) => (
                        <tr key={i}>
                            <td>
                                {i} - 
                            <FaEdit className="text-primary"/>
                            <MdDelete className="text-danger" />
                            </td>
                            <td>{item.nome}</td>
                            <td>
                                <a href={item.site} target="_blank">
                                    <img src={item.logo} width={100} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}