
/**EVENTO DE MENU RESPONSIVE */
$(document).ready(function(){
    $('#icon').click(function(){
        $('ul').toggleClass('show'); 
    });
    
});

function Tarjeta_Restaurante(){
    axios({
            method:'GET',
            url:'http://localhost:3001/api/restaurantes'
        }).then(res=>{
            var div = $('#contenedor-catalogo');
            div.html("")
            const data_restaurante =res.data.items;
            for (let i = 0; i < data_restaurante.length; i++) {
                var tarjeta = `<div class="card" >
                        <img src="img/burger2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data_restaurante[i].Nombre_Local}</h5> 
                          <p class="descripcion-enfrente">Ubicacion| ${data_restaurante[i].Ubicacion}</p>
                          <p class="descripcion-enfrente">Telefono| ${data_restaurante[i].Telefono}</p> 
                        </div>
                    </div>`;
                div.append(tarjeta);
            }
            console.log(data_restaurante);
            console.log("Tarjetas Restaurantes Cargadas");
        }).catch(function(error){
            console.log(error);
        });                
}

function Tarjeta_Platillo(){
    axios({
            method:'GET',
            url:'http://localhost:3001/api/platillos'
        }).then(res=>{
            console.log(res);
            console.log("Tarjetas Platillo Cargadas");
        }).catch(function(error){
            console.log(error);
        });                
}

function Tarjeta_Menu(){
    axios({
            method:'GET',
            url:'http://localhost:3001/api/menus'
        }).then(res=>{
            var div = $('#contenedor-catalogo');
            div.html("")
            const data_menu =res.data.items;
            for (let i = 0; i < data_menu.length; i++) {
                var tarjeta = `<div class="card" >
                        <img src="img/burger2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data_menu[i].Tipo_Menu}</h5>   
                        </div>
                    </div>`;
                div.append(tarjeta);
            }
            console.log("Tarjetas Menus Cargadas"); 
        }).catch(function(error){
            console.log(error);
        });
}




function refrescar(){
   
        filtro = $('#restaurante').val();
        if(filtro==1){
           Tarjeta_Restaurante();
           $('#banner-principal').html("");
           $('#banner-principal').append('<h1>RESTAURANTES</h1>');
        }
        else if(filtro==2){
            Tarjeta_Menu();
            $('#banner-principal').html("");
            $('#banner-principal').append('<h1>MENUS</h1>');
        }else if(filtro==3){
            // $('#contenedor-catalogo').html("");
            // $('#contenedor-catalogo').append("<h1>no hay platillos</h1>");
            Tarjeta_Platillo();
            $('#banner-principal').html("");
            $('#banner-principal').append('<h1>PLATILLOS</h1>');
        }else{
            
            $('#contenedor-catalogo').html("");
            var categorias = `<div id="contenedor-catalogo" class="row contenedor-catalogo"> <!-----experimento-->   
                         <div class="card" >
                             <img src="img/burger2.jpg" class="card-img-top" alt="...">
                             <div class="card-body">
                                 <h5 class="card-title">Desayuno</h5>   
                             </div>
                         </div>
                         <div class="card">
                             <img src="img/burger2.jpg" class="card-img-top" alt="...">
                             <div class="card-body">
                                 <h5 class="card-title">Almuerzo</h5>   
                             </div>
                         </div>
                         <div class="card">
                             <img src="img/burger2.jpg" class="card-img-top" alt="...">
                             <div class="card-body">
                                 <h5 class="card-title">Cena</h5>   
                             </div>
                         </div>
                         <div class="card">
                             <img src="img/burger2.jpg" class="card-img-top" alt="...">
                             <div class="card-body">
                                 <h5 class="card-title">Antojos</h5>   
                             </div>
                         </div>
                         <div class="card">
                             <img src="img/burger2.jpg" class="card-img-top" alt="...">
                             <div class="card-body">
                                 <h5 class="card-title">Bebidas</h5>   
                             </div>
                         </div>
                         <div class="card">
                             <img src="img/burger2.jpg" class="card-img-top" alt="...">
                             <div class="card-body">
                                 <h5 class="card-title">Grupal</h5>   
                             </div>
                         </div>      `;
                    $('#contenedor-catalogo').append(categorias);
        }
}

/**FIN MENU RESPONSIVE */
// function imprimirCategorias(){
//     $('#contenedor-catalogo').html("");
//     $('#contenedor-catalogo').append("<h1>Contenido inicio</h1>");
    
// }
// var data_restaurante;
// var GET_Restaurante = axios({
//     method:'GET',
//     url:'http://localhost:3000/api/restaurantes'
// }).then(res=>{
    
//     this.data_restaurante = res;

// });


//  function GET_Restaurante(){
//      var data;
    
//      console.log(data);
//      return data;
//  }