<?php

include("functions.php");

$dni=$_GET['dni'];

$sql="SELECT dni,nombre,apellidos,telefono,correo,sexo,estado from cliente where dni='".$dni."';";


$resultset=ejecutaConsulta($sql);

$datos=$resultset->fetch(PDO::FETCH_ASSOC);

echo json_encode($datos);


?>