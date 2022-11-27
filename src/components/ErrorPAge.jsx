import { useRouteError } from "react-router-dom";

const ErrorPAge = () => {
  const error = useRouteError();

  return (
    <div className="space-y-8">
      <h2 className="text-center font-extrabold text-4xl mt-20 text-blue-900">
        CRM - Clientes
      </h2>
      <p className="text-center font-bold text-red-900 text-6xl">
        Hubo un error...
      </p>
      <p className="text-center text-red-900 text-4xl">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPAge;
