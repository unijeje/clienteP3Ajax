<?php
	include("functions.php");

	$sql="SELECT c.dni,c.nombre,c.apellidos,v.fecha_ini,v.fecha_fin,v.descripcion,v.estado from conductor c, vacaciones v where c.dni=v.dni_conductor;";

	$datos=ejecutaConsultaArray($sql);

	echo json_encode($datos);
?>