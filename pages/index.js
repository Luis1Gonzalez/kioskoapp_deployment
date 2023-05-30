import Head from "next/head";
import Layout from "../layout/Layout";
import Image from "next/image";
import useKiosko from "../hooks/useKiosko";
import Producto from "../components/Producto";

export default function Home() {
  const { categoriaActual } = useKiosko();

  return (
    <>
      <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
        <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>

        <p className="text-2xl my-10">
          Elige y personaliza tu pedido a continuación
        </p>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {categoriaActual?.productos?.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>
      </Layout>
    </>
  );
}

// En la Layout tenemos pagina que hace dinamico el contenido de la pestaña del navegador.
