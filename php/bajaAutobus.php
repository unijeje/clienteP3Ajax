<?php
include("functions.php");

/*$matricula=$_POST["matricula"];
$asientos=$_POST["asientos"];
$modelo=$_POST["modelo"];
$consumo=$_POST["consumo"];*/
$autobus=json_decode($_POST["autobus"]);

$update="UPDATE autobus set estado=1 where matricula='".$autobus->matricula."'";
//$sql="INSERT INTO autobus values('AAAA', 3, 'GGGGG', 4, 1) ;";
//echo $sql;
$sql="SELECT * from autobus where matricula='".$autobus->matricula."' and estado=0";
$miconexion=connectDB();

if(ejecutaConsultaAccion($sql) > 0)

   //existe en la base de datos
    if(ejecutaConsultaAccion($update) > 0)
    	$mensaje="Autobus dado de baja correctamente en la base de datos";
    else
    	$mensaje="Fallo al dar de baja al autobus en la base de datos";

else
    $mensaje="No se encuentra autobus con esa matricula en la base de datos"; 


echo json_encode($mensaje);
//echo(ejecutaConsultaAccion($sql));
?>