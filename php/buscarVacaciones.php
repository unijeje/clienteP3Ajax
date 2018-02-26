<?php
	include("functions.php");
	
	$sql= "SELECT c.dni,c.nombre,c.apellidos FROM conductor c,vacaciones v WHERE c.dni=v.dni AND v.estado=false";
	
	$resultset= ejecutaConsulta($sql);
	
	$datos=$resultset->fetch(PDO::FETCH_ASSOC);

	echo json_encode($datos);
?>