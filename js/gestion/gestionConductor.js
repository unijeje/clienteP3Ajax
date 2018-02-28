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

function bajaConductor(oEvento){
	var oE= oEvento || windows.event;
	var formBajaConductor=oE.target.parentNode.parentNode.parentNode;
	
	var dniConductor= formBajaConductor.txtConductorDni.value.trim();
	var oConductor= oGestion.buscarConductor(dniConductor);
	
	if(oConductor==null)
        mensaje("Conductor con el DNI: "+dniConductor+" no encontrado");
    else if(oConductor.estado==false)
        mensaje("Ese conductor ya ha sido dado de baja");
    else
    {
        var bBaja=oGestion.bajaConductor(oConductor);
        if(bBaja)
        {
            mensaje("Conductor "+dniConductor+" dado de baja correctamente");
            document.frmConductorBaja.reset();
            document.frmConductorBaja.style.display="none";
            buscarClientes();
        }
        else
            mensaje("Error al dar de baja: "+dniConductor);
            
    }
}

function modificarConductor(oEvento){
	var oE = oEvento || windows.event;
	var frmModificar=oE.target.parentNode.parentNode.parentNode;
	
	if(validarConductor(frmModificar)){
		var dniConductor= frmConductorModificar.txtConductorDni.value.trim();
		var nombreConductor= frmConductorModificar.txtConductorNombre.value.trim();
		var apellidosConductor= frmConductorModificar.txtConductorApellidos.value.trim();
		var sexoConductor= frmConductorModificar.radioConductorSexo.value;
		var tlfConductor= frmConductorModificar.txtConductorTelefono.value.trim();
		var emailConductor= frmConductorModificar.txtConductorCorreo.value.trim();
		var direccionConductor= frmConductorModificar.txtConductorDireccion.value.trim();
		
		var oNuevoConductor= new Conductor(dniConductor,nombreConductor,apellidosConductor,sexoConductor,tlfConductor,emailConductor,direccionConductor);
		var datos= "datos="+JSON.stringify(oNuevoConductor);
		
		$.post("php/modificarConductor.php",datos,respuestaConductor,"json");
	}
}

function altaVacaciones(oEvento){
	var oE = oEvento || windows.event;
	var formVacaciones=oE.target.parentNode.parentNode.parentNode; //console.log(formVacaciones);
			
	var dniConductor= formVacaciones.txtVacacionConductor.value.trim();
	var descripcion= formVacaciones.descripcion.value.trim();
	var fechaInicio= formVacaciones.fechaInicio.value.trim();
	var fechaFin= formVacaciones.fechaFinal.value.trim();
	var fechaInicioParaComprobar= new Date(formVacaciones.fechaInicio.value.trim());
	var fechaFinParaComprobar= new Date(formVacaciones.fechaFinal.value.trim());
		
	if(validarVacaciones(formVacaciones)){		
		if(fechaFinParaComprobar-fechaInicioParaComprobar>=0){
			var oVacaciones= new Vacaciones(dniConductor,fechaInicio,fechaFin,descripcion,true);
			
			formVacaciones.fechaInicio.parentNode.parentNode.classList.remove("has-error");
			formVacaciones.fechaFinal.parentNode.parentNode.classList.remove("has-error");
			falloValidacion("", formVacaciones.fechaInicio);
			falloValidacion("", formVacaciones.fechaFinal);
			
			if(oGestion.buscarConductor(dniConductor)){
				if(oGestion.buscarVacacion(dniConductor)==true){
					mensaje("Ese conductor ya tiene vacaciones");
					document.formVacaciones.reset();
					document.formVacaciones.style.display="none";
				} else{
					oGestion.altaVacaciones(oVacaciones);
				}
			} else{
				mensaje("No existe ese conductor");
				document.formVacaciones.reset();
				document.formVacaciones.style.display="none";
			}
		} else{
			formVacaciones.fechaInicio.parentNode.parentNode.classList.add("has-error");
			formVacaciones.fechaFinal.parentNode.parentNode.classList.add("has-error");
			formVacaciones.fechaInicio.focus();
			formVacaciones.fechaFinal.focus();
			var error= "Rango de fechas incorrecto";
			falloValidacion(error, formVacaciones.fechaInicio);
			falloValidacion(error, formVacaciones.fechaFinal);
		}
	}
}

function bajaVacaciones(oEvento){
	var oE = oEvento || windows.event;
	var formVacaciones=oE.target.parentNode.parentNode.parentNode;
	
	var dniConductor= formVacaciones.txtVacacionConductor.value.trim();
	var oVacaciones= oGestion.buscarDatosVacacion(dniConductor);
	
	if(oVacaciones==null){
		mensaje("Vacaciones no encontradas");
	} else if(oVacaciones.estado==false){
		mensaje("Esas vacaciones ya han sido dadas de baja");
	} else{
		var bBaja= oGestion.bajaVacaciones(oVacaciones);
		
		if(bBaja){
			mensaje("Vacaciones del conductor "+dniConductor+" dadas de baja correctamente");
			document.frmBajaDeVacaciones.reset();
            document.frmBajaDeVacaciones.style.display="none";
            buscarVacaciones();
        }
        else
            mensaje("Error al dar de baja vacaciones: "+dniConductor);
	}
}

function modificarVacaciones(oEvento){
	var oE = oEvento || windows.event;
	var formVacaciones=oE.target.parentNode.parentNode.parentNode;
	
	var dniConductor= formVacaciones.txtVacacionConductor.value.trim();
	var descripcion= formVacaciones.descripcion.value.trim();
	var fechaInicio= formVacaciones.fechaIni.value.trim();
	var fechaFin= formVacaciones.fechaFin.value.trim();
	var fechaInicioParaComprobar= new Date(formVacaciones.fechaIni.value.trim());
	var fechaFinParaComprobar= new Date(formVacaciones.fechaFin.value.trim());
		
	if(validarVacacionesModificar(formVacaciones)){		
		if(fechaFinParaComprobar-fechaInicioParaComprobar>=0){
			var oNuevaVacaciones= new Vacaciones(dniConductor,fechaInicio,fechaFin,descripcion);
			
			formVacaciones.fechaIni.parentNode.parentNode.classList.remove("has-error");
			formVacaciones.fechaFin.parentNode.parentNode.classList.remove("has-error");
			falloValidacion("", formVacaciones.fechaIni);
			falloValidacion("", formVacaciones.fechaFin);
			
			var datos= "datos="+JSON.stringify(oNuevaVacaciones);
		
			$.post("php/modificaVacaciones.php",datos,respuestaVacaciones,"json");
		} else{
			formVacaciones.fechaIni.parentNode.parentNode.classList.add("has-error");
			formVacaciones.fechaFin.parentNode.parentNode.classList.add("has-error");
			formVacaciones.fechaIni.focus();
			formVacaciones.fechaFin.focus();
			var error= "Rango de fechas incorrecto";
			falloValidacion(error, formVacaciones.fechaIni);
			falloValidacion(error, formVacaciones.fechaFin);
		}
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

function respuestaConductor(oDatosDevuelto, sStatus, oAjax){
	if(oDatosDevuelto[0]){
		document.frmConductorModificar.reset();
        document.frmConductorModificar.style.display="none";
		mensaje(oDatosDevuelto[1]);
		buscarConductores();
		buscarVacacionesActivas();
		buscarVacaciones();
	}
}

function respuestaVacaciones(oDatosDevuelto, sStatus, oAjax){
	if(oDatosDevuelto[0]){
		document.frmModificarVacaciones.reset();
        document.frmModificarVacaciones.style.display="none";
		mensaje(oDatosDevuelto[1]);
		buscarVacaciones();
		buscarVacacionesActivas();
	}
}

function validarVacaciones(formVacaciones){
	var bValido= true;
	
	//fecha inicio
	var fechaInicio= formVacaciones.fechaInicio.value.trim();
	formVacaciones.fechaInicio.value= formVacaciones.fechaInicio.value.trim();
	
	if(fechaInicio==""){
		formVacaciones.fechaInicio.parentNode.parentNode.classList.add("has-error");
		formVacaciones.fechaInicio.focus();
		error= "Seleccione una fecha de inicio";
		falloValidacion(error, formVacaciones.fechaInicio);
	} else{
		formVacaciones.fechaInicio.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formVacaciones.fechaInicio);
	}
	
	//fecha fin
	var fechaFin= formVacaciones.fechaFinal.value.trim();
	formVacaciones.fechaFinal.value= formVacaciones.fechaFinal.value.trim();
	
	if(fechaFin==""){
		formVacaciones.fechaFinal.parentNode.parentNode.classList.add("has-error");
		formVacaciones.fechaFinal.focus();
		error= "Seleccione una fecha fin";
		falloValidacion(error, formVacaciones.fechaFinal);
	} else{
		formVacaciones.fechaFinal.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formVacaciones.fechaFinal);
	}
	
	/*rango de fechas
	if(fechaInicio!="" && fechaFin!=""){
		if((fechaFin-fechaInicio)>=0){			
			formVacaciones.fechaFin.parentNode.parentNode.classList.remove("has-error");
			falloValidacion("", formVacaciones.fechaFin);
		} else{
			formVacaciones.fechaFin.parentNode.parentNode.classList.add("has-error");
			formVacaciones.fechaFin.focus();
			error= "Rango de fechas incorrecto";
			falloValidacion(error, formVacaciones.fechaFin);
		}*/
	//}
	
	//descripcion
	var descripcionVacaciones= formVacaciones.descripcion.value.trim();
	formVacaciones.descripcion.value= formVacaciones.descripcion.value.trim();
		
	if(descripcionVacaciones==""){
		formVacaciones.descripcion.parentNode.parentNode.classList.add("has-error");
		formVacaciones.descripcion.focus();
		error= "Escriba el motivo de las vacaciones";
		falloValidacion(error, formVacaciones.descripcion);
		bValido= false;
	} else{
		formVacaciones.descripcion.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formVacaciones.descripcion);
	}
	
	return bValido;
}

function validarVacacionesModificar(formVacaciones){
	var bValido= true;
	
	//fecha inicio
	var fechaInicio= formVacaciones.fechaIni.value.trim();
	formVacaciones.fechaIni.value= formVacaciones.fechaIni.value.trim();
	
	if(fechaInicio==""){
		formVacaciones.fechaIni.parentNode.parentNode.classList.add("has-error");
		formVacaciones.fechaIni.focus();
		error= "Seleccione una fecha de inicio";
		falloValidacion(error, formVacaciones.fechaIni);
	} else{
		formVacaciones.fechaIni.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formVacaciones.fechaIni);
	}
	
	//fecha fin
	var fechaFinal= formVacaciones.fechaFin.value.trim();
	formVacaciones.fechaFin.value= formVacaciones.fechaFin.value.trim();
	
	if(fechaFinal==""){
		formVacaciones.fechaFin.parentNode.parentNode.classList.add("has-error");
		formVacaciones.fechaFin.focus();
		error= "Seleccione una fecha fin";
		falloValidacion(error, formVacaciones.fechaFin);
	} else{
		formVacaciones.fechaFin.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formVacaciones.fechaFin);
	}
	
	/*rango de fechas
	if(fechaInicio!="" && fechaFin!=""){
		if((fechaFin-fechaInicio)>=0){			
			formVacaciones.fechaFin.parentNode.parentNode.classList.remove("has-error");
			falloValidacion("", formVacaciones.fechaFin);
		} else{
			formVacaciones.fechaFin.parentNode.parentNode.classList.add("has-error");
			formVacaciones.fechaFin.focus();
			error= "Rango de fechas incorrecto";
			falloValidacion(error, formVacaciones.fechaFin);
		}*/
	//}
	
	//descripcion
	var descripcionVacaciones= formVacaciones.descripcion.value.trim();
	formVacaciones.descripcion.value= formVacaciones.descripcion.value.trim();
		
	if(descripcionVacaciones==""){
		formVacaciones.descripcion.parentNode.parentNode.classList.add("has-error");
		formVacaciones.descripcion.focus();
		error= "Escriba el motivo de las vacaciones";
		falloValidacion(error, formVacaciones.descripcion);
		bValido= false;
	} else{
		formVacaciones.descripcion.parentNode.parentNode.classList.remove("has-error");
		falloValidacion("", formVacaciones.descripcion);
	}
	
	return bValido;
}

function rellenaCamposConductor(oEvento){ //actualiza campos usando el dni del campo txtConductorDni del formulario del que se le ha enviado
    var oE = oEvento || window.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el combo
    
    var oConductor=oGestion.buscarConductor(oForm.txtConductorDni.value);//recupera el conductor a traves del DNI
    //console.log(oForm);
    if(oConductor){
		oForm.txtConductorNombre.value=oConductor.nombre;
		oForm.txtConductorApellidos.value=oConductor.apellidos;    
		oForm.radioConductorSexo.value=oConductor.sexo;
		oForm.txtConductorTelefono.value=oConductor.tlf;
		oForm.txtConductorCorreo.value=oConductor.email;
		oForm.txtConductorDireccion.value= oConductor.direccion;
    } else{
        mensaje("No se encuentra ese DNI");
       
		oForm.txtConductorNombre.value="";
		oForm.txtConductorApellidos.value="";   
		oForm.radioConductorSexo.value="";
		oForm.txtConductorTelefono.value=""; 
		oForm.txtConductorCorreo.value="";
		oForm.txtConductorDireccion.value="";
    }    
}

function rellenaCamposModificarVacaciones(oEvento){
	var oE = oEvento || windows.event;
	var formVacaciones= oE.target.parentNode.parentNode.parentNode;
	var oVacaciones= oGestion.buscarDatosVacacion(formVacaciones.txtVacacionConductor.value);
	
	if(oVacaciones){
		formVacaciones.fechaIniAntigua.value= oVacaciones.fechaIni;
		formVacaciones.fechaFinAntigua.value= oVacaciones.fechaFin;
		formVacaciones.descripcion.value= oVacaciones.descripcion;
	} else{
		mensaje("No se encuentran vacaciones para este conductor");
		
		formVacaciones.fechaIni.value= "";
		formVacaciones.fechaFin.value= "";
		formVacaciones.descripcion.value= "";
	}
}

function rellenaCamposBajaVacaciones(oEvento){
	var oE = oEvento || windows.event;
	var formVacaciones= oE.target.parentNode.parentNode.parentNode;
	var oVacaciones= oGestion.buscarDatosVacacion(formVacaciones.txtVacacionConductor.value);
	
	if(oVacaciones){
		formVacaciones.fechaIni.value= oVacaciones.fechaIni;
		formVacaciones.fechaFin.value= oVacaciones.fechaFin;
		formVacaciones.descripcion.value= oVacaciones.descripcion;
	} else{
		mensaje("No se encuentran vacaciones para este conductor");
		
		formVacaciones.fechaIni.value= "";
		formVacaciones.fechaFin.value= "";
		formVacaciones.descripcion.value= "";
	}
}