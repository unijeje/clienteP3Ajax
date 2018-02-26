<?php
include("functions.php");
header("Content-Type: text/xml"); //para tratar XML
$sql="SELECT id,horas,fecha,numpersonas, descripcion, origen, 
destino, kms, cliente, matricula_autobus, dni_conductor, localidad, estado from alquiler order by id desc;";

$resultset=ejecutaConsulta($sql);

$resultado='<?xml version="1.0" encoding="UTF-8"?>';
$resultado.='<alquileres>';


while ($fila = $resultset->fetch(PDO::FETCH_ASSOC))
{
    $resultado.='<alquiler>';
    $resultado.='<alquiler_id>'.$fila["id"].'</alquiler_id>';
    $resultado.='<horas>'.$fila["horas"].'</horas>';
    $resultado.='<fecha>'.$fila["fecha"].'</fecha>';
    $resultado.='<nump>'.$fila["numpersonas"].'</nump>';
    $resultado.='<descripcion>'.$fila["descripcion"].'</descripcion>';
    $resultado.='<origen>'.$fila["origen"].'</origen>';
    $resultado.='<destino>'.$fila["destino"].'</destino>';
    $resultado.='<kms>'.$fila["kms"].'</kms>';
    $resultado.='<cliente>'.$fila["cliente"].'</cliente>';
    $resultado.='<matricula_autobus>'.$fila["matricula_autobus"].'</matricula_autobus>';
    $resultado.='<dni_conductor>'.$fila["dni_conductor"].'</dni_conductor>';
    $resultado.='<localidad>'.$fila["localidad"].'</localidad>';
    $resultado.='<estado>'.$fila["estado"].'</estado>';
    $resultado.='</alquiler>';
}

$resultado.='</alquileres>';

echo $resultado;

?>
