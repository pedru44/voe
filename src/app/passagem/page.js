"use client";

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import Pagina from "../components/Pagina";

export default function Page() {
  const [passagens, setPassagens] = useState([]);

  useEffect(() => {
    setPassagens(JSON.parse(localStorage.getItem("passagens")) || []);
  }, []);

  function excluir(id) {
    if (confirm("Deseja realmente excluir o registro?")) {
      const dados = passagens.filter((item) => item.id != id);
      localStorage.setItem("passagens", JSON.stringify(dados));
      setPassagens(dados);
    }
  }

  return (
    <Pagina titulo="Passagens">
      <Link href="/passagem/form" className="btn btn-primary mb-3 mt-3">
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Assento</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {passagens.map((item, i) => (
            <tr key={item.id}>
              <td>
                <Link href={`/passagem/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>

                <AiOutlineDelete
                  className="text-danger"
                  title="Excluir"
                  onClick={() => excluir(item.id)}
                />
              </td>
              <td>{item.assento}</td>
              <td>{item.preco}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}