
//objeto
class Gestion
{
    constructor()
    {
        //atributos
        this._alquileres=[];
        this._autobuses=[];
        this._clientes=[];
        this._conductores=[];
		this._vacaciones=[];
        this._mantenimientos=[];
        //this.cuentaEmpresa=new Cuenta(iNumCuenta);
        this._cuentas=[];
        //cuenta/factura falta
    }
    //funciones
    añadirCuenta(sNumCuenta)
    {
        var bExiste=this.buscarCuenta(sNumCuenta);
        if(!bExiste)
        {
            var oCuenta=new Cuenta(sNumCuenta);
            this._cuentas.push(oCuenta);
        }
        else
        {
            mensaje("Ya existe una cuenta con ese número. No se ha añadido");
        }
    }
    buscarCuenta(sNumCuenta)
    {
        var oCuenta=null;
        for(var i=0;i<this._cuentas.length && oCuenta==null;i++)
        {
            if(sNumCuenta==this._cuentas[i].numCuenta)
                oCuenta=this._cuentas[i];
        }
        return oCuenta;
    }

    gestionContabilidad(sAsunto, numCuenta, fImporte, dFecha)
    {
        var dFecha=new Date(dFecha).toLocaleDateString("es-ES");
        //var dFecha=new Date(dFecha);
        var oApunte=new Apuntes(fImporte, dFecha, sAsunto);
        var oCuenta=this.buscarCuenta(numCuenta);
        if(sAsunto=="nomina")
        {
            //restarle al num cuenta de gestion
            //añadirlo al num de cuenta del conductor
            oCuenta.saldo=parseFloat(oCuenta.saldo+fImporte);
            this.cuentaEmpresa.saldo=parseFloat(this.cuentaEmpresa.saldo-fImporte);

            //añadir apunte a cuenta
            this.cuentaEmpresa.apuntes.push(oApunte);
            oCuenta.apuntes.push(new Apuntes(fImporte, dFecha, sAsunto));

        }
        else if(sAsunto=="mantenimiento")
        {
            //restarle al num cuenta de gestion
            this.cuentaEmpresa.saldo=parseFloat(this.cuentaEmpresa.saldo-fImporte);
            this.cuentaEmpresa.apuntes.push(oApunte);
        }
        else if(sAsunto=="alquiler")
        {
            //sumarle al num cuenta de gestion
            this.cuentaEmpresa.saldo=parseFloat(this.cuentaEmpresa.saldo+fImporte);
            this.cuentaEmpresa.apuntes.push(oApunte);
        }

    }
    //alquiler

    /*Se le pasa un nº de personas y devuelve el nº de autobuses necesario*/
    calcNumAutobuses(iNumPers)
    {
        var iCapacidad=30; // cada 30 personas se necesitara un autobus
        var numBuses=0;

        numBuses=Math.ceil(iNumPers/iCapacidad); //redondear a la alta

        return numBuses;
    }

    buscarAlquiler(sID)
    {
        var oAlquiler=null;
        
        var sDatos="id="+sID;

        //se hace llamada asyncrona para que espere a la respuesta antes de hacer el return
        $.ajax({
            url :"php/buscarAlquilerId.php",
            async : false,
            cache : false, 
            method : "GET", 
            dataType : "json",
            data : sDatos,
            complete : function(oDatosDevuelto, sStatus)
            {
                //console.log(oDatosDevuelto);
                // si se devuelve un resultado correcto se envia el cliente devuelta
                if(sStatus=="success" && oDatosDevuelto.responseJSON.id!=null)
                {
                    //constructor(dniConductor, matriculaAutobus, sID, iHoras, dFecha, iNumPers, sDescripcion, sOrigen, sDestino, iKMS, sCliente)
                    oAlquiler=new Alquiler(oDatosDevuelto.responseJSON.dni_conductor, oDatosDevuelto.responseJSON.matricula_autobus, oDatosDevuelto.responseJSON.id,
                    oDatosDevuelto.responseJSON.horas,oDatosDevuelto.responseJSON.fecha, oDatosDevuelto.responseJSON.numpersonas, oDatosDevuelto.responseJSON.descripcion,
                    oDatosDevuelto.responseJSON.origen, oDatosDevuelto.responseJSON.destino, oDatosDevuelto.responseJSON.kms, oDatosDevuelto.responseJSON.cliente, oDatosDevuelto.responseJSON.localidad);
                    
                    //console.log(oAlquiler);
                    
                    
                }
            }
        });

        return oAlquiler;
    }
	
	comprobarConductorVacaciones(dniConductor,fechaAlquiler){
		var bVacaciones= true;
		
		for(var i=0;i<this._vacaciones.length;i++){
			if(this._vacaciones[i].dni==dniConductor){ //console.log(dniConductor,fechaAlquiler);
				if(this._vacaciones[i].fechaIniSinConver<=fechaAlquiler && this._vacaciones[i].fechaFinSinConver>=fechaAlquiler){
					bVacaciones= false; //console.log("entro en el if de comparar fechas");
				}
			}
		}
		
		return bVacaciones;
	}

    altaAlquiler(oAlquiler)
    {
        var res=false;
        

        // Instanciar objeto Ajax
        var oAjax = instanciarXHR();

        //1. Preparar parametros con JSON
            
        var oAlquiler=  {   conductor : oAlquiler.conductor,
                        autobus : oAlquiler.autobuses,
                        id : oAlquiler.id,
                        horas : parseInt(oAlquiler.horas),
                        fecha : oAlquiler.fecha,
                        numPers : parseInt(oAlquiler.numPers),
                        descripcion : oAlquiler.descripcion,
                        origen : oAlquiler.origen,
                        destino : oAlquiler.destino,
                        kms : parseInt(oAlquiler.kms),
                        cliente : oAlquiler.cliente,
                        localidad : oAlquiler.localidad
                    };
        
        var sDatosEnvio = "datos=" + JSON.stringify(oAlquiler); //convertir el objeto a JSON

        //2. Configurar la llamada --> Asincrono por defecto
        oAjax.open("POST", encodeURI("php/altaAlquiler.php"));
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //3. Asociar manejador de evento de la respuesta
        oAjax.addEventListener("readystatechange", respuestaAltaAlquiler, false);

        //4. Hacer la llamada
        oAjax.send(sDatosEnvio);
        
        return res;
    }
    bajaAlquiler(oAlquiler)
    {
        var sID="id="+oAlquiler.id;
        var res=false;//no se ha encontrado
        $.ajax({
            url :"php/bajaAlquiler.php",
            async : false,
            cache : false, 
            method : "POST", 
            dataType : "text",
            data : sID,
            complete : function(sDatosDevuelto, sStatus)
            {
                if(sDatosDevuelto.responseText=="Exito")
                    res=true;
            }
        });

        return res;
    }
    modificarAlquiler(sDatos)
    {
        var res=false;
        $.ajax({
            url :"php/modificarAlquiler.php",
            async : false,
            cache : false, 
            method : "POST", 
            dataType : "text",
            data : sDatos,
            complete : function(sDatosDevuelto, sStatus)
            {
                if(sDatosDevuelto.responseText=="Exito")
                    res=true;
            }
        });
        return res;
    }

    //clientes

    /*Comprueba con DNI si existe ese cliente en la base de datos */
    buscarCliente(sDni)
    {
        var oCliente=null;
        
        var sDatos="dni="+sDni;

        //se hace llamada asyncrona para que espere a la respuesta antes de hacer el return
        $.ajax({
            url :"php/buscarClienteDni.php",
            async : false,
            cache : false, 
            method : "GET", 
            dataType : "json",
            data : sDatos,
            complete : function(oDatosDevuelto, sStatus)
            {
                // si se devuelve un resultado correcto se envia el cliente devuelta
                if(sStatus=="success" && oDatosDevuelto.responseJSON.dni!=null)
                {    oCliente=new Cliente(oDatosDevuelto.responseJSON.dni, oDatosDevuelto.responseJSON.nombre, oDatosDevuelto.responseJSON.apellidos,
                    oDatosDevuelto.responseJSON.telefono, oDatosDevuelto.responseJSON.correo, oDatosDevuelto.responseJSON.sexo);
                    if(oDatosDevuelto.responseJSON.estado==false)
                        oCliente.estado=oDatosDevuelto.responseJSON.estado;
                    //console.log(oCliente);
                }
            }
        });

        return oCliente;
        
    }
    /*Realiza la llamada ajax con el cliente recibido, la respuesta se encargara de mostrar los mensajes correspondientes*/
    altaCliente(oCliente)
    {
        
        // Instanciar objeto Ajax
        var oAjax = instanciarXHR();

        //1. Preparar parametros con JSON
            
        var oCliente=  {   dni : oCliente.dni,
                        nombre : oCliente.nombre,
                        apellidos : oCliente.apellidos,
                        telefono : parseInt(oCliente.tlf),
                        correo : oCliente.correo,
                        sexo : oCliente.sexo
                    };
        
        var sDatosEnvio = "datos=" + JSON.stringify(oCliente); //convertir el objeto a JSON

        //2. Configurar la llamada --> Asincrono por defecto
        oAjax.open("POST", encodeURI("php/altaCliente.php"));
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //3. Asociar manejador de evento de la respuesta
        oAjax.addEventListener("readystatechange", respuestaAltaCliente, false);

        //4. Hacer la llamada
        oAjax.send(sDatosEnvio);


        //return res;
    }
    
    

    /*Cliente no se borra de los datos, solo no se muestra a la hora de mostrar clientes actuales*/
    bajaCliente(oCliente)
    {
        var sDatos="dni="+oCliente.dni;
        var res=false;//no se ha encontrado
        $.ajax({
            url :"php/bajaCliente.php",
            async : false,
            cache : false, 
            method : "POST", 
            dataType : "text",
            data : sDatos,
            complete : function(sDatosDevuelto, sStatus)
            {
                if(sDatosDevuelto.responseText=="Exito")
                    res=true;
            }
        });

        return res;
    }
    /*No se modifica el dni*/
    modificarCliente(sDatos)
    {
        //console.log(sDatos);
        $.get("php/modificarCliente.php",sDatos,respuestaModificarCliente,"text");
       
       
    }

    actualizaComboClientesConAlquiler()
    {
        var oComboAlquilerCliente=document.frmListadoAlquileres.comboCliente;
        var oCliente=null;
        var clientesAnadidos=[];//guarda los dnis de los clientes que se van añadiendo al combo, para que no se repitan
        var esta=false;

         while (oComboAlquilerCliente.firstChild)
             oComboAlquilerCliente.removeChild(oComboAlquilerCliente.firstChild);

        for(var i=0;i<this._alquileres.length;i++)//solo mostrar los que tienen alquileres asignados
        { 
            oCliente=this.buscarCliente(this._alquileres[i].cliente.dni);
            esta=false;
            for (var j=0;j<clientesAnadidos.length;j++)
            { 
                if(oCliente.dni==clientesAnadidos[j])
                    esta=true;   
            }
            if (!esta)
            {
                clientesAnadidos.push(oCliente.dni);
                var newSelect=document.createElement("option");
                newSelect.value=oCliente.dni;
                newSelect.text=oCliente.dni+" - "+oCliente.nombre+" "+oCliente.apellidos;
                oComboAlquilerCliente.appendChild(newSelect);
            }
            
        }
    }

    //conductores
	altaConductor(oConductor){
		// Instanciar objeto Ajax
        var oAjax = instanciarXHR();

        //1. Preparar parametros con JSON
		var oConductor= {
			dni: oConductor.dni,
			nombre: oConductor.nombre,
			apellidos: oConductor.apellidos,
			sexo: oConductor.sexo,
			tlf: oConductor.tlf,
			email: oConductor.email,
			direccion: oConductor.direccion
		};
		
		var sDatosEnvio= "datos="+JSON.stringify(oConductor);
		
		//2. Configurar la llamada --> Asincrono por defecto
        oAjax.open("POST", encodeURI("php/altaConductor.php"));
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		//3. Asociar manejador de evento de la respuesta
        oAjax.addEventListener("readystatechange", respuestaAltaConductor, false);
		
		//4. Hacer la llamada
        oAjax.send(sDatosEnvio);
	}
	
	bajaConductor(oConductor){ //funciona
		
		var sDatos="datos="+oConductor.dni;
        var res=false;//no se ha encontrado
       
	   $.ajax({
            url :"php/bajaConductor.php",
            async : false,
            cache : false, 
            method : "POST", 
            dataType : "text",
            data : sDatos,
            complete : function(sDatosDevuelto, sStatus)
            {
                if(sDatosDevuelto.responseText=="Exito")
                {
					res=true;
					buscarVacacionesActivas();
					buscarVacaciones();
				}
            }
        });

        return res;
	}
		
	altaVacaciones(oVacaciones){
		// Instanciar objeto Ajax
        var oAjax = instanciarXHR();

        //1. Preparar parametros con JSON
		var oVacaciones= {
			dni: oVacaciones.dni,
			fechaIni: oVacaciones.fechaIni,
			fechaFin: oVacaciones.fechaFin,
			descripcion: oVacaciones.descripcion
		};
		
		var sDatosEnvio= "datos="+JSON.stringify(oVacaciones);
		
		//2. Configurar la llamada --> Asincrono por defecto
        oAjax.open("POST", encodeURI("php/altaVacaciones.php"));
        oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		//3. Asociar manejador de evento de la respuesta
        oAjax.addEventListener("readystatechange", respuestaAltaVacaciones, false);
		
		//4. Hacer la llamada
        oAjax.send(sDatosEnvio);
	}
	
	bajaVacaciones(oVacaciones){
		var bEncontrado= false;
		
		for(var i=0; i<this._vacaciones.length && bEncontrado==false; i++){
			if(this._vacaciones[i].dni==oVacaciones.dni){
				bEncontrado= true; 
				this._vacaciones[i].estado=false; //false es dado de baja
				this.actualizaComboVacaciones();				
			}
		}
		
		return bEncontrado;
	}
	
	modificarVacaciones(oVacaciones,dniConductor){
		var bEncontrado= true;
		
		for(var i=0;i<this._vacaciones.length;i++){
			if(this._vacaciones[i].dni==dniConductor){
				bEncontrado= false;
				this._vacaciones[i]= oVacaciones;
				this.actualizaComboVacaciones();
			}
		}
		
		return bEncontrado;
	}

	buscarConductor(sDni){
        var oConductor=null;
		var sDatos= "dni="+sDni;
		
        //se hace llamada asyncrona para que espere a la respuesta antes de hacer el return
        $.ajax({
            url :"php/buscarConductorDni.php",
            async : false,
            cache : false, 
            method : "GET", 
            dataType : "json",
            data : sDatos,
            complete : function(oDatosDevuelto, sStatus)
            {
                // si se devuelve un resultado correcto se envia el cconductor devuelta
                if(sStatus=="success" && oDatosDevuelto.responseJSON.dni!=null)
                {   oConductor=new Conductor(oDatosDevuelto.responseJSON.dni, oDatosDevuelto.responseJSON.nombre, oDatosDevuelto.responseJSON.apellidos, 
					oDatosDevuelto.responseJSON.sexo, oDatosDevuelto.responseJSON.telefono, oDatosDevuelto.responseJSON.email, oDatosDevuelto.responseJSON.direccion);
					
                    if(oDatosDevuelto.responseJSON.estado==false)
                        oConductor.estado=oDatosDevuelto.responseJSON.estado;
                }
            }
        });

        return oConductor;
    }
	
	buscarVacacion(sDni){
		var bRespuesta=false;
		var dni= "dni="+sDni;
		
        //se hace llamada asyncrona para que espere a la respuesta antes de hacer el return
        $.get("php/buscarVacacionesDni.php",dni,function(oDatosDevueltos,sStatus,oAjax){
			if(oDatosDevueltos.estado==true){
				bRespuesta= true;							
			}
		},"json");

        return bRespuesta;
	}
		
    //autobuses
    buscarAutobus(sMatricula)
    {
        var oAutobus=null;
        for(var i=0;i<this._autobuses.length && oAutobus==null;i++)
        {
            if(sMatricula==this._autobuses[i].matricula)
                oAutobus=this._autobuses[i];
        }
        return oAutobus;
    }


    altaAutobus(oAutobus)
    {
        var esta=false;
        var introducido=false;

        for (var i=0;i<this._autobuses.length;i++)
            if(this._autobuses[i].matricula == oAutobus.matricula )
                esta=true;
        

        if(!esta){
            this._autobuses.push(oAutobus);
            this.actualizaComboAutobus();
            introducido=true;
        }

        return introducido;
    }

    bajaAutobus(oAutobus)
    {
        var res=false;//no se ha dado de baja

        for (var i=0;i<this._autobuses.length;i++)
            if(this._autobuses[i].matricula == oAutobus.matricula ){
                this._autobuses[i].darBaja();
                res=true;// se ha dado de baja
                this.actualizaComboAutobus();
            }

        return res;
    }

    modificarAutobus(oAutobus)
    {
        var res=false;//no se ha modificado

        for (var i=0;i<this._autobuses.length;i++)
            if(this._autobuses[i].matricula == oAutobus.matricula ){
                this._autobuses[i]=oAutobus;
                res=true;// se ha modificado
                this.actualizaComboAutobus();
            }

        return res;
    }

    actualizaComboAutobus() 
    {

        var oComboBajaAutobus=document.frmAutobusBaja.comboAutobus;
        var oComboModificaAutobus=document.frmAutobusModificar.comboAutobus;
        var oComboSeleccionaAutobus=document.frmNuevoAlquiler.querySelector(".alquilerAutobusesOriginal").childNodes[3].childNodes[1];
        var oComboModificaAlquiler=document.frmModificarAlquiler.querySelector(".alquilerAutobusesOriginal").childNodes[3].childNodes[1];
        var oComboBorraAlquiler=document.frmBorraAlquiler.querySelector(".alquilerAutobusesOriginal").childNodes[3].childNodes[1];
        var oComboAutobusMantenimiento=document.frmAltaMantenimiento.comboAutobus;
       

        while (oComboBajaAutobus.firstChild) { //tienen el mismo nº de hijos
            oComboBajaAutobus.removeChild(oComboBajaAutobus.firstChild);
            oComboModificaAutobus.removeChild(oComboModificaAutobus.firstChild);
            oComboSeleccionaAutobus.removeChild(oComboSeleccionaAutobus.firstChild);
            oComboModificaAlquiler.removeChild(oComboModificaAlquiler.firstChild);
            oComboBorraAlquiler.removeChild(oComboBorraAlquiler.firstChild);
            oComboAutobusMantenimiento.removeChild(oComboAutobusMantenimiento.firstChild);
        }
  

        for(var i=0;i<this._autobuses.length;i++)
        {
            if(this._autobuses[i].estado==true) //solo mostrar los dados de alta
            {
                var newSelect=document.createElement("option");
                newSelect.value=this._autobuses[i].matricula;
                newSelect.text=this._autobuses[i].matricula+" - "+this._autobuses[i].modelo;
                oComboBajaAutobus.appendChild(newSelect);
                oComboModificaAutobus.appendChild(oComboBajaAutobus.lastChild.cloneNode(true));
                oComboSeleccionaAutobus.appendChild(oComboBajaAutobus.lastChild.cloneNode(true));
                oComboModificaAlquiler.appendChild(oComboBajaAutobus.lastChild.cloneNode(true));
                oComboBorraAlquiler.appendChild(oComboBajaAutobus.lastChild.cloneNode(true));
                oComboAutobusMantenimiento.appendChild(oComboBajaAutobus.lastChild.cloneNode(true));
            }    
        }

    }

    actualizaComboRevisado(){
        var oComboBajaMantenimientoAutobus=document.frmBajaMantenimiento.comboAutobusRevisado;
         var oComboModificarMantenimientoAutobus=document.frmModificarMantenimiento.comboAutobusRevisado;

        while (oComboBajaMantenimientoAutobus.firstChild) {
            oComboBajaMantenimientoAutobus.removeChild(oComboBajaMantenimientoAutobus.firstChild);
            oComboModificarMantenimientoAutobus.removeChild(oComboModificarMantenimientoAutobus.firstChild);
        }

        for(var i=0;i<this._autobuses.length;i++)
        {
            if(this._autobuses[i].estado==true) //solo mostrar los dados de alta
            {
                if(this._autobuses[i].itv==true){
                    var newSelect=document.createElement("option");
                    newSelect.value=this._autobuses[i].matricula;
                    newSelect.text=this._autobuses[i].matricula+" - "+this._autobuses[i].modelo+" "+this._autobuses[i].asientos;
                    oComboBajaMantenimientoAutobus.appendChild(newSelect);
                    oComboModificarMantenimientoAutobus.appendChild(oComboBajaMantenimientoAutobus.lastChild.cloneNode(true));
                   // oComboAutobusMantenimiento.appendChild(oComboBajaAutobus.lastChild.cloneNode(true));
                }
            }    
        }

    }


    //mantenimiento
    buscarMantenimiento(sMatricula)
    {
        var oMantenimiento=null;

        //for(var i=0;i<this._mantenimientos.length && oMantenimiento==null;i++)
        for (var i=this._mantenimientos.length-1;i>=0 && oMantenimiento==null;i--)
        {
            if(sMatricula==this._mantenimientos[i].matriculaAutobus)
                oMantenimiento=this._mantenimientos[i];
        }
        return oMantenimiento;

    }


    altaMantenimiento(oMantenimiento)
    {
        var revisado=false;
        var introducido=false;

        for (var i=0;i<this._autobuses.length;i++)
            if(this._autobuses[i].matricula == oMantenimiento.matriculaAutobus )
                if (this._autobuses[i].itv)
                    revisado=true;
                else{
                    this._autobuses[i].pasarRevision();
                    this.actualizaComboRevisado();
                }
        

        if(!revisado){
            this._mantenimientos.push(oMantenimiento);
            introducido=true;

            //hacer gestion de pago
            this.gestionContabilidad("mantenimiento", null, oMantenimiento.importe, oMantenimiento.fecha);

        }

        return introducido;
    }

    bajaMantenimiento(sMatricula)
    {
        var anulado=false;

        for (var i=0;i<this._autobuses.length;i++)
            if(this._autobuses[i].matricula == sMatricula )
                if (this._autobuses[i].itv)
                {
                    this._autobuses[i].itv=false;
                    anulado=true;
                    this.actualizaComboRevisado();
                }

        return anulado;
    }

    modificarMantenimiento(oMantenimiento)
    {
        var res=false;//no se ha modificado

        //for (var i=0;i<this._mantenimientos.length;i++)
        for (var i=this._mantenimientos.length-1;i>=0;i--)
            if(this._mantenimientos[i].matriculaAutobus == oMantenimiento.matriculaAutobus ){
                this._mantenimientos[i]=oMantenimiento;
                res=true;// se ha modificado
                this.actualizaComboRevisado();
                //comboEstadoInicialAutubuses();
            }

        return res;
    }
}