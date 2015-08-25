$(function() {
    var TallerAvanzada = {};
    (function(app) {
        app.init = function() {
            $("#tablaClientes").dataTable({       //transforma la tabla en dataTable
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
                $("#tituloModal").html("Nuevo Cliente");
                $("#modalCliente").modal({show: true});
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#nombre").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#apellido").removeAttr("disabled");
                $("#direccion").removeAttr("disabled");
                $("#anoNac").removeAttr("disabled");
                $("#mesNac").removeAttr("disabled");
                $("#diaNac").removeAttr("disabled");
                $("#salario").removeAttr("disabled");
                $("#fotocopiaDNI").removeAttr("disabled");
                $("#firmaPacto").removeAttr("disabled");
                $("#firmaPoder").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
                var filaGrid = "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"numero1\" name=\"numero1\" placeholder=\"N&uacute;mero\">" +
                                "</div>" +
                                "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"propietario1\" name=\"propietario1\" placeholder=\"Propietario\">" +
                                "</div>" +
                                "<div class=\"col-lg-6\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"detalle1\" name=\"detalle1\" placeholder=\"Detalles\">" +
                                "</div>" +
                                "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"numero2\" name=\"numero2\" placeholder=\"N&uacute;mero\">" +
                                "</div>" +
                                "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"propietario2\" name=\"propietario2\" placeholder=\"Propietario\">" +
                                "</div>" +
                                "<div class=\"col-lg-6\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"detalle2\" name=\"detalle2\" placeholder=\"Detalles\">" +
                                "</div>" + 
                                "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"numero3\" name=\"numero3\" placeholder=\"N&uacute;mero\">" +
                                "</div>" +
                                "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"propietario3\" name=\"propietario3\" placeholder=\"Propietario\">" +
                                "</div>" +
                                "<div class=\"col-lg-6\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"detalle3\" name=\"detalle3\" placeholder=\"Detalles\">" +
                                "</div>";
                $("#gridTelefonos").html(filaGrid);         
            });
            $("#anoNac").on('click', function(event) {
                app.cargarComboMeses();
                app.cargarComboDias();
            });
            $("#masTelefonos").on('click', function(event){
                var cont = $("#contTelefonos").val();
                var idNum = "numero" + cont;
                var nameNum = "numero" + cont;
                var idProp = "propietario" + cont;
                var nameProp = "propietario" + cont;
                var idDet = "detalle" + cont;
                var nameDet = "detalle" + cont;
                var filaGrid = "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\""+idNum+"\" name=\""+nameNum+"\" placeholder=\"N&uacute;mero\">" +
                                "</div>" +
                                "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\""+idProp+"\" name=\""+nameProp+"\" placeholder=\"Propietario\">" +
                                "</div>" +
                                "<div class=\"col-lg-6\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\""+idDet+"\" name=\""+nameDet+"\" placeholder=\"Detalles\">" +
                                "</div>";
               $("#gridTelefonos").append(filaGrid); 
               $("#contTelefonos").val(cont + 1);
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
        app.borrarCampos = function (){
            $("#nombre").val("").html();
            $("#apellido").val("").html();
            $("#direccion").val("").html();
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
//          });
//        };
        app.init();
    })(TallerAvanzada);
});