import ResumenProducto from "../components/ResumenProducto";
import useKiosko from "../hooks/useKiosko";
import Layout from "../layout/Layout";

export default function Resumen() {
  const { pedido } = useKiosko();

  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu Pedido</p>

      {pedido.length === 0 ? (
        <p className="text-center text-2xl">No hay productos en tu pedido</p>
      ) : (
        pedido.map((prodResu) => (
          <ResumenProducto key={prodResu.id} prodResu={prodResu} />
        ))
      )}
    </Layout>
  );
}
