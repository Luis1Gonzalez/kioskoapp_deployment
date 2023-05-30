import { PrismaClient } from "@prisma/client"


export default async function handler(req, res) {

const prisma = new PrismaClient()

    if(req.method === 'POST') {
const { id } = req.query

const ordenActualizada = await prisma.order.update({
    where: {
        id: parseInt(id)
    },
    data: {
        estado: true
        // Aqui le estamos cambiando el stado a la rden, si quisieramos cambiar otra cosa pondiamos una , y lo pondriamos.
    }
})
res.status(200).json(ordenActualizada)
        // console.log(req.query.id)
        // console.log('Actualizando')
    }
}

// req.query.id el id esta relacionado con el routing y tambien viene de la funcion completarOrden del componente orden