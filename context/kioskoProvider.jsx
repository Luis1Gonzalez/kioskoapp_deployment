import axios from 'axios'
import { useState, useEffect, createContext } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'



const KioskoContext = createContext()

const KioskoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [productox, setProductox] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }
    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProductox = (producto) => {
        setProductox(producto)
    }

    const handleSetModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({ categoriaId, ...objProdCant }) => {
        if (pedido.some(productoState => productoState.id === objProdCant.id)) {
            // Actualizar cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === objProdCant.id ? objProdCant : productoState)
            setPedido(pedidoActualizado)

            toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, objProdCant])
            toast.success('Agregado al Pedido')
        }
        // ({categoriaId, Imagen, ...objProdCant}) aqui se esta aplicando desestructuring para quitar lo que no nos hace falta en nuestro objeto objProdCant
        // objProdCant viene de modal y es el objeto que se forma de productox y cantidad enviada desde el boton handleAgregarPedido
        setModal(false)
    }

    const handleEditarCantidades = (id) => {
        const productoActualizar = pedido.filter(productox => productox.id === id)
        setProductox(productoActualizar[0])

        setModal(!modal)
    }

    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter(productox => productox.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })


            //Resetear la App
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado con Exito')

            setTimeout(() => {
                router.push('/')
            }, 5000)

        } catch (error) {
            console.log(error)
        }


        //Los argumentos que se pasan en el post del try, siempre tienen que ir en un objeto por eso van dentro de un {}
        // Como esta funcion va a interactuar con la base de datos va a ser asycnc
    };

    return (
        <KioskoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                productox,
                handleSetProductox,
                modal,
                handleSetModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </KioskoContext.Provider>
    )
}

export {
    KioskoProvider
}
export default KioskoContext