$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


$(document).ready(function(e) {
    $('#perfil').on('click', function(){
        $('#contenido-perfil').load('tablas-perfil.html', function(data) {
            $(this).html(data);
        });

    })

});