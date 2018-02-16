<?php

include("functions.php");


$sql="SELECT dni from cliente;";

//echo $sql;

$datos=ejecutaConsultaArray($sql);


echo json_encode($datos);


?>