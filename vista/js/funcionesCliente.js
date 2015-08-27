$(function() {
    var TallerAvanzada = {};
    (function(app) {
        app.init = function() {
            app.verificarSesion();
//            app.buscarClientes();  primero verifica que haya sesion activa y despues llama buscar clientes
//            app.bindings(); 
        };
        app.bindings = function() {
            app.cargarComboAno();
            $("#agregar").on('click', function(event) {
                event.preventDefault();
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Cliente");
                $("#modalCliente").modal({show: true});
                $("#guardar").attr("value","Agregar");
                $("#guardar").html("Agregar");
                $("#nombre").removeAttr("disabled");//elimino la propiedad "disabled" que usé para VER
                $("#apellido").removeAttr("disabled");
                $("#direccion").removeAttr("disabled");
                $("#dni").removeAttr("disabled");
                $("#anoNac").removeAttr("disabled");
                $("#mesNac").removeAttr("disabled");
                $("#diaNac").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
                $("#masTelefonos").show();
                app.inicializarGridTelefonos();         
            });
            $("#tablaClientes").on('click', '.eliminar', function() {
                app.eliminarCliente($(this).attr("data-id_cliente"));
            });
            $("#anoNac").on('click', function(event) {
                app.cargarComboMeses();
            });
            
            $("#masTelefonos").on('click', function(event){
                var cont = $("#contTelefonos").val();
                var idId = "id_telefono";
                var idNum = "numero" + cont;
                var idProp = "propietario" + cont;
                var idDet = "detalle" + cont;
                var filaGrid = "<div class=\"col-lg-2\">" +
                                    "<input class=\"form-control\" type=\"hidden\" id=\"" + idId + "\" name=\"" + idId + "\">" +
                                "</div>" +
                                "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"" + idNum + "\" name=\"" + idNum + "\" placeholder=\"N&uacute;mero\">" +
                                "</div>" +
                                "<div class=\"col-lg-3\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"" + idProp + "\" name=\"" + idProp + "\" placeholder=\"Propietario\">" +
                                "</div>" +
                                "<div class=\"col-lg-4\">" +
                                    "<input class=\"form-control\" type=\"text\" id=\"" + idDet + "\" name=\"" + idDet + "\" placeholder=\"Detalles\">" +
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
            $("#cuerpoTablaClientes").on('click', '.editar', function(event) {

                $("#id_cliente").val($(this).attr("data-id_cliente"));

                $("#apellido").val($(this).parent().parent().children().first().next().html());
                $("#nombre").val($(this).parent().parent().children().first().next().next().html());
                $("#dni").val($(this).parent().parent().children().first().next().next().next().html());
                $("#direccion").val($(this).parent().parent().children().first().next().next().next().next().html());
                
                var fechaStr = ($(this).parent().parent().children().first().next().next().next().next().next().html());
                var fechaArray = fechaStr.split("-");
                //alert("Año:" + fechaArray[0] + "\nMes: " + fechaArray[1] + "\nDía: " + fechaArray[2]);
                app.cargarComboAno();
                $("#anoNac option").each(function() { this.selected = (this.text == fechaArray[0]); });
                app.cargarComboMeses();
                $("#mesNac option").each(function() { 
                    switch (fechaArray[1]) {
                    case "01":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Enero");
                    break;
                    case "02":
                        //días debe estar entre 1 y 28 ó 29
                        var an = $("#anoNac").val();
                        var anyo = parseInt(an);
                        if ((((anyo%100)!=0)&&((anyo%4)==0))||((anyo%400)==0)){
                             app.cargarComboDias(29);
                        }else{
                            app.cargarComboDias(28);
                        }
                        this.selected = (this.text == "Febrero");
                    break;
                    case "03":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Marzo");
                    break;
                    case "04":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Abril");
                    break;
                    case "05":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Mayo");
                    break;
                    case "06":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Junio");
                    break;
                    case "07":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Julio");
                    break;
                    case "08":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Agosto");
                    break;
                    case "09":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Septiembre");
                    break;
                    case "10":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Octubre");
                    break;
                    case "11":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Noviembre");
                    break;
                    case "12":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Diciembre");
                    break;
                    }
                });
                
                $("#diaNac option").each(function() { this.selected = (this.text == fechaArray[2] || (this.text) == fechaArray[2]); }); 
                $("#masTelefonos").hide();
                $("#guardar").attr("value","Modificar");
                $("#guardar").html("Modificar");
                $("#tituloModal").html("Editar Cliente");
                $("#modalCliente").modal({show: true});
                
                $("#nombre").removeAttr("disabled");//elimino la propiedad "disabled" que usé para ver
                $("#apellido").removeAttr("disabled");
                $("#dni").removeAttr("disabled");
                $("#direccion").removeAttr("disabled");
                $("#anoNac").removeAttr("disabled");
                $("#mesNac").removeAttr("disabled");
                $("#diaNac").removeAttr("disabled");
                $("#guardar").show();
                $("#reporDetalle").hide();
                app.traerTelefonos();
            });
            
            
            $("#cuerpoTablaClientes").on('click', '.seleccionar', function(event) {
                $("#id_cliente").val($(this).attr("data-id_cliente"));
                $("#apellido").val($(this).parent().parent().children().first().next().html());
                $("#apellido").attr('disabled', 'true');
                $("#nombre").val($(this).parent().parent().children().first().next().next().html());
                $("#nombre").attr('disabled', 'true');
                $("#dni").val($(this).parent().parent().children().first().next().next().next().html());
                $("#dni").attr('disabled', 'true');
                $("#direccion").val($(this).parent().parent().children().first().next().next().next().next().html());
                $("#direccion").attr('disabled', 'true');
                //
                var fechaStr = ($(this).parent().parent().children().first().next().next().next().next().next().html());
                var fechaArreglo = fechaStr.split("-");
                app.cargarComboAno();
                $("#anoNac option").each(function() { this.selected = (this.text == fechaArreglo[0]); });
                app.cargarComboMeses();
                $("#mesNac option").each(function() { 
                    switch (fechaArreglo[1]) {
                    case "01":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Enero");
                    break;
                    case "02":
                        //días debe estar entre 1 y 28 ó 29
                        var ann = $("#anoNac").val();
                        var anio = parseInt(ann);
                        if ((((anio%100)!=0)&&((anio%4)==0))||((anio%400)==0)){
                             app.cargarComboDias(29);
                        }else{
                            app.cargarComboDias(28);
                        }
                        this.selected = (this.text == "Febrero");
                    break;
                    case "03":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Marzo");
                    break;
                    case "04":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Abril");
                    break;
                    case "05":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Mayo");
                    break;
                    case "06":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Junio");
                    break;
                    case "07":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Julio");
                    break;
                    case "08":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Agosto");
                    break;
                    case "09":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Septiembre");
                    break;
                    case "10":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Octubre");
                    break;
                    case "11":
                        //días debe estar entre 1 y 30
                        app.cargarComboDias(30);
                        this.selected = (this.text == "Noviembre");
                    break;
                    case "12":
                        //días debe estar entre 1 y 31
                        app.cargarComboDias(31);
                        this.selected = (this.text == "Diciembre");
                    break;
                    }
                });
                
                $("#diaNac option").each(function() { this.selected = (this.text == fechaArreglo[2] || (this.text) == fechaArreglo[2]); }); 
                $("#anoNac").attr('disabled', 'true');
                $("#mesNac").attr('disabled', 'true');
                $("#diaNac").attr('disabled', 'true');
                
                $("#guardar").hide();
                $("#reporDetalle").show();
                //$("#guardar").html("Modificar");
                //$("#guardar").attr("value","Modificar");
                $("#tituloModal").html("Detalles Cliente");
                $("#modalCliente").modal({show: true});
                app.traerTelefonosDisabled();
                $("#masTelefonos").hide();
            });
            
        };
        app.inicializarGridTelefonos = function(){
            var filaGrid = "<div class=\"col-lg-2\">" +
                                "<input class=\"form-control\" type=\"hidden\" id=\"id_telefono1\" name=\"id_telefono1\">" +
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\"numero1\" name=\"numero1\" placeholder=\"N&uacute;mero\">" +
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\"propietario1\" name=\"propietario1\" placeholder=\"Propietario\">" +
                            "</div>" +
                            "<div class=\"col-lg-4\">" +
                                "<input class=\"form-control\" type=\"text\" id=\"detalle1\" name=\"detalle1\" placeholder=\"Detalles\">" +
                            "</div>"; 
                $("#gridTelefonos").html(filaGrid);
        };
        app.traerTelefonos = function (){
            var id_cliente = $("#id_cliente").val();
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarTelsDeUnCliente&nombreFormulario=Telefono&idCliente=" + id_cliente; 
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function(data) {
                    app.cargarGridTelefonos(data);
                },
                error: function(data) {
                    alert('error en app.traerTelefonos');
                }
            });
        };
        
        app.traerTelefonosDisabled = function (){
            var id_cliente = $("#id_cliente").val();
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscarTelsDeUnCliente&nombreFormulario=Telefono&idCliente=" + id_cliente; 
            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function(data) {
                    app.cargarGridTelefonosDisabled(data);
                },
                error: function(data) {
                    alert('error en app.traerTelefonos');
                }
            });
        };
        
        app.cargarGridTelefonos = function(data){
            var index = 0; //para ir creando los campos numero1, 2, 3 y asi. Lo mismo en propietario y detalle
            var ids = "id_telefono";
            var nums = "numero";
            var prop = "propietario";
            var det = "detalle";
            var filaGrid="";
            $("#gridTelefonos").html(filaGrid);
            $.each(data, function(clave, tel) {
                filaGrid = "<div class=\"col-lg-2\">" +
                                "<input class=\"form-control\" type=\"hidden\" id=\""+ (ids + (index.toString())) +"\" name=\""+ (ids + (index.toString())) +"\" value=\"" + tel.id_telefono + "\">" +
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (nums + (index.toString())) +"\" name=\""+ (nums + (index.toString())) +"\" placeholder=\"N&uacute;mero\" value=\""+ tel.numero_telefono + "\">" + 
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (prop + (index.toString())) +"\" name=\""+ (prop + (index.toString())) +"\" placeholder=\"Propietario\" value=\""+ tel.propietario_telefono + "\">" +
                            "</div>" +
                            "<div class=\"col-lg-4\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (det + (index.toString())) +"\" name=\""+ (det + (index.toString())) +"\" placeholder=\"Detalles\" value=\"" + tel.detalle_telefono + "\">" +
                            "</div>"; 
                $("#gridTelefonos").append(filaGrid);
                index ++;
            });
        };
        
        app.cargarGridTelefonosDisabled = function(data){
            var index = 0; //para ir creando los campos numero1, 2, 3 y asi. Lo mismo en propietario y detalle
            var ids = "id_telefono";
            var nums = "numero";
            var prop = "propietario";
            var det = "detalle";
            var filaGrid="";
            $("#gridTelefonos").html(filaGrid);
            $.each(data, function(clave, tel) {
                filaGrid = "<div class=\"col-lg-2\">" +
                                "<input class=\"form-control\" type=\"hidden\" id=\""+ (ids + (index.toString())) +"\" name=\""+ (ids + (index.toString())) +"\" value=\"" + tel.id_telefono + "\" disabled=\"true\">" +
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (nums + (index.toString())) +"\" name=\""+ (nums + (index.toString())) +"\" placeholder=\"N&uacute;mero\" value=\""+ tel.numero_telefono + "\" disabled=\"true\">" + 
                            "</div>" +
                            "<div class=\"col-lg-3\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (prop + (index.toString())) +"\" name=\""+ (prop + (index.toString())) +"\" placeholder=\"Propietario\" value=\""+ tel.propietario_telefono + "\" disabled=\"true\">" +
                            "</div>" +
                            "<div class=\"col-lg-4\">" +
                                "<input class=\"form-control\" type=\"text\" id=\""+ (det + (index.toString())) +"\" name=\""+ (det + (index.toString())) +"\" placeholder=\"Detalles\" value=\"" + tel.detalle_telefono + "\" disabled=\"true\">" +
                            "</div>"; 
                $("#gridTelefonos").append(filaGrid);
                index ++;
            });
        };
        
        
        
        app.cargarComboMeses= function () {
            $("#mesNac").html("<option value=\"0\">Mes</option>");
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
            $("#diaNac").html("<option value=\"0\">D&iacute;a</option>");
            for (var i = 1, max = dias; i <= max; i++) {
                    if (i>= 1 && i<=9) {
                        $("#diaNac").append("<option value=\"0"+ i +"\">0" + i + "</option>");
                    }else{
                        $("#diaNac").append("<option value=\""+ i +"\">" + i + "</option>");
                    }
                }
        };
        app.cargarComboAno = function (){
            $("#anoNac").html("<option value=\"0\">Año</option>");
            var today = new Date();
                var yyyy = today.getFullYear(); 
                for (var i = yyyy, min = 1900; i >= min; i--) {
                    $("#anoNac").append("<option value=\" "+ i +"\">" + i + "</option>");
                }
                
        };
        app.borrarCampos = function (){
            $("#apellido").val("").html();
            $("#nombre").val("").html();
            $("#dni").val("").html();
            $("#direccion").val("").html();
            app.inicializarGridTelefonos();
            app.cargarComboAno();            
            $("#mesNac").html("<option value=\" 0\">Mes</option>");
            $("#diaNac").html("<option value=\" 0\">Día</option>");
            $("#formCliente").bootstrapValidator('resetForm', true);
        }; 
        $("#reporteCliente").on('click', function(event) {
            event.preventDefault();
            window.open('../reportes/reporteClientes.php', '_blank'); //cambiar por Cliente, hacer el reporte de clientes
        });
        $("#reporDetalle").on('click', function(event) {
            event.preventDefault();
            var idCli = $("#id_cliente").val();
            window.open('../reportes/reporteDetalleCliente.php?id=' + idCli,  '_blank'); //cambiar por Cliente, hacer el reporte de clientes
        });
        $("#cancelar").on("click", function(event) {
            event.preventDefault();
            app.borrarCampos();
            $("#modalCliente").modal('hide');
            $("#contTelefonos").val("2");
        });
        $("#guardar").on("click", function(event) {
            event.preventDefault();
            var anio = $("#anoNac").val();
            var mes = $("#mesNac").val();
            var dia = $("#diaNac").val();
            $("#AnoNac").val(anio);
            $("#MesNac").val(mes);
            $("#DiaNac").val(dia);
            app.guardarCliente();
        });
        $("#formCliente").bootstrapValidator({
            excluded: []
        });

        app.eliminarCliente = function(id) {
            var rta = confirm("Se va a eliminar el CLIENTE seleccionado. Esta seguro?");
            if (rta) {
                var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&nombreFormulario=Cliente&id=" + id; 
                $.ajax({
                    url: url,
                    method: "GET",
                    dataType: 'json',
                    success: function(data) {
                        app.borrarFilaDataTable(id);
                    },
                    error: function(data) {
                        alert('error en app.eliminarCliente');
                    }
                });
            }
        };
        app.buscarClientes = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&nombreFormulario=Cliente";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarDataTable(data);
                },
                error: function() {
                    alert('error en buscar clientes');
                }

            });
        };
        app.guardarCliente = function() {
            
            var url = "../../controlador/ruteador/Ruteador.php"; //voy al ruteador a guardar alumno (tanto para modific como para agregar)
            //data del formulario persona
            var data = $("#formCliente").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function(datos) {
                    $("#modalCliente").modal('hide');
                    app.actualizarDataTable(datos, $("#id_cliente").val());
                },
                error: function(data) {
                    alert(data);
                }
            });
        };
        
        app.actualizarDataTable = function(cliente, id) {
            if (id == 0) { //si entra acá es porque es agregar
                var html = '<tr>' +
                        '<td><a class="center-block seleccionar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-eye-open"></span>Ver</a></td>' +
                        '<td>' + cliente.apellido_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.dni_cliente + '</td>' +
                        '<td>' + cliente.direccion_cliente + '</td>' +
                        '<td>' + cliente.fecha_nacimiento_cliente + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaClientes").append(html);
                
            } else {
                //busco la fila
                var fila = $("#cuerpoTablaClientes").find("a[data-id_cliente='" + id + "']").parent().parent();
                var html = '<td>' + 
                        '<a class="center-block seleccionar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-eye-open"></span>Ver</a></td>' +
                        '<td>' + cliente.apellido_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.dni_cliente + '</td>' +
                        '<td>' + cliente.direccion_cliente + '</td>' +
                        '<td>' + cliente.fecha_nacimiento_cliente + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>';
                fila.html(html);
            }
        };
        
        
        app.verificarSesion = function(){
            var url = "../../controlador/ruteador/Sesion.php"; 
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(datos) {
                    if (typeof datos['id_usuario'] != 'undefined') {
                        $("#id_user").val(datos.id_usuario);
                        app.buscarClientes();  
                        app.bindings();
                    }else{
                        location.href = "../../index.html";
                    }
                },
                error: function(data) {
                    location.href = "../../index.html";
                } 
            });  
        };
        app.borrarFilaDataTable = function(id) {
            var fila = $("#cuerpoTablaClientes").find("a[data-id_cliente='" + id + "']").parent().parent().remove();

        };
        app.rellenarDataTable = function(data) {
            var html = "";

            $.each(data, function(clave, cliente) {
                html += '<tr>' +
                        '<td><a class="center-block seleccionar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-eye-open">Ver</span></a></td>' +
                        '<td>' + cliente.apellido_cliente + '</td>' +
                        '<td>' + cliente.nombre_cliente + '</td>' +
                        '<td>' + cliente.dni_cliente + '</td>' +
                        '<td>' + cliente.direccion_cliente + '</td>' +
                        '<td>' + cliente.fecha_nacimiento_cliente + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_cliente="' + cliente.id_cliente + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaClientes").html(html);
            $("#tablaClientes").dataTable({       //transforma la tabla en dataTable
                "sPagiationType":"full_numbers", //activa la paginación con números
                "language":{ //cambia el lenguaje de la dataTable
                    "url":"../js/dataTable-es.json" //este es el archivo json del lenguaje español
                }
            });
        };
        app.init();
    })(TallerAvanzada);
});