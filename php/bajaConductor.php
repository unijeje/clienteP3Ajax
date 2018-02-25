<?php
	include("functions.php");
	
	$dni= json_decode($_POST["datos"]);
	$sql= "UPDATE conductor SET estado=false WHERE dni='".$dni."'";
	
	$resultset= ejecutaConsultaAccion($sql);
	
	if($resultset > 0){
		echo "Exito";
	} else{
		echo "Error";
	}
?>