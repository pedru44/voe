"use client";

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Page() {
  const route = useRouter();

  function salvar(dados) {
    const aeroportos = JSON.parse(localStorage.getItem("aeroportos")) || [];
    aeroportos.push(dados);
    localStorage.setItem("aeroportos", JSON.stringify(aeroportos));
    return route.push("/aeroporto");
  }

  return (
    <Pagina titulo="Aeroporto">
      <Formik
        initialValues={{ nome: "", sigla: "", cidade: "", pais: "" }}
        onSubmit={(values) => salvar(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={values.nome}
                onChange={handleChange("nome")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sigla">
              <Form.Label>Sigla</Form.Label>
              <Form.Control
                type="text"
                name="sigla"
                value={values.sigla}
                onChange={handleChange("sigla")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="cidade"
                value={values.cidade}
                onChange={handleChange("cidade")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pais">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                name="pais"
                value={values.pais}
                onChange={handleChange("pais")}
              />
            </Form.Group>
            <div className="text-center">
              <Button onClick={handleSubmit} variant="success">
                <FaCheck /> Salvar
              </Button>
              <Link href="/aeroporto" className="btn btn-danger ms-2">
                <MdOutlineArrowBack /> Voltar
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
