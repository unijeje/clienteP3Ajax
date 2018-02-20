<?php

include("functions.php");


$sql="SELECT dni, nombre, apellidos from conductor where estado=true;";

//echo $sql;

$datos=ejecutaConsultaArray($sql);


echo json_encode($datos);


?>