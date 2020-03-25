
/**EVENTO DE MENU RESPONSIVE */
$(document).ready(function(){
    $('#icon').click(function(){
        $('ul').toggleClass('show'); 
    });
    
});



function ImprimirRestaurantes(){
         axios({
                 method:'GET',
                 url:'http://localhost:3001/api/restaurantes'
             }).then(res=>{
                document.querySelector('#seleccion').innerHTML = 'Restaurantes';
                document.querySelector('#cambioDeInformacion').innerHTML = '';
                var data_restaurante = res.data.items;
                for (let i = 0; i < data_restaurante.length; i++) {
                document.querySelector('#cambioDeInformacion').innerHTML  += `
                                        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                                            <div class="card shadow tamanioTarjeta" >
                                            <img src="img/burger2.jpg" class="card-img-top" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title h1 text-info">${data_restaurante[i].Nombre_Local}</h5>
                                                <p class="card-text ">Telefono | ${data_restaurante[i].Telefono}</p>
                                                <p class="card-text ">Ubicacion | ${data_restaurante[i].Ubicacion}</p>
                                            </div>
                                            </div>
                                        </div>
                                            `;
                }
                console.log("Tarjetas Restaurantes Cargadas "); 
              }).catch(function(error){
                 console.log(error);
              });                
     }


     function ImprimirMenus(){
        axios({
                method:'GET',
                url:'http://localhost:3001/api/menus'
            }).then(res=>{
               document.querySelector('#seleccion').innerHTML = 'Menus';
               document.querySelector('#cambioDeInformacion').innerHTML = '';
               var data_menus = res.data.items;
               for (let i = 0; i < data_menus.length; i++) {
               document.querySelector('#cambioDeInformacion').innerHTML  += `
                                       <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                                           <div class="card shadow tamanioTarjeta" >
                                           <img src="img/burger2.jpg" class="card-img-top" alt="...">
                                           <div class="card-body">
                                               <h5 class="card-title h1 text-info">${data_menus[i].Tipo_Menu}</h5>
                                               <p class="card-text ">Fecha Registro | ${data_menus[i].Fecha_Registro}</p>
                                               
                                           </div>
                                           </div>
                                       </div>
                                           `;
               }
               console.log("Tarjetas Menus Cargadas "); 
             }).catch(function(error){
                console.log(error);
             });                
    }
    



function ImprimirCategorias(){
    document.querySelector('#seleccion').innerHTML = 'Categorias';
    document.querySelector('#cambioDeInformacion').innerHTML = '';
    document.querySelector('#cambioDeInformacion').innerHTML += `
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Desayuno</h5>
                            <p class="card-text ">Primer comida que una persona ingiere en su vida cotidiana.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Almuerzo</h5>
                            <p class="card-text ">Comida que se ingiere en la mitad del dia.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Cena</h5>
                            <p class="card-text ">Ultima comida del dia.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Antojos</h5>
                            <p class="card-text ">Comunmente un postre o golosina entre comidas pesadas.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta" >
                        <img src="img/burger2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Bebidas</h5>
                            <p class="card-text ">Gaseosas o frescos naturales.</p>
                        
                        </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                        <div class="card shadow tamanioTarjeta">
                        <img src="img/burger2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title h1 text-info">Grupal</h5>
                            <p class="card-text ">Comida para disfrutar entre amigos.</p>
                        </div>
                        </div>
                    </div>

    `;
}


function ImprimirPlatillos(){
    axios({
        method:'GET',
        url:'http://localhost:3001/api/platillos'
    }).then(res=>{
       document.querySelector('#seleccion').innerHTML = 'Platillos';
       document.querySelector('#cambioDeInformacion').innerHTML = '';
       var data_platillos = res.data.items;
       for (let i = 0; i < data_platillos.length; i++) {
       document.querySelector('#cambioDeInformacion').innerHTML  += `
                               <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 tarjetaMenu">
                                   <div class="card shadow tamanioTarjeta" >
                                   <img src="img/burger2.jpg" class="card-img-top" alt="...">
                                   <div class="card-body">
                                       <h5 class="card-title h1 text-info">${data_platillos[i].Nombre}</h5>
                                       <p class="card-text ">Descripcion | ${data_platillos[i].Descripcion}</p>
                                       <p class="card-text ">Precio | ${data_platillos[i].Precio}</p>
                                   </div>
                                   </div>
                               </div>
                                   `;
       }
       console.log("Tarjetas Platillos Cargadas "); 
     }).catch(function(error){
        console.log(error);
     }); 
}