<?php

include("functions.php");


$sql="SELECT matricula, modelo, asientos from autobus where estado=true and itv=false";

//echo $sql;

$datos=ejecutaConsultaArray($sql);


echo json_encode($datos);


?>