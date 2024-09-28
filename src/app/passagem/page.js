"use client";

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import Pagina from "../components/Pagina";

export default function Page() {

  const passagens = JSON.parse(localStorage.getItem("passagens")) || [];

  return (
    <Pagina titulo="Passagens">
      <Link href="/passagem/create" className="btn btn-primary mb-3 mt-3">
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Voo</th>
            <th>Passageiro</th>
            <th>Assento</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {passagens.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.voo_id}</td>
              <td>{item.passageiro_id}</td>
              <td>{item.assento}</td>
              <td>{item.preco}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
