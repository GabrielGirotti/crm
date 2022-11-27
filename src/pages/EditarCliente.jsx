import { editarClientes } from "../data/clientes";

export async function loader({ params }) {
  const cliente = await editarClientes(params.clienteId);

  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resultados",
    });
  }

  return cliente;
}

const EditarCliente = () => {
  return <div>EditarCliente</div>;
};

export default EditarCliente;
