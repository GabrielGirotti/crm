import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPAge from "./components/ErrorPAge";
import Layout from "./components/Layout";
import "./index.css";
import EditarCliente, { loader as editarLoader } from "./pages/EditarCliente";
import Index, { loader as clientesLoader } from "./pages/Index";
import NuevoCliente, {
  action as nuevoClienteAction,
} from "./pages/NuevoCliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPAge />,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoClienteAction,
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        loader: editarLoader,
        errorElement: <ErrorPAge />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
