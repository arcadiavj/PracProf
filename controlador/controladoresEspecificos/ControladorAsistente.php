<?php
require_once 'ControladorGeneral.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorAsistente
 *
 * @author Flaco
 */
class ControladorAsistente extends ControladorGeneral{
    
    
    public function buscar() {//funcion utilizada para buscar en la base de datos a todos los asistentes para proceder con
    //    su listado
        try {
           $this->refControladorPersistencia->get_conexion()->beginTransaction();  //comienza la transacción
           $statement = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ASISTENTES);//paso los datos correspondientes a la función ejecutar sentencia
           //para buscar a los asistentes
           $arrayAsistentes = $statement->fetchAll(PDO::FETCH_ASSOC);//retorna un array asociativo para no duplicar datos
           
           $this->refControladorPersistencia->get_conexion()->commit();//si todo salió bien hace el commit
           
            return $arrayAsistentes;//regreso el array para poder 
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
            $fecha = time();//coloca la fecha actual           
            $fechaFormato=date('Y-m-d H:i:s');//formateo la fecha para guardar en la bd
            
            $this->refControladorPersistencia->get_conexion()->beginTransaction();//comienzo la transacción
            
            $paramAsistente=["fch_baja"=>$fechaFormato, "usuario_id"=>$id];//uso los datos obtenidos para buscar en la bd de datos todos los datos el ususrio
            
            $asistenteConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::ELIMINAR_ASISTENTE,$paramAsistente);//Envio los datos a la base de datos para eliminar el usuario          
            $this->refControladorPersistencia->get_conexion()->commit();//ejecuto la acción para eliminar de forma lógica a los ususario
            
            
        }catch (PDOException $excepcionPDO) {            
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {           
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        
    
    }

     public function buscarAsistenteXId($datos) {//este método es el encargado de realiza la busqueda del último usuario insertado       
           
        try {
            $this->refControladorPersistencia->get_conexion()->beginTransaction();
            $paramAsistente=["id_asistente"=>$datos];//uso los datos obtenidos para buscar en la bd de datos todos los datos el ususrio
            
            $asistenteConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ASISTENTES_ID,$paramAsistente);
            $arrayAsistente = $asistenteConsulta->fetchAll(PDO::FETCH_ASSOC);//utilizo el FETCH_ASSOC para que no repita los campos
            
            $this->refControladorPersistencia->get_conexion()->commit();//realizo el commit para obtener los datos
           
            return $arrayAsistente;//regreso el array de usuario que necesito para mostrar los datos que han sido almacenados en la base de datos.
            
        }catch (PDOException $excepcionPDO) {            
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {           
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        }    
    
    public function guardar($datosCampos) {
        $fecha = time();//coloca la fecha actual
        $fechaFormato=date('Y-m-d H:i:s');//formateo la fecha para guardar en la bd
         
        try {
            //cuando agrego un asistente pongo la fecha de modificacion en 0000-00-00 00:00:00 por que la base de datos no acepta null
            //los datos nombre y apellido los obtengo del ruteador que viene de la vista, 
            //la fecha la formateo mas arriba y agrego la fecha actual            
            
            $paramAsistente=["nombre_asistente"=>$datosCampos["nAsistente"],
                "apellido_asistente"=>$datosCampos["aAsistente"],
                "id_usuario"=>"9",
                "fch_creacion"=>$fechaFormato,
                "fch_modificacion"=>'0000-00-00 00:00:00', 
                "fch_baja"=>'0000-00-00 00:00:00'];//estos son los datos con los que voy a crear el usuario en la bd 
            $this->refControladorPersistencia->get_conexion()->beginTransaction();
            $asistenteConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::INSERTAR_ASISTENTE,$paramAsistente);//uso la sentencia para insertar un usuario en la base de datos
            
            $this->refControladorPersistencia->get_conexion()->commit();//si no hay errores realiza el comit a la bd correspondiente
            $ultimo=$this->ultimoAsistente();//llamo al método del último usuario creado para obtener el último id
            
            return $ultimo;
        } catch (PDOException $excepcionPDO) {            
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {           
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
            
    }
    
    public function ultimoAsistente() {
        try {
            
            $this->refControladorPersistencia->get_conexion()->beginTransaction();            
            $asistenteConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::BUSCAR_ULTIMO_ASISTENTE);//en esta consulta busco cual es el ultimo usuario            
            $arrayAsistente = $asistenteConsulta->fetchAll(PDO::FETCH_ASSOC);//utilizo el FETCH_ASSOC para que no repita los campos
            
            $this->refControladorPersistencia->get_conexion()->commit();//realizo el commit de los datos a la base de datos
            $idAsistente ="";//creo una variable para poder enviar los datos al metodo correpondiente
            foreach ($arrayAsistente as $id) {//recorro el array que contiene los datos que necesito para buscarl el ultimo usuario
                foreach ($id as $clave => $value) {//recorro los datos dentro del array y obtengo el valor que necesito
                    $idAsistente = $value;//asigno el valor correspondiente a la variable creada anteriormente para tal caso
                }
            }
            
            //envio los datos al metodo que se va a encargar de ralizar la consulta a la base de 
            //datos para obtener el último usiario registrado y devolver los datos para mostrarlos por pantalla
            $asistenteId= $this->buscarAsistenteXId($idAsistente);//lamo al metodo para obtener todos los datos del usuario que 
            //estoy buscando en este caso el último que se creo
            return $asistenteId;//regreso los datos de ese usuario a la llamada para enviarlos desde el ruteador a la vista
            
        }catch (PDOException $excepcionPDO) { //atrapo la excepcion por si algo salio mal que se realice el rollback           
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {           
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        }
    
    
    public function getPersona($id) {
        
    }

    public function agregar($datosCampos) {
        
    }

    public function modificar($datosCampos) {
        $fecha = time();//coloca la fecha actual
        $fechaFormato=date('Y-m-d H:i:s');//formateo la fecha para guardar en la bd
        
         try {
            //cuando agrego un asistente pongo la fecha de modificacion en 0000-00-00 00:00:00 por que la base de datos no acepta null
            //los datos nombre y apellido los obtengo del ruteador que viene de la vista, 
            //la fecha la formateo mas arriba y agrego la fecha actual            
            
            $paramAsistente=["nombre_asistente"=>$datosCampos["nAsistente"],
                "apellido_asistente"=>$datosCampos["aAsistente"],
                "id_usuario"=>"9",
                "fch_creacion"=>$datosCampos['fchCreacion'],
                "fch_modificacion"=>$fechaFormato, 
                "fch_baja"=>'0000-00-00 00:00:00',
                "id_asistente"=>$datosCampos["id"]];//estos son los datos con los que voy a crear el usuario en la bd 
            $this->refControladorPersistencia->get_conexion()->beginTransaction();
            $asistenteConsulta = $this->refControladorPersistencia->ejecutarSentencia(DBSentencias::MODIFICAR_ASISTENTE,$paramAsistente);//uso la sentencia para insertar un usuario en la base de datos
            
            $this->refControladorPersistencia->get_conexion()->commit();//si no hay errores realiza el comit a la bd correspondiente
            $modificado=$this->buscarAsistenteXId($datosCampos["id"]);            
            return $modificado;
        } catch (PDOException $excepcionPDO) {            
            echo "<br>Error PDO: ".$excepcionPDO->getTraceAsString().'<br>';
            $this->refControladorPersistencia->get_conexion()->rollBack();//si salio mal hace un rollback
        } catch (Exception $exc) {           
                echo $exc->getTraceAsString();
                $this->refControladorPersistencia->get_conexion()->rollBack();  //si hay algún error hace rollback
        }
        
    }

//put your code here
}
