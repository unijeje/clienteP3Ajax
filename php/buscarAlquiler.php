<?php

include("functions.php");

$sql="SELECT id,fecha,cliente from alquiler where estado=true;";


$datos=ejecutaConsultaArray($sql);


echo json_encode($datos);

?>