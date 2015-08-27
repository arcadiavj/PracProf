/*
SQLyog Enterprise - MySQL GUI v7.13 
MySQL - 5.6.16 : Database - pracprof
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`pracprof` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `pracprof`;

/*Table structure for table `adelanto` */

DROP TABLE IF EXISTS `adelanto`;

CREATE TABLE `adelanto` (
  `id_adelanto` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_adelanto` varchar(50) NOT NULL,
  `fecha_adelanto` datetime NOT NULL,
  `monto_adelanto` decimal(10,2) NOT NULL,
  `id_caso` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_adelanto`),
  KEY `ADELANTO_CASO` (`id_caso`),
  KEY `ADELANTO_USUARIO` (`id_usuario`),
  CONSTRAINT `ADELANTO_CASO` FOREIGN KEY (`id_caso`) REFERENCES `caso` (`id_caso`),
  CONSTRAINT `ADELANTO_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `adelanto` */

/*Table structure for table `art` */

DROP TABLE IF EXISTS `art`;

CREATE TABLE `art` (
  `id_art` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_art` varchar(50) NOT NULL,
  `direccion_art` varchar(100) DEFAULT NULL,
  `detalle_art` varchar(50) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_art`),
  KEY `ART_USUARIO` (`id_usuario`),
  CONSTRAINT `ART_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `art` */

insert  into `art`(`id_art`,`nombre_art`,`direccion_art`,`detalle_art`,`id_usuario`,`fch_creacion`,`fch_modificacion`,`fch_baja`) values (1,'Prevención','Av. San Martín 1150 - Godoy Cruz',NULL,8,'2015-08-19 18:45:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Provincia','Don Bosco 12 - Ciudad',NULL,8,'2015-08-09 18:40:40','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Mapfre','San Lorenzo 138 - Ciudad',NULL,8,'2015-08-09 19:00:00','0000-00-00 00:00:00','2015-01-01 00:00:00');

/*Table structure for table `asistente` */

DROP TABLE IF EXISTS `asistente`;

CREATE TABLE `asistente` (
  `id_asistente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_asistente` varchar(50) NOT NULL,
  `apellido_asistente` varchar(50) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_asistente`),
  KEY `ASISTENTE_USUARIO` (`id_usuario`),
  CONSTRAINT `ASISTENTE_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `asistente` */

insert  into `asistente`(`id_asistente`,`nombre_asistente`,`apellido_asistente`,`id_usuario`,`fch_creacion`,`fch_modificacion`,`fch_baja`) values (1,'OSCAR','ARGUMEDO',8,'2015-08-05 17:40:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'CARLOS','GOMEZ',8,'2015-08-08 19:03:33','0000-00-00 00:00:00','0000-00-00 00:00:00');

/*Table structure for table `caso` */

DROP TABLE IF EXISTS `caso`;

CREATE TABLE `caso` (
  `id_caso` int(11) NOT NULL AUTO_INCREMENT,
  `inItinere_caso` bit(1) NOT NULL,
  `fechaAccidente_caso` datetime DEFAULT NULL,
  `salario_caso` decimal(10,0) NOT NULL,
  `fotocopiaDNI_caso` bit(1) NOT NULL,
  `firmaPoder_caso` bit(1) NOT NULL,
  `firmaPacto_caso` bit(1) NOT NULL,
  `estado_caso` varchar(50) DEFAULT NULL,
  `etapa_caso` varchar(50) DEFAULT NULL,
  `descripcion_caso` varchar(50) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_art` int(11) NOT NULL,
  `id_profesional` int(11) NOT NULL,
  `id_asistente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_caso`),
  KEY `CASO_ART` (`id_art`),
  KEY `CASO_PROFESIONAL` (`id_profesional`),
  KEY `CASO_ASISTENTE` (`id_asistente`),
  KEY `CASO_USUARIO` (`id_usuario`),
  KEY `CASO_CLIENTE` (`id_cliente`),
  CONSTRAINT `CASO_ART` FOREIGN KEY (`id_art`) REFERENCES `art` (`id_art`),
  CONSTRAINT `CASO_ASISTENTE` FOREIGN KEY (`id_asistente`) REFERENCES `asistente` (`id_asistente`),
  CONSTRAINT `CASO_CLIENTE` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `CASO_PROFESIONAL` FOREIGN KEY (`id_profesional`) REFERENCES `profesional` (`id_profesional`),
  CONSTRAINT `CASO_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `caso` */

insert  into `caso`(`id_caso`,`inItinere_caso`,`fechaAccidente_caso`,`salario_caso`,`fotocopiaDNI_caso`,`firmaPoder_caso`,`firmaPacto_caso`,`estado_caso`,`etapa_caso`,`descripcion_caso`,`id_cliente`,`id_art`,`id_profesional`,`id_asistente`,`id_usuario`,`fch_creacion`,`fch_modificacion`,`fch_baja`) values (1,'','2015-08-09 22:26:43','5000','','\0','','Comenzando','En Tratamiento','Cae de escalera y se quiebra el femur',2,1,1,1,8,'2015-08-09 22:26:43','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'','2014-12-24 23:59:00','5000','','','','Comenzando','En Tratamiento','Electrocución por morder cable',1,1,1,1,8,'2015-08-09 22:29:15','0000-00-00 00:00:00','0000-00-00 00:00:00');

/*Table structure for table `cliente` */

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(50) NOT NULL,
  `apellido_cliente` varchar(50) NOT NULL,
  `dni_cliente` int(8) NOT NULL,
  `direccion_cliente` varchar(100) DEFAULT NULL,
  `fecha_nacimiento_cliente` datetime DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_cliente`),
  KEY `CLIENTE_USUARIO` (`id_usuario`),
  CONSTRAINT `CLIENTE_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `cliente` */

insert  into `cliente`(`id_cliente`,`nombre_cliente`,`apellido_cliente`,`dni_cliente`,`direccion_cliente`,`fecha_nacimiento_cliente`,`id_usuario`,`fch_creacion`,`fch_modificacion`,`fch_baja`) values (1,'Lumpen','Guirao',40123321,'A. Bufano 3423 - Ciudad','2014-11-05 12:30:00',8,'2015-08-09 19:35:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Cande','Pizarro',25158244,'A. Bufano 3423 - Ciudad','1976-08-06 23:40:00',8,'2015-08-09 19:35:00','0000-00-00 00:00:00','0000-00-00 00:00:00');

/*Table structure for table `cobro` */

DROP TABLE IF EXISTS `cobro`;

CREATE TABLE `cobro` (
  `id_cobro` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_cobro` varchar(50) NOT NULL,
  `fecha_cobro` datetime NOT NULL,
  `monto_cobro` decimal(10,2) NOT NULL,
  `id_caso` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_cobro`),
  KEY `COBRO_CASO` (`id_caso`),
  KEY `COBRO_USUARIO` (`id_usuario`),
  CONSTRAINT `COBRO_CASO` FOREIGN KEY (`id_caso`) REFERENCES `caso` (`id_caso`),
  CONSTRAINT `COBRO_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cobro` */

/*Table structure for table `expediente` */

DROP TABLE IF EXISTS `expediente`;

CREATE TABLE `expediente` (
  `id_expte` int(11) NOT NULL AUTO_INCREMENT,
  `numero_expte` varchar(6) NOT NULL,
  `ano_expte` int(4) NOT NULL,
  `caratula_expte` varchar(100) NOT NULL,
  `id_caso` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_expte`),
  KEY `EXPEDIENTE_USUARIO` (`id_usuario`),
  KEY `EXPEDIENTE_CASO` (`id_caso`),
  CONSTRAINT `EXPEDIENTE_CASO` FOREIGN KEY (`id_caso`) REFERENCES `caso` (`id_caso`),
  CONSTRAINT `EXPEDIENTE_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `expediente` */

/*Table structure for table `llamada` */

DROP TABLE IF EXISTS `llamada`;

CREATE TABLE `llamada` (
  `id_llamada` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_llamada` varchar(200) NOT NULL,
  `fecha_llamada` datetime NOT NULL,
  `fechaProxima__llamada` datetime DEFAULT NULL,
  `estado_llamada` varchar(1) DEFAULT NULL,
  `tipo_llamada` varchar(1) DEFAULT NULL,
  `id_caso` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_llamada`),
  KEY `LLAMADA_CASO` (`id_caso`),
  KEY `LLAMADA_USUARIO` (`id_usuario`),
  CONSTRAINT `LLAMADA_CASO` FOREIGN KEY (`id_caso`) REFERENCES `caso` (`id_caso`),
  CONSTRAINT `LLAMADA_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `llamada` */

/*Table structure for table `pago` */

DROP TABLE IF EXISTS `pago`;

CREATE TABLE `pago` (
  `id_pago` int(11) NOT NULL AUTO_INCREMENT,
  `detalle_pago` int(11) NOT NULL,
  `fecha_pago` datetime NOT NULL,
  `monto_pago` decimal(10,2) NOT NULL,
  `id_caso` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_pago`),
  KEY `PAGO_CASO` (`id_caso`),
  KEY `PAGO_USUARIO` (`id_usuario`),
  CONSTRAINT `PAGO_CASO` FOREIGN KEY (`id_caso`) REFERENCES `caso` (`id_caso`),
  CONSTRAINT `PAGO_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `pago` */

/*Table structure for table `profesional` */

DROP TABLE IF EXISTS `profesional`;

CREATE TABLE `profesional` (
  `id_profesional` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_profesional` varchar(50) NOT NULL,
  `apellido_profesional` varchar(50) NOT NULL,
  `titulo_profesional` varchar(50) NOT NULL,
  `matricula_profesional` int(6) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_profesional`),
  KEY `PROFESIONAL_USUARIO` (`id_usuario`),
  CONSTRAINT `PROFESIONAL_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `profesional` */

insert  into `profesional`(`id_profesional`,`nombre_profesional`,`apellido_profesional`,`titulo_profesional`,`matricula_profesional`,`id_usuario`,`fch_creacion`,`fch_modificacion`,`fch_baja`) values (1,'MARCOS','TERK','ABOGADO',2335,8,'2015-08-14 16:55:33','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'VERONICA','REPARAS','ABOGADO',4321,8,'2015-08-10 17:30:00','0000-00-00 00:00:00','0000-00-00 00:00:00');

/*Table structure for table `telefono` */

DROP TABLE IF EXISTS `telefono`;

CREATE TABLE `telefono` (
  `id_telefono` int(11) NOT NULL AUTO_INCREMENT,
  `numero_telefono` varchar(15) NOT NULL,
  `propietario_telefono` varchar(20) DEFAULT NULL,
  `detalle_telefono` varchar(200) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_telefono`),
  KEY `TELEFONO_USUARIO` (`id_usuario`),
  KEY `TELEFONO_CLIENTE` (`id_cliente`),
  CONSTRAINT `TELEFONO_CLIENTE` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `TELEFONO_USUARIO` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `telefono` */

insert  into `telefono`(`id_telefono`,`numero_telefono`,`propietario_telefono`,`detalle_telefono`,`id_cliente`,`id_usuario`,`fch_creacion`,`fch_modificacion`,`fch_baja`) values (1,'155580706','CELULAR','Es de Claro',2,8,'2015-08-06 23:30:30','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'4495051','TRABAJO','De 16 a 20 hs',2,8,'2015-08-06 23:45:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'4223344','FIJO',NULL,1,8,'2015-08-05 16:40:56','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'155565758','CELULAR',NULL,1,8,'2015-08-05 17:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00');

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL,
  `apellido_usuario` varchar(50) NOT NULL,
  `usuario_usuario` varchar(15) NOT NULL,
  `clave_usuario` varchar(8) NOT NULL,
  `tipoAcceso_usuario` int(1) NOT NULL,
  `fch_creacion` datetime NOT NULL,
  `fch_modificacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fch_baja` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `usuario` */

insert  into `usuario`(`id_usuario`,`nombre_usuario`,`apellido_usuario`,`usuario_usuario`,`clave_usuario`,`tipoAcceso_usuario`,`fch_creacion`,`fch_modificacion`,`fch_baja`) values (8,'Emanuel','Guirao','flaco','123',1,'2015-08-09 18:40:30','0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,'Diego','Bilyk','diego','123',1,'2015-08-09 18:41:07','0000-00-00 00:00:00','0000-00-00 00:00:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
