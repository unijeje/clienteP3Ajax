<?php
	include("functions.php");
	
	$dni=$_POST['datos'];
	$sql= "UPDATE vacaciones SET estado=false WHERE dni_conductor='".$dni."'";
	
	$resultset= ejecutaConsultaAccion($sql);
	
	if($resultset > 0){
		echo "Exito";
	} else{
		echo "Error";
	}
?>