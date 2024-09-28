"use client";

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import Pagina from "../components/Pagina";


export default function Page() {
  const aeroportos = JSON.parse(localStorage.getItem("aeroportos")) || [];

  return (
    <Pagina titulo="Aeroportos">
      <Link href="/aeroporto/create" className="btn btn-primary mb-3 mt-3">
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Cidade</th>
            <th>País</th>
          </tr>
        </thead>
        <tbody>
          {aeroportos.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nome}</td>
              <td>{item.sigla}</td>
              <td>{item.cidade}</td>
              <td>{item.pais}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
