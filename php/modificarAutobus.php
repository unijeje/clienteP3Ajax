<?php
include("functions.php");

$autobus=json_decode($_POST["autobus"]);
$resultado=false;

$update="UPDATE autobus set asientos='".$autobus->asientos."', modelo='".$autobus->modelo."', consumo='".$autobus->consumo."'  where matricula='".$autobus->matricula."'";
//$sql="INSERT INTO autobus values('AAAA', 3, 'GGGGG', 4, 1) ;";
//echo $sql;
$sql="SELECT * from autobus where matricula='".$autobus->matricula."' ";


if(ejecutaConsultaAccion($sql) > 0)

   //existe en la base de datos
    if(ejecutaConsultaAccion($update) > 0){
    	$mensaje="Autobus modificado correctamente en la base de datos";
    	$resultado=true;
    }
    else
    	$mensaje="Fallo al modificar el autobus";

else
    $mensaje="No se encuentra autobus con esa matricula en la base de datos"; 

$datos=[];
$datos[]=$resultado;
$datos[]=$mensaje;
echo json_encode($datos);
//echo(ejecutaConsultaAccion($sql));
?>