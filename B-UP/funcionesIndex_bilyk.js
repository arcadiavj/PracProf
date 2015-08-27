$(function() {

    var TallerAvanzada = {};

    (function(app) {
        
        app.init = function() {
            $("#submit").on('click', function(event) {
                event.preventDefault(); 
                app.encriptar();
            });
            $("#user").on('click', function(event) {
                $("#user").css("background-color","white").val('');
                $("#pass").css("background-color","white").val('');
                event.preventDefault();
            });
            $("#pass").on('click', function(event) {
                $("#user").css("background-color","white").val('');
                $("#pass").css("background-color","white").val('');
                event.preventDefault();
            });
        };


        app.encriptar = function(){
//            var usuario = btoa(btoa($.md5($('#user').val())));
//            var pass = btoa(btoa($.md5($('#pass').val())));
            var usuario = btoa(btoa($('#user').val()));
            var pass = btoa(btoa($('#pass').val()));
            app.verificarVacio(usuario,pass);
            
        };
        
        app.enviarAServidor = function(usuario, pass){
           
                var url = "controlador/ruteador/Seguridad.php";
                var datosEnviar = {user:usuario, pass:pass};
            $.ajax({
                url: url,
                method: 'POST',
                data: datosEnviar,
                success: function(datosDevueltos) {
                    $("#message").html("<p>"+datosDevueltos.user+""+datosDevueltos.id+""+datosDevueltos.acceso+"</p>");
                    
                    //app.rellenardiv(datosDevueltos);
                },
                error: function() {
                    alert("error al enviar al servidor");
                },
                beforeSend:function()//esta función se realiza antes de enviar los datos al servidor cumple solo la función de mostrar un spinner
                {
                    $("#message").html("<p class='text-center'><img src='vista/images/ajax-loader.gif'></p>")//utilizo el mismo div que uso para marcar
                    //el mensaje de error para mostrar el spiner
                }
            }); 
           
        };

        app.rellenardiv = function(data) {
            var html = "";
            if(data.user!="") {
                document.location.href ="admin.html";
            }else{
                html += "<div class='alert alert-danger' role='alert'><p>" + "USUARIO Y/O CONTRASEÑA INVALIDOS" + "</p></div>";
                $("#loginError").html(html);
                $("#user").css("background-color","red");
                $("#pass").css("background-color","red");
            }
        };
        
        app.verificarVacio=function (usuario,pass){
             if(usuario=="" || pass==""){
              $("#message").html("<div class=\"alert alert-danger alert-dismissable\">\n\
                            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" \n\
                            aria-hidden=\"true\">&times;</button>Ingrese Usuario y Password</div>");
                            //muestro un mensaje por la pantalla donde le indico al usuario que tiene que completar los campos   
                $("#user").css("background-color","red");
                $("#pass").css("background-color","red");
            
            }else{
                app.enviarAServidor(usuario, pass);
                
            }
        };
        
        app.init();

    })(TallerAvanzada);
});