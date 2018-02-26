<?php
	include("functions.php");

	$sql="SELECT dni,nombre,apellidos,sexo,telefono,email,direccion,estado from conductor ;";

	$datos=ejecutaConsultaArray($sql);

	echo json_encode($datos);
?>
