$(function() {
    var TallerAvanzada = {};
    (function(app) {
        app.init = function() {
            app.cargarComboArt();
            app.cargarComboCliente();
            $("#tablaCasos").dataTable({       //transforma la tabla en dataTable
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
            //app.buscarClientes();  
            app.bindings(); 
        };
        app.bindings = function() {
            app.cargarComboAno();
            $("#agregar").on('click', function(event) {
                event.preventDefault();
                app.borrarCampos();
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Caso");
                $("#modalCaso").modal({show: true});
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#anoNac").removeAttr("disabled");
                $("#mesNac").removeAttr("disabled");
                $("#diaNac").removeAttr("disabled");
                $("#salario").removeAttr("disabled");
                $("#fotocopiaDNI").removeAttr("disabled");
                $("#firmaPacto").removeAttr("disabled");
                $("#firmaPoder").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
            });
            $("#comboArts").on('click', function(event) {
                //al elegir opcion del combo la debe mostrar en un label
                var art = $("comboArts").select().val();
                $("#artNombre").html(art);
            });
            $("#comboClientes").on('click', function(event) {
                //al elegir opcion del combo la debe mostrar en un label
                
            });
            $("#anoNac").on('click', function(event) {
                app.cargarComboMeses();
                app.cargarComboDias();
            });
            
            $("#mesNac").on('click', function(event) {
                var m = $("#mesNac").val();
                var mes = parseInt(m);
                switch (mes) {
                    case 1:
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;

                    case 2: 
                        //días debe estar entre 1 y 28-29
                        var an = $("#anoNac").val();
                        var anyo = parseInt(an);
                        if ((((anyo%100)!=0)&&((anyo%4)==0))||((anyo%400)==0)){
                             app.cargarComboDias(29);
                        }else{
                            app.cargarComboDias(28);
                        }
                    break;
                    case 3:
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;

                    case 4: 
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                    break;
                    case 5:
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;

                    case 6: 
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                    break;
                    case 7:
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;

                    case 8: 
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;
                    case 9:
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                    break;

                    case 10: 
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;
                    case 11:
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                    break;

                    case 12: 
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                    break;
                }      
            });
        };
        app.cargarComboMeses= function () {
            $("#mesNac").html("<option value=\" 0\">Mes</option>");
            $("#mesNac").append("<option value=\"1\">Enero</option>");
            $("#mesNac").append("<option value=\"2\">Febrero</option>");
            $("#mesNac").append("<option value=\"3\">Marzo</option>");
            $("#mesNac").append("<option value=\"4\">Abril</option>");
            $("#mesNac").append("<option value=\"5\">Mayo</option>");
            $("#mesNac").append("<option value=\"6\">Junio</option>");
            $("#mesNac").append("<option value=\"7\">Julio</option>");
            $("#mesNac").append("<option value=\"8\">Agosto</option>");
            $("#mesNac").append("<option value=\"9\">Septiembre</option>");
            $("#mesNac").append("<option value=\"10\">Octubre</option>");
            $("#mesNac").append("<option value=\"11\">Noviembre</option>");
            $("#mesNac").append("<option value=\"12\">Diciembre</option>");
        };
        app.cargarComboDias = function (dias) {
            $("#diaNac").html("<option value=\" 0\">D&iacute;a</option>");
            for (var i = 1, max = dias; i <= max; i++) {
                    $("#diaNac").append("<option value=\" "+ i +"\">" + i + "</option>");
                }
        };
        app.cargarComboAno = function (){
            var today = new Date();
                var yyyy = today.getFullYear(); 
                for (var i = 1900, max = yyyy; i <= max; i++) {
                    $("#anoNac").append("<option value=\" "+ i +"\">" + i + "</option>");
                }
                
        };
        app.cargarComboArt = function () {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Art";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarComboArt(data);
                },
                error: function() {
                    alert('error');
                }

            });
        };
        app.rellenarComboArt = function(data){
            $("#comboArt").html("");
            $.each(data, function(clave, art) {
                $("#comboArt").append("<li><a href=\"#\" data-id_art=\"" + art.id_art + "\">"+ art.nombre_art +"</a></li>");
            });
        };
        app.cargarComboCliente = function (dias) {
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Cliente";
            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarComboCliente(data);
                },
                error: function() {
                    alert('error');
                }

            });
        };
        app.rellenarComboCliente = function(data){
            $("#comboCliente").html("");
            $.each(data, function(clave, cliente) {
                $("#comboCliente").append("<li><a href=\"#\" data-id_art=\"" + cliente.id_cliente + "\">"+ cliente.apellido_cliente + ", "+ cliente.nombre_cliente + ". DNI: " + cliente.dni_cliente +"</a></li>");
            });
        };
        app.borrarCampos = function (){
//            $("#nombre").val("").html();
//            $("#apellido").val("").html();
//            $("#direccion").val("").html();
            $("#fechaNac").val("").html();
            $("#salario").val("").html();
            $("#fotocopiaDNI").val("").html();
            $("#firmaPacto").val("").html();
            $("#firmaPoder").val("").html();
            $("#formCliente").bootstrapValidator('resetForm', true);
        }; 
        $("#reporteCliente").on('click', function(event) {
            event.preventDefault();
            window.open('reporteAlumnos.php', '_blank'); //cambiar por Cliente, hacer el reporte de clientes
        });
        $("#reporDetalle").on('click', function(event) {
            event.preventDefault();
            var idAl = $("#id").val();
            window.open('reporteDetalleAlumno.php?id=' + idAl,  '_blank'); //cambiar por Cliente, hacer el reporte de clientes
        });
        $("#cancelar").on("click", function(event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalCliente").modal('hide');
            $("#contTelefonos").val("4");
        });
        $("#guardar").on("click", function(event) {
            event.preventDefault();
            //app.guardarAlumno();
        });
        $("#formCliente").bootstrapValidator({
            excluded: []
        });

//        app.borrarFilaDataTable = function(id) {
//            var fila = $("#cuerpoTablaClientes").find("a[data-id_cliente='" + id + "']").parent().parent().remove();
//
//        };
//        
//        app.buscarClientes = function() {
//
//            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Cliente";
//
//            $.ajax({
//                url: url,
//                method: 'GET',
//                dataType: 'json',
//                success: function(data) {
//                    app.rellenarDataTable(data);
//                },
//                error: function() {
//                    alert('error');
//                }
//
//            });
//        };
//
//        
//        app.actualizarDataTable = function(cliente, id) {
//            if (id == 0) { //si entra acá es porque es agregar
//                var html = '<tr>' +
//                        '<td><a class="center-block seleccionar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-eye-open"></span>Ver</a></td>' +
//                        '<td>' + cliente.apellido + '</td>' +
//                        '<td>' + cliente.nombre + '</td>' +
//                        '<td>' + cliente.direccion + '</td>' +
//                        '<td>' + cliente.art + '</td>' +
//                        '<td>' + cliente.asistente + '</td>' +
//                        '<td>' +
//                        '<a class="pull-left editar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
//                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
//                        '</td>' +
//                        '</tr>';
//                $("#cuerpoTablaClientes").append(html);
//                
//            } else {
//                //busco la fila
//                var fila = $("#cuerpoTablaClientes").find("a[data-id_cliente='" + id + "']").parent().parent();
//                var html = '<td>' + 
//                        '<a class="center-block seleccionar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-eye-open"></span>Ver</a></td>' +
//                        '<td>' + cliente.apellido + '</td>' +
//                        '<td>' + cliente.nombre + '</td>' +
//                        '<td>' + cliente.direccion + '</td>' +
//                        '<td>' + cliente.art + '</td>' +
//                        '<td>' + cliente.asistente + '</td>' +
//                        '<td>' +
//                        '<a class="pull-left editar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
//                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
//                        '</td>';
//                fila.html(html);
//            }
//        };
//        
//        
//        
//        
//        
//        app.rellenarDataTable = function(data) {
//            var html = "";
//
//            $.each(data, function(clave, cliente) {
//                html += '<tr>' +
//                        '<td><a class="center-block seleccionar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-eye-open">Ver</span></a></td>' +
//                        '<td>' + cliente.apellido + '</td>' +
//                        '<td>' + cliente.nombre + '</td>' +
//                        '<td>' + cliente.direccion + '</td>' +
//                        '<td>' + cliente.art + '</td>' +
//                        '<td>' + cliente.asistente + '</td>' +
//                        '<td>' +
//                        '<a class="pull-left editar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
//                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
//                        '</td>' +
//                        '</tr>';
//            });
//            $("#cuerpoTablaClientes").html(html);
//            $("#tablaClientes").dataTable({       //transforma la tabla en dataTable
//                "sPagiationType":"full_numbers", //activa la paginación con números
//                "language":{ //cambia el lenguaje de la dataTable
//                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
//                }
//            });
//        };
        app.init();
    })(TallerAvanzada);
});