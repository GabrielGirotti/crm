import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { crearCliente } from "../data/clientes";

export async function action({ request }) {
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

  await crearCliente(datos);

  return redirect("/");
}

const NuevoCliente = () => {
  const navigate = useNavigate();

  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-blue-900 text-4xl">Nuevo Cliente</h1>

      <div className=" flex justify-between align-middle">
        <p className="mt-3">Completa todos los campos</p>
        <button
          className="uppercase bg-blue-700 py-1 px-3 font-bold text-white rounded-xl hover:bg-blue-900"
          onClick={() => navigate("/")}
        >
          volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md  mx-auto px-5 py-10 mt-10">
        <Form method="post" noValidate>
          <Formulario />

          <input
            type="submit"
            value="Registrar Cliente"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-lg text-white"
          />

          {errores?.length &&
            errores.map((error, i) => <Error key={i}>{error}</Error>)}
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;
