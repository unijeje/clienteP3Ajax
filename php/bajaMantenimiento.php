<?php
include("functions.php");

/*$matricula=$_POST["matricula"];
$asientos=$_POST["asientos"];
$modelo=$_POST["modelo"];
$consumo=$_POST["consumo"];*/
$mantenimiento=json_decode($_POST["mantenimiento"]);
$resultado=false;

$update="UPDATE mantenimiento set estado=0 where matricula_autobus='".$mantenimiento->matriculaAutobus."'";
$update2="UPDATE autobus set itv=0 where matricula='".$mantenimiento->matriculaAutobus."'";
//$sql="INSERT INTO autobus values('AAAA', 3, 'GGGGG', 4, 1) ;";
//echo $sql;
$sql="SELECT * from mantenimiento where matricula_autobus='".$mantenimiento->matriculaAutobus."'";
//$miconexion=connectDB();
$fila=ejecutaConsulta2($sql);
if($fila > 0)

   //existe en la base de datos
    if(ejecutaConsultaAccion($update) > 0){
    	if(ejecutaConsultaAccion($update2) > 0){
	    	$mensaje="Mantenimiento dado de baja correctamente en la base de datos";
	    	$resultado=true;
    	}
	}
    else
    	$mensaje="El mantenimiento introducido ya esta dado de baja";
else
   $mensaje="No se encuentra mantenimiento con esa matricula"; 

$datos=[];
$datos[]=$resultado;
$datos[]=$mensaje;
echo json_encode($datos);
//echo(ejecutaConsultaAccion($sql));
?>