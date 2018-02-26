<?php
include("functions.php");

$sDatos = $_REQUEST["datos"];
$oDatos = json_decode($sDatos); //convertir en objeto de cadena

$sql="INSERT INTO alquiler values('".$oDatos->id."', '".$oDatos->horas."', '".$oDatos->fecha."', '".$oDatos->numPers."',
             '".$oDatos->descripcion."','".$oDatos->origen."','".$oDatos->destino."','".$oDatos->kms."','".$oDatos->cliente."',
             '".$oDatos->autobus."','".$oDatos->conductor."', '".$oDatos->localidad."', true) ;";

//echo $sql;

echo(ejecutaConsultaAccion($sql));
?>