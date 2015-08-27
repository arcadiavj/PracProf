<?php
require_once 'ControladorGeneral.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorCliente
 *
 * @author Flaco
 */
class ControladorCliente extends ControladorGeneral{
    public function buscar() {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_CLIENTES);
            $arrayClientes = $statement->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayClientes;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }

    public function eliminar($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $fecha=time() - (5 * 60 * 60); // le resto 5 horas a la fecha para que me dé la hora argentina
            $fechaRestada=date('Y-m-d H:i:s',$fecha);
            $arrayCliente = ["fch_baja"=>$fechaRestada, "id_cliente"=>$id];
            $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_CLIENTE, $arrayCliente);
            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
            return $arrayCliente;
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        }
    }

    public function buscarX ($datos){
    
    }
    
    public function guardar($datosCampos) {
        //$resultado = null;
        session_start();
        $idUser = $_SESSION["id_usuario"];
        $fechaNac = $datosCampos["AnoNac"]."-".$datosCampos["MesNac"]."-".$datosCampos["DiaNac"];
        $fecha = time() - (5 * 60 * 60); // le resto 5 horas a la fecha para que me dé la hora argentina
        $fechaActual = date('Y-m-d H:i:s',$fecha);
        if($datosCampos['id_cliente'] == 0) { // si id=0 entonces es agregar
            try {
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $paramCliente = ["nombre_cliente"=>$datosCampos["nombre"], "apellido_cliente"=>$datosCampos["apellido"],
                    "dni_cliente"=>$datosCampos["dni"],"direccion_cliente"=>$datosCampos["direccion"],
                    "fecha_nacimiento_cliente"=>$fechaNac, "id_usuario"=>$idUser,"fch_creacion"=>$fechaActual];
                $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_CLIENTE, $paramCliente);
                $idCli = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ULTIMO_CLIENTE);
                $id = $idCli->fetchColumn();
                //acá me debería traer el id del cliente que acabo de insertar para poder usarlo para insertar telefonos
                $arrayIds = [];
                $arrayNums = [];
                $arrayProps = [];
                $arrayDets = [];
                foreach ($datosCampos as $key => $value) {
                    if (strcmp("id_telefono", substr($key, 0,11)) == 0) {
                        array_push($arrayIds, $value);
                    }
                    if (strcmp("numero", substr($key, 0,6)) == 0) {
                        array_push($arrayNums, $value);
                    }
                    if (strcmp("propietario", substr($key, 0,11)) == 0) {
                        array_push($arrayProps, $value);
                    }
                    if (strcmp("detalle", substr($key, 0,7)) == 0) {
                        array_push($arrayDets, $value);
                    }
                }
                $arrayTels = [];
                for ($index = 0; $index < count($arrayNums); $index++) {
                    $arrayTels["numero_telefono"] = $arrayNums[$index];
                    $arrayTels["propietario_telefono"] = $arrayProps[$index];
                    $arrayTels["detalle_telefono"] = $arrayDets[$index];
                    $arrayTels["id_cliente"]=$id;
                    $arrayTels["id_usuario"]=$idUser;
                    $arrayTels["fch_creacion"]=$fechaActual;
                    $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_TELEFONO, $arrayTels);
                    foreach ($arrayTels as $i => $value) {
                        unset($arrayTels[$i]);
                    }
                }
                //$this->insertarTelefonos($datosCampos, $id, $idUser, $fechaActual);
                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
            }catch (PDOException $excepcionPDO) {
                echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
                $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
            }
        } else { //si entra acá es para modificar$this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            try {
                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
                $resCliente = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_CLIENTE,array($datosCampos['id_cliente']));
                //$fkDomi = $resCliente->fetchColumn(6);
                $paramCli = ["nombre_cliente"=>$datosCampos['nombre'], "apellido_cliente"=>$datosCampos['apellido'],
                    "dni_cliente"=>$datosCampos['dni'],"direccion_cliente"=>$datosCampos['direccion'],
                    "fecha_nacimiento_cliente"=>$fechaNac, "id_usuario"=>$idUser, "fch_modificacion"=>$fechaActual, "id_cliente"=>$datosCampos["id_cliente"]];
                $resUpdate = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ACTUALIZAR_UN_CLIENTE, $paramCli);
                $id = $datosCampos['id_cliente'];
                //arreglo de telefonos a actualizar
                $arrayIds = [];
                $arrayNums = [];
                $arrayProps = [];
                $arrayDets = [];
                foreach ($datosCampos as $key => $value) {
                    if (strcmp("id_telefono", substr($key, 0,11)) == 0) {
                        array_push($arrayIds, $value);
                    }
                    if (strcmp("numero", substr($key, 0,6)) == 0) {
                        array_push($arrayNums, $value);
                    }
                    if (strcmp("propietario", substr($key, 0,11)) == 0) {
                        array_push($arrayProps, $value);
                    }
                    if (strcmp("detalle", substr($key, 0,7)) == 0) {
                        array_push($arrayDets, $value);
                    }
                }
                $arrayTels = [];
                for ($index = 0; $index < count($arrayNums); $index++) {
                    $arrayTels["numero_telefono"] = $arrayNums[$index];
                    $arrayTels["propietario_telefono"] = $arrayProps[$index];
                    $arrayTels["detalle_telefono"] = $arrayDets[$index];
                    $arrayTels["id_cliente"]=$id;
                    $arrayTels["id_usuario"]=$idUser;
                    $arrayTels["fch_modificacion"]=$fechaActual;
                    $arrayTels["id_telefono"]=$arrayIds[$index];
                    $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ACTUALIZAR_TELEFONO, $arrayTels);
                    foreach ($arrayTels as $i => $value) {
                        unset($arrayTels[$i]);
                    }
                }
                //final de la parte de actualizacion de telefonos
                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
            }catch (PDOException $excepcionPDO) {
                echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
                $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
            } catch (Exception $exc) {
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
            }
        }
        $respuesta = $this->getCliente($id);
        return $respuesta;
//        $respuesta = getCliente($idCli);
//        echo '<br>COMIENZA CLIENTE DEVUELTO: <br>';
//        foreach ($respuesta as $key => $value) {
//            echo 'Clave: '.$key.'. Valor: '.$value.'<br>';
//        }
//        return $respuesta;
//        try {
//            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//            $domici = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_DOMICILIO, array($respuesta['FK_domicilio']));
//            $domArr = $domici->fetch(PDO::FETCH_ASSOC);
//            $respuesta['calle']=$domArr['calle'];
//            $respuesta['numero']=$domArr['numero'];
//            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
//            return $respuesta;
//        }catch (PDOException $excepcionPDO) {
//            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
//            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//        } catch (Exception $exc) {
//            echo $exc->getTraceAsString();
//            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
//        }
    }
    public function insertarTelefonos($datosCampos, $id, $idUser, $fechaActual){
        echo '<script>window.alert("ENTRE al insertarTelefonos");</script>';
        foreach ($datosCampos as $key => $value) {
            $arrayIds = [];
            $arrayNums = [];
            $arrayProps = [];
            $arrayDets = [];
            if (strcmp("id_telefono", substr($key, 0,11)) == 0) {
                $arrayIds["id_telefono"]=$value;
            }
            if (strcmp("numero", substr($key, 0,6)) == 0) {
                $arrayNums["numero_telefono"]=$value;
            }
            if (strcmp("propietario", substr($key, 0,11)) == 0) {
                $arrayProps["propietario_telefono"]=$value;
            }
            if (strcmp("detalle", substr($key, 0,7)) == 0) {
                $arrayDets["detalle_telefono"]=$value;
            }
        }
        for ($index = 0; $index < count($arrayNums); $index++) {
            $arrayTels = [];
            $arrayTels["numero_telefono"] = $arrayNums[$index];
            $arrayTels["propietario_telefono"] = $arrayProps[$index];
            $arrayTels["detalle_telefono"] = $arrayDets[$index];
            $arrayTels["id_cliente"]=$id;
            $arrayTels["id_usuario"]=$idUser;
            $arrayTels["fch_creacion"]=$fechaActual;
            foreach ($arrayTels as $key => $value) {
                echo 'Clave: '.$key.' - Valor: '.$value.'<br>';
            }
            $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_TELEFONO, $arrayTels);
            foreach ($arrayTels as $i => $value) {
                unset($arrayTels[$i]);
            }
        }
    }
    public function getCliente($id) {
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_CLIENTE,array($id));
            $cliente = $statement->fetch();
            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
        }catch (PDOException $excepcionPDO) {
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        return $cliente;
    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        
    }


}
