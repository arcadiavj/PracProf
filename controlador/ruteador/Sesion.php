<?php
session_start();
$rta = ["id_usuario"=>$_SESSION["id_usuario"], "usuario_usuario"=>$_SESSION["usuario_usuario"]];
echo json_encode($rta);

