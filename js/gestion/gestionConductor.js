function altaConductor(oEvento){
	var oE= oEvento || windows.event;
	var formAltaConductor=oE.target.parentNode.parentNode.parentNode;
	
	if(validarConductor(formAltaConductor)){
		var dniConductor= frmConductorAlta.txtConductorDni.value.trim();
		var nombreConductor= frmConductorAlta.txtConductorNombre.value.trim();
		var apellidosConductor= frmConductorAlta.txtConductorApellidos.value.trim();
		var sexoConductor= frmConductorAlta.radioConductorSexo.value;
		var tlfConductor= frmConductorAlta.txtConductorTelefono.value.trim();
		var emailConductor= frmConductorAlta.txtConductorCorreo.value.trim();
		var direccionConductor= frmConductorAlta.txtConductorDireccion.value.trim();
		
		var oConductor= new Conductor(dniConductor,nombreConductor,apellidosConductor,sexoConductor,tlfConductor,emailConductor,direccionConductor,true);
		
		oGestion.altaConductor(oConductor);
	}	

}


function validarConductor(formAltaConductor){
	var bValido= true;
	
	//campo dni conductor
	var dniConductor= formAltaConductor.txtConductorDni.value.trim();
	formAltaConductor.txtConductorDni.value= formAltaConductor.txtConductorDni.value.trim();
	
	if(!oExpRegDni.test(dniConductor)){
		formAltaConductor.txtConductorDni.parentNode.parentNode.classList.add("has-error");
		formAltaConductor.txtConductorDni.focus();
		error= "El DNI tiene que ser 8 caracteres númericos y uno alfabético";
		falloValidacion(error, formAltaConductor.txtConductorDni);
		bValido= false;
	} else{
		formAltaConductor.txtConductorDni.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formAltaConductor.txtConductorDni);
	}
	
	//campo nombre conductor
	var nombreConductor= formAltaConductor.txtConductorNombre.value.trim();
	formAltaConductor.txtConductorNombre.value= formAltaConductor.txtConductorNombre.value.trim();
	
	if(!oExpRegNombre.test(nombreConductor)){
		formAltaConductor.txtConductorNombre.parentNode.parentNode.classList.add("has-error");
		formAltaConductor.txtConductorNombre.focus();
		error= "El nombre tiene que ser entre 3 y 20 carácteres alfabéticos";
		falloValidacion(error, formAltaConductor.txtConductorNombre);
		bValido= false;
	} else{
		formAltaConductor.txtConductorNombre.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formAltaConductor.txtConductorNombre);
	}
	
	//campo apellidos conductor
	var apellidosConductor= formAltaConductor.txtConductorApellidos.value.trim();
	formAltaConductor.txtConductorApellidos.value= formAltaConductor.txtConductorApellidos.value.trim();
	
	if(!oExpRegApellidos.test(apellidosConductor)){
		formAltaConductor.txtConductorApellidos.parentNode.parentNode.classList.add("has-error");
		formAltaConductor.txtConductorApellidos.focus();
		error= "El Apellido tiene que ser entre 3 y 20 carácteres alfabéticos";
		falloValidacion(error, formAltaConductor.txtConductorApellidos);
		bValido= false;
	} else{
		formAltaConductor.txtConductorApellidos.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formAltaConductor.txtConductorApellidos);
	}
	
	if(!validarRadio(formAltaConductor.radioConductorSexo))
	{
		formAltaConductor.radioConductorSexo[0].parentNode.parentNode.classList.add("has-error");
		error= "Debe seleccionar un género";
		bValido=false;
		falloValidacion(error, formAltaConductor.radioConductorSexo[0].parentNode);
	}
	else {
		formAltaConductor.radioConductorSexo[0].parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formAltaConductor.radioConductorSexo[0].parentNode);
	}
	
	//campo telefono conductor
	var tlfConductor= formAltaConductor.txtConductorTelefono.value.trim();
	formAltaConductor.txtConductorTelefono.value= formAltaConductor.txtConductorTelefono.value.trim();
	
	if(!oExpRegTelefono.test(tlfConductor)){
		formAltaConductor.txtConductorTelefono.parentNode.parentNode.classList.add("has-error");
		formAltaConductor.txtConductorTelefono.focus();
		error= "El Telefono no es correcto";
		falloValidacion(error, formAltaConductor.txtConductorTelefono);
		bValido= false;
	} else{
		formAltaConductor.txtConductorTelefono.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formAltaConductor.txtConductorTelefono);
	}
	
	//campo email conductor
	var emailConductor= formAltaConductor.txtConductorCorreo.value.trim();
	formAltaConductor.txtConductorCorreo.value= formAltaConductor.txtConductorCorreo.value.trim();
	
	if(!oExpRegCorreo.test(emailConductor)){
		formAltaConductor.txtConductorCorreo.parentNode.parentNode.classList.add("has-error");
		formAltaConductor.txtConductorCorreo.focus();
		error= "El email no es correcto";
		falloValidacion(error, formAltaConductor.txtConductorCorreo);
		bValido= false;
	} else{
		formAltaConductor.txtConductorCorreo.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formAltaConductor.txtConductorCorreo);
	}
	
	//campo Direccion
	var direccionConductor= formAltaConductor.txtConductorDireccion.value.trim();
	formAltaConductor.txtConductorDireccion.value= formAltaConductor.txtConductorDireccion.value.trim();
		
	if(direccionConductor==""){
		formAltaConductor.txtConductorDireccion.parentNode.parentNode.classList.add("has-error");
		formAltaConductor.txtConductorDireccion.focus();
		error= "Escriba una direccion";
		falloValidacion(error, formAltaConductor.txtConductorDireccion);
		bValido= false;
	} else{
		formAltaConductor.txtConductorDireccion.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formAltaConductor.txtConductorDireccion);
	}
	
	return bValido;
}

function bajaConductor()
{

}

function modificarConductor()
{

}

function rellenaCamposConductor()
{

}

function altaVacacion()
{

}

function bajaVacacion()
{

}

function modificaVacacion()
{
	
}
