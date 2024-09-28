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
    const voos = JSON.parse(localStorage.getItem("voos")) || []; // Usar "voos" como chave
    voos.push(dados);
    localStorage.setItem("voos", JSON.stringify(voos));
    return route.push("/voo"); // Redirecionar para a página de voos
  }

  return (
    <Pagina titulo="Voo">
      <Formik
        initialValues={{ identificador: "", id_origem: "", id_destino: "", data_embarque: "", preco: "" }}
        onSubmit={(values) => salvar(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form>
            <Form.Group className="mb-3" controlId="identificador">
              <Form.Label>Identificador</Form.Label>
              <Form.Control
                type="text"
                name="identificador"
                value={values.identificador}
                onChange={handleChange("identificador")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="id_origem">
              <Form.Label>Origem</Form.Label>
              <Form.Control
                type="text"
                name="id_origem"
                value={values.id_origem}
                onChange={handleChange("id_origem")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="id_destino">
              <Form.Label>Destino</Form.Label>
              <Form.Control
                type="text"
                name="id_destino"
                value={values.id_destino}
                onChange={handleChange("id_destino")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="data_embarque">
              <Form.Label>Data de Embarque</Form.Label>
              <Form.Control
                type="datetime-local"
                name="data_embarque"
                value={values.data_embarque}
                onChange={handleChange("data_embarque")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="preco">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                name="preco"
                value={values.preco}
                onChange={handleChange("preco")}
              />
            </Form.Group>
            <div className="text-center">
              <Button onClick={handleSubmit} variant="success">
                <FaCheck /> Salvar
              </Button>
              <Link href="/voo" className="btn btn-danger ms-2">
                <MdOutlineArrowBack /> Voltar
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
