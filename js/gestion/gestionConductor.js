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
		
		var oConductor= new Conductor(dniConductor,nombreConductor,apellidosConductor,sexoConductor,tlfConductor,emailConductor,direccionConductor,true,false);
		
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
	
	if(validarVacaciones(formVacaciones)){		
		var dniConductor= frmAltaDeVacaciones.txtVacacionConductor.value.trim();
		var descripcion= frmAltaDeVacaciones.descripcion.value.trim();
		var fechaInicio= frmAltaDeVacaciones.fechaIni.value.trim();
		var fechaFin= frmAltaDeVacaciones.fechaFin.value.trim();
		
		var oVacaciones= new Vacaciones(dniConductor,fechaInicio,fechaFin,descripcion,true);
		oGestion.altaVacaciones(oVacaciones);
	}
}

function bajaVacaciones(){

}

function modificarVacaciones(){
	
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
	}
}

function validarVacaciones(formVacaciones){
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
	var fechaFin= formVacaciones.fechaFin.value.trim();
	formVacaciones.fechaFin.value= formVacaciones.fechaFin.value.trim();
	
	if(fechaFin==""){
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
		oForm.txtConductorTelefono.value=oConductor.telefono;
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
	var oConductor= oGestion.buscarVacaciones(formVacaciones.comboConductorVacaciones.value);
	
	formVacaciones.fechaIni.value= oConductor.fechaIni;
	formVacaciones.fechaFin.value= oConductor.fechaFin;
	formVacaciones.fechaInicioAntigua.value= oConductor.fechaIni;
	formVacaciones.fechaFinAntigua.value= oConductor.fechaFin;
	formVacaciones.descripcion.value= oConductor.descripcion;
}

function rellenaCamposBajaVacaciones(oEvento){
	var oE = oEvento || windows.event;
	var formVacaciones= oE.target.parentNode.parentNode.parentNode;
	var oConductor= oGestion.buscarVacaciones(formVacaciones.comboConductorVacaciones.value);
	
	formVacaciones.fechaIni.value= oConductor.fechaIni;
	formVacaciones.fechaFin.value= oConductor.fechaFin;
	formVacaciones.descripcion.value= oConductor.descripcion;
}