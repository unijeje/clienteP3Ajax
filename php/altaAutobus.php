<?php
include("functions.php");

/*$matricula=$_POST["matricula"];
$asientos=$_POST["asientos"];
$modelo=$_POST["modelo"];
$consumo=$_POST["consumo"];*/
$autobus=json_decode($_POST["autobus"]);
$resultado=false;

$insert="INSERT INTO autobus values('".$autobus->matricula."', ".$autobus->asientos.", '".$autobus->modelo."', ".$autobus->consumo.", 0,1) ;";
//$sql="INSERT INTO autobus values('AAAA', 3, 'GGGGG', 4, 1) ;";
//echo $sql;
//$sql="SELECT * from autobus where matricula='".$autobus->matricula."'";
/*$miconexion=connectDB();

if(ejecutaConsultaAccion($sql) > 0)
{
    $mensaje="Ya existe un autobus con esa matricula en la base de datos";
}
else{*/
    if(ejecutaConsultaAccion($insert) > 0){
    	$mensaje="Autobus introducido correctamente en la base de datos";
    	$resultado=true;
    }
    else
    	$mensaje="Ya existe un autobus con esa matricula en la base de datos";

$datos=[];
$datos[]=$resultado;
$datos[]=$mensaje;
echo json_encode($datos);
//echo(ejecutaConsultaAccion($sql));
?>