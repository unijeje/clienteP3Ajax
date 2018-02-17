<?php
include("functions.php");

$nombre=$_GET['nombre'];

$sql="SELECT dni,nombre,apellidos,telefono,correo,sexo,estado from cliente where nombre like '%".$nombre."%' ;";

$datos=ejecutaConsultaArray($sql);

echo json_encode($datos);


?>
