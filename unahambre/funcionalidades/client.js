var stripe = Stripe('pk_test_eO6TkytGxUdgU8uudIqVbdxN00darTRWUs')


function realizar_pago(id, orden, total ){
    var monto = total
    var descripcion = 'Descripción pedido: '
    var idProductos = ''
    var ubicacion = 'unah'  //cambiar
    var tiempo = 30 //cambiar 

    for (let index = 0; index < id.length; index++) {
        idProductos += `${id[index]},`       
    }
    for (let index = 0; index < orden.length; index++) {
        descripcion += `${orden[index].nombre}, `;
        
    }
    
    var nombre = 'Unahambre' //Nombre del restaurante
    // foto, por ahora se usa una defautl 
     axios({
         method: 'POST',
         url: 'https://api-unahambre.herokuapp.com/api_pago/realizar_pago',
         data:{ "monto": monto, 
                 "descripcion": descripcion,
                 "nombre": nombre,
                 "idProductos": idProductos,
                 "ubicacion" : ubicacion,
                 "tiempo": tiempo
             },
             headers: {
                 "access-token": sessionStorage.getItem('token')
             }
    
     }).then(res => {
         console.log(res.data)
        if (res.data.id != undefined) {

            const id = res.data.id
          //  console.log(id)
                stripe.redirectToCheckout({
        
          //     //   Make the id field from the Checkout Session creation API response
          //     //   available to this file, so you can provide it as parameter here
          //     //   instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                    sessionId: id
                }).then(function (result) {
                    alert('No es posible realizar el pedido, intenta más tarde..')
                    window.location.assign('index.html')
          //     //   If `redirectToCheckout` fails due to a browser or network
          //     //   error, display the localized error message to your customer
          //     //   using `result.error.message`.
                });
            
        } else {
            alert('no se ha podido realizar completar el pedido, intentalo más tarde..')
        }

     }).catch(err => {
         alert('no se ha podido realizar completar el pedido, intentalo más tarde..')
         console.log(err)
     })


}


