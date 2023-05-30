import Image from "next/image";
import useKiosko from "../hooks/useKiosko";

const Categoria = ({ categoria }) => {
  const { handleClickCategoria, categoriaActual } = useKiosko();
  const { nombre, icono, id } = categoria;
  return (
    <div
      className={`${
        categoriaActual?.id === id ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen Icono"
      />

      <button
        type="button"
        onClick={() => handleClickCategoria(id)}
        className="text-2xl font-bold hover:cursor-pointer"
      >
        {nombre}
      </button>
    </div>
  );
};

export default Categoria;
