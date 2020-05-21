var stripe = Stripe('pk_test_eO6TkytGxUdgU8uudIqVbdxN00darTRWUs')


function realizar_pago(id, orden, total, ubicacion, metodoPago) {
    var monto = total
    var descripcion = 'Descripción pedido: '
    var idProductos = ''
    console.log(metodoPago);
    // var ubicacion = 'unah'  //cambiar
    // var ubicacion = ubicacion_pedido

    var tiempo = 30 //cambiar 

    for (let index = 0; index < id.length; index++) {
        for (let i = 0; i < orden[index].cantidad; i++) {
            idProductos += `${id[index]},`


        }
    }

    for (let index = 0; index < orden.length; index++) {
        descripcion += `${orden[index].cantidad} ${orden[index].nombre}, `;

    }

    //configuracion sweetalert
    const alert_default = Swal.mixin({
        closeOnClickOutside: false,
        allowOutsideClick: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (modal) => {
            modal.addEventListener('mouseenter', Swal.stopTimer)
            modal.addEventListener('mouseleave', Swal.resumeTimer)
            // modal.addEventListener('onclick', location.replace('principal.html'))
        },
        showClass: {
            popup: 'animated fadeInDown'
        },
        hideClass: {
            popup: 'animated fadeOutUp'
        }
    });


    var nombre = 'Unahambre' //Nombre del restaurante
    // foto, por ahora se usa una defautl 
    axios({
        method: 'POST',
        url: 'https://api-unahambre.herokuapp.com/api_pago/realizar_pago',
        data: {
            "monto": monto,
            "metodoPago": metodoPago,
            "descripcion": descripcion,
            "nombre": nombre,
            "idProductos": idProductos,
            "ubicacion": ubicacion,
            "tiempo": tiempo
        },
        headers: {
            "access-token": sessionStorage.getItem('token')
        }

    }).then(async res => {
        if (res.data.id != undefined && res.data.idPedido != undefined) {
            sessionStorage.setItem('idPedido', res.data.idPedido);

            const id = res.data.id.id
            stripe.redirectToCheckout({

                //     //   Make the id field from the Checkout Session creation API response
                //   available to this file, so you can provide it as parameter here
                //     //   instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                sessionId: id
            }).then( async function (result) {
                await alert_default.fire({
                    icon: 'error',
                    title: 'No es posible realizar el pedido, intenta más tarde..'
                });
                window.location.assign('index.html')
                //     //   If `redirectToCheckout` fails due to a browser or network
                //     //   error, display the localized error message to your customer
                //     //   using `result.error.message`.
            });

        } else if (res.data.error == null && res.data.item != undefined) {
            if (res.data.error == null && res.data.item != null) {
                sessionStorage.setItem('idPedido', res.data.item);
                location.assign('success.html')
            }
        } else {
            await alert_default.fire({
                icon: 'error',
                title: 'No es posible realizar el pedido, intenta más tarde..'
            });
        }

    }).catch(err => {
        console.log(err)
        alert_default.fire({
            icon: 'error',
            title: 'Debes estar logueado para poder realizar un pedido'
        });
    })


}


