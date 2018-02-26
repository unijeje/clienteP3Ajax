<?php

include("functions.php");


$sql="SELECT nombre from localidad;";

//echo $sql;

$datos=ejecutaConsultaArray($sql);


echo json_encode($datos);


?>