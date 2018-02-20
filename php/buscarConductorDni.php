<?php

include("functions.php");

$dni=$_GET['dni'];

$sql="SELECT dni,nombre,apellidos,sexo,telefono,email,direccion, estado from conductor where dni='".$dni."';";


$resultset=ejecutaConsulta($sql);

$datos=$resultset->fetch(PDO::FETCH_ASSOC);

echo json_encode($datos);


?>