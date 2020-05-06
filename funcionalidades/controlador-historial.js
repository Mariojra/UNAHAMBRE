let divPlatillos = function(a){
    let div = ``;
    for(let i = 0; i<a.length; i++){
        div+=`<p class="cart-text" data-tooltip="${a[i].Descripcion}"><i class="fas fa-utensils icon-margin"></i>${a[i].Nombre} (${a[i].Estado})</p>`;
    }
    return div;
}

let pago = function(p){
    let metodo = '';
    if(p==1){
        metodo = 'efectivo';
        return metodo;
    } else {
        metodo = 'tarjeta';
        return metodo;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // console.log('carga ejecutada')
    axios({
        method:'GET',
        url: 'https://api-unahambre.herokuapp.com/api_usuario/mostrar_pedidos',
        headers:{
            'access-token': sessionStorage.getItem('token')
        }
    }).then(res=>{
        // console.log(res.data.items);
        let data = res.data.items;
        let arreglo = [];
        let miniArreglo = [];
        let container = ``;
        let j = 0;
        for (let i = 0; i < data.length; i++) {
            if(i==0){
                miniArreglo.push(data[i]);

            } else {
                if(data[i].idCompra==data[i-1].idCompra){
                    miniArreglo.push(data[i])
                } else {
                    arreglo.push(miniArreglo);
                    miniArreglo=[];
                    miniArreglo.push(data[i]);
                }
            }
        }
        // console.log(arreglo)
        // console.log(divPlatillos(arreglo[1]));
        for (let i = 0; i < arreglo.length; i++) {
            container += `
                        <div class="text-white col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" data-idCompra="${arreglo[i][0].idCompra}">
                            <div class="row no-gutters card-size contenido-pedido">
                                <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                    <img src="${arreglo[i][0].Foto_Platillo}" class="card-img" alt="..." style="height: 100%;">
                                </div>
                                <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                    <div class="card-body">
                                        <h5 class="card-title">${arreglo[i][0].fecha}</h5>
                                        <p class="card-text">Se pago con: ${pago(arreglo[i][0].Metodo_Pago_idMetodo_Pago)}</p>
                                        <p class="card-text"><i class="fas fa-map-marker-alt icon-margin"></i>Ubicacion: ${arreglo[i][0].Ubicacion}</p>
                                        <div id="platillos">
                                            ${divPlatillos(arreglo[i])}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        }
        document.getElementById('id-container').innerHTML += container;
    })
});

