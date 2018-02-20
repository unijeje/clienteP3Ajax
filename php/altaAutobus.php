<?php
include("functions.php");

/*$matricula=$_POST["matricula"];
$asientos=$_POST["asientos"];
$modelo=$_POST["modelo"];
$consumo=$_POST["consumo"];*/
$autobus=json_decode($_POST["autobus"]);

$insert="INSERT INTO autobus values('".$autobus->matricula."', ".$autobus->asientos.", '".$autobus->modelo."', ".$autobus->consumo.", 0,0) ;";
//$sql="INSERT INTO autobus values('AAAA', 3, 'GGGGG', 4, 1) ;";
//echo $sql;
$sql="SELECT * from autobus where matricula='".$autobus->matricula."'";
$miconexion=connectDB();

if(ejecutaConsultaAccion($sql) > 0)
{
    $mensaje="Ya existe un autobus con esa matricula en la base de datos";
}
else{
    if(ejecutaConsultaAccion($insert) > 0)
    	$mensaje="Autobus introducido correctamente en la base de datos";
    else
    	$mensaje="Fallo al introducir el autobus en la base de datos";
}

echo json_encode($mensaje);
//echo(ejecutaConsultaAccion($sql));
?>