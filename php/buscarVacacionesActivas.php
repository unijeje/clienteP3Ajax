<?php
	include("functions.php");
	
	$sql= "SELECT c.dni,c.nombre,c.apellidos FROM conductor c, vacaciones v WHERE c.dni=v.dni_conductor AND v.estado=true and c.estado=true";
	
	$datos=ejecutaConsultaArray($sql);
	echo json_encode($datos);
	
?>