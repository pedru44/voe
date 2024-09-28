"use client";

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import Pagina from "../components/Pagina";

export default function Page() {
  const voos = JSON.parse(localStorage.getItem("voos")) || []; // Usar "voos" como chave

  return (
    <Pagina titulo="Voos">
      <Link href="/voo/create" className="btn btn-primary mb-3 mt-3">
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Identificador</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Data de Embarque</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {voos.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.identificador}</td>
              <td>{item.id_origem}</td>
              <td>{item.id_destino}</td>
              <td>{item.data_embarque}</td>
              <td>{item.preco}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
