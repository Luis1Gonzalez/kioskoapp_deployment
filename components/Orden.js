import Image from "next/image";
import { formatearDinero } from "../helpers";
import axios from "axios";
import { toast } from "react-toastify";


export default function Orden({ orden }) {
  const { id, nombre, total, pedido } = orden;

const completarOrden = async  () => {
    try {
        await  axios.post(`/api/ordenes/${id}`)
    toast.success('Orden Lista');
    } catch (error) {
        toast.error('Hubo un Error')
    }
}

  return (
    <div className="border p-10 space-y-5 flex flex-col items-center">
      <h3 className="text-2xl font-bold">Orden: {id}</h3>
      <p className="text-lg font-bold">Cliente: {nombre}</p>

      <div>
        {pedido.map((platillo) => (
          <div
            key={platillo.id}
            className="p-1 flex flex-col border-b last-of-type:border-0 items-center"
          >
            <div className="w-48">
              <Image
                width={200}
                height={250}
                src={`/assets/img/${platillo.imagen}.jpg`}
                alt={`Imagen de platillo ${platillo.nombre}`}
              />
            </div>

            <div className="py-5 space-y-2">
              <h4 className="text-xl md:text-2xl font-bold text-amber-500">
                {platillo.nombre}
              </h4>
              <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
            </div>
          </div>
        ))}
      </div>

<div className="md-flex md:items-center md:justify-between my-10">
<p className="mt-5 font-black text-xl md:text-4xl text-amber-500"> Total a pagar: {formatearDinero(total)}</p>

<button className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 py-3 px-10 uppercase font-bold rounded-lg"
type="button"
onClick={completarOrden}
>
Completar Orden
</button>

</div>

    </div>
  );
}
