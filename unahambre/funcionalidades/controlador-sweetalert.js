//-----------------------sweetalet registro validando email--------------------------------------
document.querySelector('#btn-registro').addEventListener('click', () => {
    const { value: tokenCorreo} =  swal.fire({
        inputAutoTrim: true,
        showCancelButton: true,
        icon: 'info',
        title: 'Ya casi estas listo',
        text: 'Ingresa el codigo que hemos enviado a tu email.',
        input: 'text',
        inputPlaceholder: 'Ingresa la clave aquí',
        inputValue: "hola",
        confirmButtonText: 'Siguiente &rarr;',
        inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
              
            } else if(value=="KPAxTzcblK"){
                swal.fire({
                    icon: 'success',
                    title: 'Registro completado con exito.'
                })
                // axios({
                //     url:'http://localhost:3001/api/menus',
                //     method: 'GET'
                // }).then(res=>console.log(res))
            } else{
                swal.fire({
                    icon: 'error',
                    title: 'Token no valido'
                })
            
            }
        }
    })
})


document.querySelector('btn-login-err').addEventListener('click',()=>{
    
})



// async function lanzarAxios() {
//     await new Promise(s=> setTimeout(s,2000));
//     let datos = document.querySelector(".btn-swal-registro").value;
//     console.log(datos);
//     // axios({
//     //     method: 'POST',
//     //     url:'../prueba.php',
//     //     data: datos
//     // }).then(res=>{
//     //     console.log(res);
//     // })
// }

// document.querySelector('#btn-registro').addEventListener('click', () => {
//     const regCorreo = Swal.mixin({
//         icon: "info",
//         title: "ya casi estas listo",
//         text: "¡ayudanos a confirmar tu cuenta ingresando la clave enviada a tu correo!",
//         input:"text",
//         inputPlaceholder:"Ingresa la clave",
//         inputAutoTrim: true
//     })
//     regCorreo.fire()
// })

// document.querySelector('#btn-registro-realizado').addEventListener('click', function(){
//     Swal.fire({
//         icon:"success",
//         title:"Registro exitoso"
//     })
// })