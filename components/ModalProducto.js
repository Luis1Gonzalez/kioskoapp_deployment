import Image from "next/image";
import useKiosko from "../hooks/useKiosko";
import { formatearDinero } from "../helpers";
import { useState, useEffect } from "react";

const ModalProducto = () => {
  const { productox, handleSetModal, handleAgregarPedido, pedido } =
    useKiosko();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    //   Comprobar si el modal esta en el pedido
    if (pedido.some((pedidoState) => pedidoState.id === productox.id)) {
      const productoEdicion = pedido.find(
        (pedidoState) => pedidoState.id === productox.id
      );

      setEdicion(true);
      setCantidad(productoEdicion.cantidad);
    }
  }, [productox, pedido]);

  return (
    <div className="flex flex-col items-center md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={150}
          height={200}
          alt={`Imagen de ${productox.nombre}`}
          src={`/assets/img/${productox.imagen}.jpg`}
        />
      </div>

      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleSetModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-xl md:text-3xl font-bold mt-5">{productox.nombre}</h1>
        <p className="mt-5 font-black text-3xl md:text-5xl text-amber-500">
          {formatearDinero(productox.precio)}
        </p>

        <div className="flex gap-4 mt-5">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
              // Con el return se evita que vaya a menos de 1
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <p className="text-3xl">{cantidad}</p>

          <button
            type="button"
            onClick={() => {
              if (cantidad >= 9) return;
              setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
          onClick={() => handleAgregarPedido({ ...productox, cantidad })}
          // con el spread operator lo que logramos es que todo se unifique en un solo objeto
        >
          {edicion ? "Guardar Cambios" : "Añadir al Pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
