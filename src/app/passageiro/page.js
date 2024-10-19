"use client";

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import Pagina from "../components/Pagina";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {
  const [passageiros, setPassageiros] = useState([]);

  useEffect(() => {
    setPassageiros(JSON.parse(localStorage.getItem("passageiros")) || []);
  }, []);

  function excluir(id) {
    if (confirm("Deseja realmente excluir o registro?")) {
      const dados = passageiros.filter((item) => item.id != id);
      localStorage.setItem("passageiros", JSON.stringify(dados));
      setPassageiros(dados);
    }
  }

  return (
    <Pagina titulo="Passageiros">
      <Link href="/passageiro/form" className="btn btn-primary mb-3 mt-3">
        <FaPlusCircle /> Novo
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>nascimento</th>
          </tr>
        </thead>
        <tbody>
          {passageiros.map((item, i) => (
            <tr key={item.id}>
              <td>
                <Link href={`/passageiro/form/${item.id}`}>
                  <FaRegEdit title="Editar" className="text-primary" />
                </Link>

                <AiOutlineDelete
                  className="text-danger"
                  title="Excluir"
                  onClick={() => excluir(item.id)}
                />
              </td>
              <td>{item.nome}</td>
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