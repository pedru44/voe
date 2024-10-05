'use client'

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {
  const route = useRouter();

  const voos = JSON.parse(localStorage.getItem("voos")) || [];
  const dados = voos.find((item) => item.id == params.id);
  const voo = dados || {
    identificador: "",
    data_embarque: "",
    id_origem: "",
    id_destino: "",
    preco: "",
    internacional: false,
  };

  function salvar(dados) {
    if (voo.id) {
      Object.assign(voo, dados);
    } else {
      dados.id = v4();
      voos.push(dados);
    }

    localStorage.setItem("voos", JSON.stringify(voos));
    return route.push("/voo");
  }

  return (
    <Pagina titulo="Voo">
      <Formik initialValues={voo} onSubmit={(values) => salvar(values)}>
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

            <Form.Group className="mb-3" controlId="data_embarque">
              <Form.Label>Data de Embarque</Form.Label>
              <Form.Control
                type="datetime-local"
                name="data_embarque"
                value={values.data_embarque}
                onChange={handleChange("data_embarque")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="id_origem">
              <Form.Label>Aeroporto de Origem</Form.Label>
              <Form.Control
                type="text"
                name="id_origem"
                value={values.id_origem}
                onChange={handleChange("id_origem")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="id_destino">
              <Form.Label>Aeroporto de Destino</Form.Label>
              <Form.Control
                type="text"
                name="id_destino"
                value={values.id_destino}
                onChange={handleChange("id_destino")}
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

            <Form.Group className="mb-3" controlId="internacional">
              <Form.Check
                type="checkbox"
                label="Internacional"
                name="internacional"
                checked={values.internacional}
                onChange={handleChange("internacional")}
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