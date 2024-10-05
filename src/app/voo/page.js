"use client";

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import Pagina from "../components/Pagina";

export default function Page() {
  const [voos, setVoos] = useState([]);

  useEffect(() => {
    setVoos(JSON.parse(localStorage.getItem("voos")) || []);
  }, []);

  function excluir(id) {
    if (confirm("Deseja realmente excluir o registro?")) {
      const dados = voos.filter((item) => item.id != id);
      localStorage.setItem("voos", JSON.stringify(dados));
      setVoos(dados);
    }
  }

  return (
    <Pagina titulo="Voos">
      <Link href="/voo/form" className="btn btn-primary mb-3 mt-3">
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Identificador</th>
            <th>Data Embarque</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {voos.map((item, i) => (
            <tr key={item.id}>
              <td>
                <Link href={`/voo/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>

                <AiOutlineDelete
                  className="text-danger"
                  title="Excluir"
                  onClick={() => excluir(item.id)}
                />
              </td>
              <td>{item.identificador}</td>
              <td>{item.data_embarque}</td>
              <td>{item.id_origem}</td>
              <td>{item.id_destino}</td>
              <td>{item.preco}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}