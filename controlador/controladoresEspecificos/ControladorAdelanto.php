<?php
require_once 'ControladorGeneral.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorAdelanto
 *
 * @author Flaco
 */
class ControladorAdelanto extends ControladorGeneral{
    public function buscar() {
//        try {
//            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ALUMNOS);
//            $arrayPersonas = $statement->fetchAll(PDO::FETCH_ASSOC);
//            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
//            return $arrayPersonas;
//        }catch (PDOException $excepcionPDO) {
//            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
//            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//        }catch (Exception $exc) {
//            echo $exc->getTraceAsString();
//            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//        }
    }

    public function eliminar($id) {
//        try {
//            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//            $resultadoUltimoAlumno = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_ALUMNO, Array($id));
//            $alumno = $resultadoUltimoAlumno->fetch(PDO::FETCH_ASSOC);
//            $idAlu = $alumno['id']; //id del alumno
//            $idDomi = $alumno["FK_domicilio"];//id del domicilio
//            $resultadoBorrarPersona = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_PERSONA, array($idAlu));
//            $resultadoBorrarDomicilio = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_DOMICILIO, array($idDomi));
//            $this->refControladorPersistencia->get_conexion()->commit(); //si todo salió bien hace el commit
//            return $id;
//            //$respuesta = ["operacion"=>"exitosa"];
//        }catch (PDOException $excepcionPDO) {
//            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
//            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//        }catch (Exception $excepcionGral) {
//            echo "<br>Error: ".$excepcionGral->getTraceAsString().'<br>';
//            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//        }
    }

    public function buscarX ($datos){
            
//            if ($datos['criterio']=="calle") { //si busca por Calle "todas las personas que vivan en la calle san juan"
//                try {
//                    $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//                    $resulDomi = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ALUMNO_POR_CALLE, array($datos['valor']."%"));
//                    $arrayXdomis = $resulDomi->fetchAll(PDO::FETCH_ASSOC);
//                    $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
//                    return $arrayXdomis;
//                }catch (PDOException $excepcionPDO) {
//                    echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
//                    $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//                } catch (Exception $exc) {
//                    echo $exc->getTraceAsString();
//                    $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
//                }
//            }else{ //si busca por nombre, apellido o legajo
//                try {
//                    $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//                    $query = str_replace("calle LIKE ?", "persona.".$datos['criterio']." LIKE '".$datos['valor']."%'", DbSentencias::BUSCAR_ALUMNO_POR_CALLE);
//                    $resultado = $this->refControladorPersistencia->ejecutarSentencia($query);
//                    $arrayAlumnos = $resultado->fetchAll(PDO::FETCH_ASSOC);
//                    $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
//                    return $arrayAlumnos;
//                }catch (PDOException $excepcionPDO) {
//                    echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
//                    $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//                } catch (Exception $exc) {
//                    echo $exc->getTraceAsString();
//                    $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
//                }
//            }
    }
    
    public function guardar($datosCampos) {
//        $resultado = null;
//        if($datosCampos['id'] == 0) { // si id=0 entonces es agregar
//            try {
//                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//                $paramDomi = ["calle"=>$datosCampos['calle'], "numero"=>$datosCampos['numero']];
//                $res = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_DOMICLIO, $paramDomi);
//                $ultDomi = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ULTIMO_DOMICILIO);
//                $idDom = $ultDomi->fetchColumn();
//                $param = ["nombre"=>$datosCampos['nombre'], "apellido"=>$datosCampos['apellido'], "titulo"=>"-----", "legajo"=>$datosCampos['legajo'], "tipo"=>"A", "FK_domicilio"=>$idDom];
//                $resul = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_PERSONA, $param);
//                $id = $this->refControladorPersistencia->getUltimoId();
//                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit
//            }catch (PDOException $excepcionPDO) {
//                echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
//                $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//            } catch (Exception $exc) {
//                echo $exc->getTraceAsString();
//                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
//            }
//        } else { //si entra acá es para modificar$this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//            try {
//                $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//                $resAlumno = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_ALUMNO,array($datosCampos['id']));
//                $fkDomi = $resAlumno->fetchColumn(6);
//                $paramAlu = ["nombre"=>$datosCampos['nombre'], "apellido"=>$datosCampos['apellido'],"legajo"=>$datosCampos['legajo'],"calle"=>$datosCampos['calle'], "numero"=>$datosCampos['numero'], "id"=>$datosCampos['id']];
//                $resUpdate = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ACTUALIZAR_ALUMNO_CON_DOMICILIO, $paramAlu);
//                $id = $datosCampos['id'];
//                $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
//            }catch (PDOException $excepcionPDO) {
//                echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
//                $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//            } catch (Exception $exc) {
//                echo $exc->getTraceAsString();
//                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
//            }
//        }
//        $respuesta = $this->getPersona($id);
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
    
    public function getPersona($id) {
//        try {
//            $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
//            $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_UN_ALUMNO,array($id));
//            $alumno = $statement->fetch();
//            $this->refControladorPersistencia->get_conexion()->commit();  //si todo salió bien hace el commit            
//        }catch (PDOException $excepcionPDO) {
//            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
//            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
//        } catch (Exception $exc) {
//            echo $exc->getTraceAsString();
//            $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
//        }
//        return $alumno;
    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        
    }

//put your code here
}
