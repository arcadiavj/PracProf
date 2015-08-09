$(function() {

    var TallerAvanzada = {};

    (function(app) {
        
        app.init = function() {
            $("#btnLogin").on('click', function(event) {
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
            app.enviarAServidor(usuario, pass);
        };
        
        app.enviarAServidor = function(usuario, pass){
            var url = "controlador/ruteador/Seguridad.php";
            var datosEnviar = {user:usuario, pass:pass};
            $.ajax({
                url: url,
                method: 'POST',
                data: datosEnviar,
                success: function(datosDevueltos) {
                    app.rellenardiv(datosDevueltos);
                },
                error: function() {
                    alert("error al enviar al servidor");
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
        app.init();

    })(TallerAvanzada);


});

