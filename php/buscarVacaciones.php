<?php
	include("functions.php");
	
	$sql= "SELECT dni,nombre,apellidos FROM conductor WHERE vacaciones=false AND estado=true";
	
	$datos=ejecutaConsultaArray($sql);
	echo json_encode($datos);