<?php
include("functions.php");

$sql="SELECT dni,nombre,apellidos,telefono,correo,sexo,estado from cliente ;";

$datos=ejecutaConsultaArray($sql);

echo json_encode($datos);


?>
