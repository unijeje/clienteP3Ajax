<?php

include("functions.php");


$sql="SELECT dni, nombre, apellidos from cliente where estado=true;";

//echo $sql;

$datos=ejecutaConsultaArray($sql);


echo json_encode($datos);


?>