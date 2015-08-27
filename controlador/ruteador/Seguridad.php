<?php
if (isset($_POST['user'])) {
    $usuario = $_POST['user'];
    if (isset($_POST['pass'])) {
        $clave = $_POST['pass'];
        require_once '../controladoresEspecificos/ControladorUsuario.php';
        $cU = new ControladorUsuario();
        $us = base64_decode(base64_decode($usuario));
        $pa = base64_decode(base64_decode($clave));
        $res =$cU->validarUsuarioClave($us, $pa); 
        echo json_encode($res);
    }
}

