import { useRouter } from "next/router";

const pasos = [
  { paso: 1, nombre: "Menu", Url: "/" },
  { paso: 2, nombre: "Resumen", Url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", Url: "/total" },
];

const Pasos = () => {
  const router = useRouter();

  const calcularProgreso = () => {
    let valor;
    if (router.pathname === "/") {
      valor = 3;
    } else if (router.pathname === "/resumen") {
      valor = 50;
    } else {
      valor = 100;
    }
    return valor;
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        {pasos.map((paso) => (
          <button
            onClick={() => {
              router.push(paso.Url);
            }}
            className="text-sm lg:text-xl font-bold"
            key={paso.paso}
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
        <div
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
          style={{ width: `${calcularProgreso()}%` }}
        ></div>
      </div>
    </>
  );
};
// useRouter es el reactRouterDom de next.

export default Pasos;
