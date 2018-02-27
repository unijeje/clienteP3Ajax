<?php
	include("functions.php");
	
	$sql= "SELECT c.dni,c.nombre,c.apellidos FROM conductor c
	LEFT JOIN vacaciones v ON (c.dni = v.dni_conductor)
	WHERE (v.dni_conductor is null or v.estado=false) 
	and c.estado=true";
	
	$datos=ejecutaConsultaArray($sql);
	echo json_encode($datos);
	
?>