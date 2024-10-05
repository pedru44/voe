"use client";

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import Pagina from "../components/Pagina";

export default function Page() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    setEmpresas(JSON.parse(localStorage.getItem("empresas")) || []);
  }, []);

  function excluir(id) {
    if (confirm("Deseja realmente excluir o registro?")) {
      const dados = empresas.filter((item) => item.id != id);
      localStorage.setItem("empresas", JSON.stringify(dados));
      setEmpresas(dados);
    }
  }
  return (
    <Pagina titulo="Empresas">
      <Link href="/empresas/form" className="btn btn-primary mb-3 mt-3">
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Companhias</th>
            <th>Logo</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((item, i) => (
            <tr key={item.id}>
              <td>
                
                <Link href={`/empresas/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>

                <AiOutlineDelete
                  className="text-danger"
                  title="Excluir"
                  onClick={() => excluir(item.id)}
                />
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
  );
}