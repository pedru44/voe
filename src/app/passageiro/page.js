"use client";

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import Pagina from "../components/Pagina";


export default function Page() {
  const passageiro = JSON.parse(localStorage.getItem("passageiro")) || [];

  return (
    <Pagina titulo="Passageiros">
      <Link href="/passageiro/create" className="btn btn-primary mb-3 mt-3">
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>nome</th>
            <th>tipo_documento</th>
            <th>documento</th>
            <th>email</th>
            <th>telefone</th>
            <th>data_nascimento</th>
          </tr>
        </thead>
        <tbody>
          {passageiro.map((item) => (
            <tr>
              <td>1</td>
              <td>{item.nome}</td>
              <td>{item.tipo_documento}</td>
              <td>{item.documento}</td>
              <td>{item.email}</td>
              <td>{item.telefone}</td>
              <td>{item.data_nascimento}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}