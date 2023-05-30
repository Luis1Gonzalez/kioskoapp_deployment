export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('es-Es', {
        style: 'currency',
        currency: 'EUR'
    })
}