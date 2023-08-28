export const formatearCantidad = cantidad =>{
    // Convert format usd money
    return Number(cantidad).toLocaleString('es-US',{
        style: 'currency',
        currency:'USD'
    })

}
// Metodo que genera id
export const generarId = ()=>{
    // numero random convertido a string en base 36 
    const random = Math.random().toString(36).substring(2)
    return random
}

// Formatear fecha
export const formatearFeha = fecha=>{
    // Convierte el formato de fecha
    const fechaNueva = new Date(fecha)
    const opciones = {
        year:'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES',opciones)
}



