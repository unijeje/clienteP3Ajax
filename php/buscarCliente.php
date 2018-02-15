<?php

include("functions.php");

$dni=$_GET['datos'];

$sql="SELECT dni,nombre,apellidos,telefono,correo,sexo from cliente;";

//echo $sql;

$datos=ejecutaConsultaArray($sql);

echo json_encode($datos);


?>