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