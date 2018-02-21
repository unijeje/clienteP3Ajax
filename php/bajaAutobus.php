<?php
include("functions.php");

/*$matricula=$_POST["matricula"];
$asientos=$_POST["asientos"];
$modelo=$_POST["modelo"];
$consumo=$_POST["consumo"];*/
$autobus=json_decode($_POST["autobus"]);
$resultado=false;

$update="UPDATE autobus set estado=0 where matricula='".$autobus->matricula."'";
//$sql="INSERT INTO autobus values('AAAA', 3, 'GGGGG', 4, 1) ;";
//echo $sql;
$sql="SELECT * from autobus where matricula='".$autobus->matricula."' ";
//$miconexion=connectDB();

if(ejecutaConsultaAccion($sql) > 0)

   //existe en la base de datos
    if(ejecutaConsultaAccion($update) > 0){
    	$mensaje="Autobus dado de baja correctamente en la base de datos";
    	$resultado=true;
    }
    else
    	$mensaje="El autobus introducido ya esta dado de baja";

else
    $mensaje="No se encuentra autobus con esa matricula en la base de datos"; 

$datos=[];
$datos[]=$resultado;
$datos[]=$mensaje;
echo json_encode($datos);
//echo(ejecutaConsultaAccion($sql));
?>