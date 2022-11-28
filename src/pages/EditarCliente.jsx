import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { editarClientes, editarUnCliente } from "../data/clientes";

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

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  //console.log(datos)

  const errores = [];

  const email = formData.get("email");
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  if (!regex.test(email)) {
    errores.push("Ingrese un email valido");
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await editarUnCliente(params.clienteId, datos);

  return redirect("/");
}

const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-blue-900 text-4xl">Editar Cliente</h1>

      <div className=" flex justify-between align-middle">
        <p className="mt-3">Modifica los datos del cliente</p>
        <button
          className="uppercase bg-blue-700 py-1 px-3 font-bold text-white rounded-xl hover:bg-blue-900"
          onClick={() => navigate("/")}
        >
          volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md  mx-auto px-5 py-10 mt-10">
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />

          <input
            type="submit"
            value="Editar Cliente"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-lg text-white cursor-pointer"
          />

          {errores?.length &&
            errores.map((error, i) => <Error key={i}>{error}</Error>)}
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
