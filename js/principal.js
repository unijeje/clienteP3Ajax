var oGestion=new Gestion();

//botones principales
var bGestionClienteCargado=false;
$("#menuAltaCliente").click(cargaAltaCliente);
$("#menuBajaCliente").click(cargaBajaCliente);
$("#menuModificaCliente").click(cargaModificaCliente);


function mostrarFormulario(sForm)
{
    $("form:not('#"+sForm+"')").hide("normal");
    $("#resultadoListados").hide("normal");
    $("#panelMensajes").hide("normal");
    $("#formulario").show("normal");
}

function cargaAltaCliente()
{
    mostrarFormulario("frmClienteAlta");
    // Verifico si ya he cargado el formulario antes
    if ($('#frmClienteAlta').length == 0) {
        $("<div>").appendTo('#formulario').load("formu/altaCliente.html", function()
        {
            if(bGestionClienteCargado)
            {
                var oBtnDarAltaCliente=document.getElementById("btnAltaCliente");
                oBtnDarAltaCliente.addEventListener("click", altaCliente, false);
            }
            else
            {
                $.getScript("js/gestion/gestionCliente.js", function(){
                    bGestionClienteCargado=true;
                    var oBtnDarAltaCliente=document.getElementById("btnAltaCliente");
                    oBtnDarAltaCliente.addEventListener("click", altaCliente, false);
                });
            }
            
        });
    } else {
        // Lo muestro si está oculto
        $('#frmClienteAlta').show("normal");
    }
}

function cargaBajaCliente()
{
    mostrarFormulario("frmClienteBaja");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmClienteBaja').length == 0) {
        $("<div>").appendTo('#formulario').load("formu/borraCliente.html", function()
        {
            if(bGestionClienteCargado)
            {
                var oBtnDarBajaCliente=document.getElementById("btnBajaCliente");
                oBtnDarBajaCliente.addEventListener("click", bajaCliente, false);
            }
            else
            {
            $.getScript("js/gestion/gestionCliente.js", function(){
                bGestionClienteCargado=true;
                var oBtnDarBajaCliente=document.getElementById("btnBajaCliente");
                oBtnDarBajaCliente.addEventListener("click", bajaCliente, false);
                });
            }
        });
    } else {
        // Lo muestro si está oculto
        $('#frmClienteBaja').show("normal");
    }
}

function cargaModificaCliente()
{
    mostrarFormulario("frmClienteModificar");

    // Verifico si ya he cargado el formulario antes
    if ($('#frmClienteModificar').length == 0) {
        $("<div>").appendTo('#formulario').load("formu/modificaCliente.html", function()
        {
            if(bGestionClienteCargado)
            {
                var oBtnActualizarCliente=document.getElementById("btnModificarCliente");
                oBtnActualizarCliente.addEventListener("click", actualizaCliente, false);
            }
            else
            {
            $.getScript("js/gestion/gestionCliente.js", function(){
                bGestionClienteCargado=true;
                var oBtnActualizarCliente=document.getElementById("btnModificarCliente");
                oBtnActualizarCliente.addEventListener("click", actualizaCliente, false);
                });
            }
        });
    } else {
        // Lo muestro si está oculto
        $('#frmClienteModificar').show("normal");
    }
}



//botones Listados
var oBtnListadoAutobuses=document.getElementById("btnListadoAutobuses");
oBtnListadoAutobuses.addEventListener("click",mostrarListadoAutobuses,false);

var oBtnListadoClientes=document.getElementById("btnListadoClientes");
oBtnListadoClientes.addEventListener("click",mostrarListadoClientes,false);

var oBtnListadoConductores=document.getElementById("btnListadoConductores");
oBtnListadoConductores.addEventListener("click",mostrarListadoConductores,false);

var oBtnListadoVacaciones=document.getElementById("btnListadoVacaciones");
oBtnListadoVacaciones.addEventListener("click",mostrarListadoVacaciones,false);

var oBtnListadoAlquileres=document.getElementById("btnListadoAlquileres");
oBtnListadoAlquileres.addEventListener("click",mostrarListadoAlquileres,false);

var oCapaListado=document.getElementById("resultadoListados");
var oCapaListadoAlquileres=document.getElementById("frmListadoAlquileres");


//botones panel de mensajes
var oBtnCerrar=document.getElementById("btnCerrar");
oBtnCerrar.addEventListener("click", cerrar, false);
var oPanelMensajes=document.getElementById("panelMensajes");
var oPanelMensajeTexto=document.getElementById("pTextoMensaje");

//ocultar

//Listados
var campoCuenta=document.getElementById("panelCuenta");
var campoConductor=document.getElementById("panelConductor");


function mostrarListadoAutobuses()
{
    $("#formulario").hide("normal");
    listadoAutobuses();
    oCapaListado.style.display="block";
}

function mostrarListadoClientes()
{
    $("#formulario").hide("normal");
    listadoClientes();

    oCapaListado.style.display="block";
}

function mostrarListadoConductores()
{
    $("#formulario").hide("normal");
    listadoConductores();
    oCapaListado.style.display="block";
}

function mostrarListadoVacaciones()
{
    $("#formulario").hide("normal");
	listadoVacaciones();
	oCapaListado.style.display="block";
}

function mostrarListadoAlquileres()
{
    $("#formulario").hide("normal");
    listadoAlquileres();
    oCapaListado.style.display="block";
}


//panel de mensajes
function mensaje(sTexto)
{
    //crear funcion que cree <p> y haga appendChild en este panel 
	oPanelMensajeTexto.textContent=sTexto;
	oPanelMensajes.style.display = "block";
}

function cerrar()
{
	oPanelMensajes.style.display = "none";
}

function falloValidacion(sTexto, oInput)
{
    //console.log(oInput);
    var oTexto=document.createTextNode(sTexto);
    var oDiv=document.createElement("div");
    oDiv.setAttribute("id", "error");
    oDiv.appendChild(oTexto);
    var oAnterior=oInput.parentNode.querySelector("#error");

    if(oAnterior)
        oAnterior.textContent=sTexto;
    else
        oInput.parentNode.appendChild(oDiv);
}

function comboResultados(oInput, sResultados)
{
    console.log(oInput.parentNode.children);
    //pasarle un select como parametro, en ese select crear combos con los objetos resultados que se le han pasado
    //oInput.parentNode.lastChild.appendChild()
}

function falloValidacionAgregar(sTexto, oInput)
{
    //console.log(oInput);
    var oTexto=document.createTextNode(sTexto);
    var oDiv=document.createElement("div");
    oDiv.setAttribute("id", "error");
    oDiv.appendChild(oTexto);
    var oAnterior=oInput.parentNode.querySelector("#error");

    if(oAnterior)
        oAnterior.textContent+=" "+sTexto;
    else
        oInput.parentNode.appendChild(oDiv);
}

function validarRadio(arrayRadio)
{
    var res=false;
    for(var i=0;i<arrayRadio.length && res==false;i++)
    {
        if(arrayRadio[i].checked)
            res=true;
    }
    return res;
}

function escogeIndexCombo(oCombo, sValue)
{
    for(var i=0; i<oCombo.childNodes.length;i++)
    {
        if(oCombo.childNodes[i].value==sValue)
        {
            oCombo.selectedIndex=i;
        }
    }
}

function comboEstadoInicialAlquileres()
{
    var oComboBorrarAlquiler=document.frmBorraAlquiler.comboAlquiler;
    var oComboModificarAlquiler=document.frmModificarAlquiler.comboAlquiler;

    if(oComboBorrarAlquiler.firstChild)
    {
        oComboModificarAlquiler.selectedIndex="0";// seleccionar el primero al cargar el programa
        oComboBorrarAlquiler.selectedIndex="0";// seleccionar el primero al cargar el programa
        
        var oAlquiler=oGestion.buscarAlquiler(frmModificarAlquiler.comboAlquiler.value);
        
        if(oAlquiler)
        {   
            //MODIFICAR
            escogeIndexCombo(frmModificarAlquiler.comboCliente, oAlquiler.cliente.dni);

            var oCombosActuales=frmModificarAlquiler.querySelectorAll(".alquilerConductores"); 

            for(var i=0;i<oCombosActuales.length;i++)
            {
                oCombosActuales[i].parentNode.removeChild(oCombosActuales[i]);
            }

            oCombosActuales=frmModificarAlquiler.querySelectorAll(".alquilerAutobuses"); 

            for(var i=0;i<oCombosActuales.length;i++)
            {
                oCombosActuales[i].parentNode.removeChild(oCombosActuales[i]);
            }
            
            var oComboOriginal=frmModificarAlquiler.querySelector(".alquilerConductoresOriginal");
            


            for(var i=1;i<oAlquiler.conductor.length;i++)
            {
                var oNodoClonado=oComboOriginal.cloneNode(true);
                oNodoClonado.classList.add("alquilerConductores");
                oNodoClonado.classList.remove("alquilerConductoresOriginal");
                frmModificarAlquiler.insertBefore(oNodoClonado, oComboOriginal);
            }

            for(var i=0;i<oAlquiler.conductor.length;i++)
            {
                escogeIndexCombo(frmModificarAlquiler.comboConductores[i], oAlquiler.conductor[i].dni);
            }

            oComboOriginal=frmModificarAlquiler.querySelector(".alquilerAutobusesOriginal");

            for(var i=1;i<oAlquiler.autobuses.length;i++)
            {
                var oNodoClonado=oComboOriginal.cloneNode(true);
                oNodoClonado.classList.add("alquilerAutobuses");
                oNodoClonado.classList.remove("alquilerAutobusesOriginal");
                frmModificarAlquiler.insertBefore(oNodoClonado, oComboOriginal);
            }

            for(var i=0;i<oAlquiler.autobuses.length;i++)
            {
                escogeIndexCombo(frmModificarAlquiler.comboAutobuses[i], oAlquiler.autobuses[i].matricula);
            }
            //frmModificarAlquiler.comboCliente.selectedIndex="0";
            frmModificarAlquiler.txtAlquilerID.value=oAlquiler.id;
            frmModificarAlquiler.txtAlquilerHoras.value=oAlquiler.horas;
            frmModificarAlquiler.txtAlquilerFecha.value=oAlquiler.fecha;
            frmModificarAlquiler.txtAlquilerNumPers.value=oAlquiler.numPers;
            frmModificarAlquiler.txtAlquilerDesc.value=oAlquiler.descripcion;
            frmModificarAlquiler.txtAlquilerOrigen.value=oAlquiler.origen;
            frmModificarAlquiler.txtAlquilerDestino.value=oAlquiler.destino;
            frmModificarAlquiler.txtAlquilerKms.value=oAlquiler.kms;

            //BORRAR

            escogeIndexCombo(frmBorraAlquiler.comboCliente, oAlquiler.cliente.dni);

            oCombosActuales=frmBorraAlquiler.querySelectorAll(".alquilerConductores"); 

            for(var i=0;i<oCombosActuales.length;i++)
            {
                oCombosActuales[i].parentNode.removeChild(oCombosActuales[i]);
            }

            oCombosActuales=frmBorraAlquiler.querySelectorAll(".alquilerAutobuses"); 

            for(var i=0;i<oCombosActuales.length;i++)
            {
                oCombosActuales[i].parentNode.removeChild(oCombosActuales[i]);
            }

            oComboOriginal=frmBorraAlquiler.querySelector(".alquilerConductoresOriginal");
            
            for(var i=1;i<oAlquiler.conductor.length;i++)
            {
                var oNodoClonado=oComboOriginal.cloneNode(true);
                oNodoClonado.classList.add("alquilerConductores");
                oNodoClonado.classList.remove("alquilerConductoresOriginal");
                frmBorraAlquiler.insertBefore(oNodoClonado, oComboOriginal);
            }

            for(var i=0;i<oAlquiler.conductor.length;i++)
            {
                escogeIndexCombo(frmBorraAlquiler.comboConductores[i], oAlquiler.conductor[i].dni);
            }

            oComboOriginal=frmBorraAlquiler.querySelector(".alquilerAutobusesOriginal");

            for(var i=1;i<oAlquiler.autobuses.length;i++)
            {
                var oNodoClonado=oComboOriginal.cloneNode(true);
                oNodoClonado.classList.add("alquilerAutobuses");
                oNodoClonado.classList.remove("alquilerAutobusesOriginal");
                frmBorraAlquiler.insertBefore(oNodoClonado, oComboOriginal);
            }

            for(var i=0;i<oAlquiler.autobuses.length;i++)
            {
                escogeIndexCombo(frmBorraAlquiler.comboAutobuses[i], oAlquiler.autobuses[i].matricula);
            }

            frmBorraAlquiler.txtAlquilerID.value=oAlquiler.id;
            frmBorraAlquiler.txtAlquilerHoras.value=oAlquiler.horas;
            frmBorraAlquiler.txtAlquilerFecha.value=oAlquiler.fecha;
            frmBorraAlquiler.txtAlquilerNumPers.value=oAlquiler.numPers;
            frmBorraAlquiler.txtAlquilerDesc.value=oAlquiler.descripcion;
            frmBorraAlquiler.txtAlquilerOrigen.value=oAlquiler.origen;
            frmBorraAlquiler.txtAlquilerDestino.value=oAlquiler.destino;
            frmBorraAlquiler.txtAlquilerKms.value=oAlquiler.kms;
        }
        
    }  
    else
    {
       var oComboConductores=frmModificarAlquiler.querySelectorAll("#comboConductores");
        var oComboAutobuses=frmModificarAlquiler.querySelectorAll("#comboAutobuses");
        //console.log(oComboOriginal);
        frmModificarAlquiler.comboCliente.selectedIndex="-1";
        for(var i=0;i<oComboConductores.length;i++)
        {
            oComboConductores[i].selectedIndex="-1";
            oComboAutobuses[i].selectedIndex="-1";
        }
        frmModificarAlquiler.txtAlquilerID.value=null;
        frmModificarAlquiler.txtAlquilerHoras.value=null;
        frmModificarAlquiler.txtAlquilerFecha.value=null;
        frmModificarAlquiler.txtAlquilerNumPers.value=null;
        frmModificarAlquiler.txtAlquilerDesc.value=null;
        frmModificarAlquiler.txtAlquilerOrigen.value=null;
        frmModificarAlquiler.txtAlquilerDestino.value=null;
        frmModificarAlquiler.txtAlquilerKms.value=null;
        
        oComboConductores=frmBorraAlquiler.querySelectorAll("#comboConductores");
        oComboAutobuses=frmBorraAlquiler.querySelectorAll("#comboAutobuses");
        frmBorraAlquiler.comboCliente.selectedIndex="-1";
        for(var i=0;i<oComboConductores.length;i++)
        {
            oComboConductores[i].selectedIndex="-1";
            oComboAutobuses[i].selectedIndex="-1";
        }
        frmBorraAlquiler.txtAlquilerID.value=null;
        frmBorraAlquiler.txtAlquilerHoras.value=null;
        frmBorraAlquiler.txtAlquilerFecha.value=null;
        frmBorraAlquiler.txtAlquilerNumPers.value=null;
        frmBorraAlquiler.txtAlquilerDesc.value=null;
        frmBorraAlquiler.txtAlquilerOrigen.value=null;
        frmBorraAlquiler.txtAlquilerDestino.value=null;
        frmBorraAlquiler.txtAlquilerKms.value=null;
    }
    /*
    var oComboConductores=frmModificarAlquiler.querySelectorAll("#comboConductores");
    var oComboAutobuses=frmModificarAlquiler.querySelectorAll("#comboAutobuses");
    //console.log(oComboOriginal);
    frmModificarAlquiler.comboCliente.selectedIndex="-1";
    for(var i=0;i<oComboConductores.length;i++)
    {
        oComboConductores[i].selectedIndex="-1";
        oComboAutobuses[i].selectedIndex="-1";
    }
    frmModificarAlquiler.txtAlquilerID.value=null;
    frmModificarAlquiler.txtAlquilerHoras.value=null;
    frmModificarAlquiler.txtAlquilerFecha.value=null;
    frmModificarAlquiler.txtAlquilerNumPers.value=null;
    frmModificarAlquiler.txtAlquilerDesc.value=null;
    frmModificarAlquiler.txtAlquilerOrigen.value=null;
    frmModificarAlquiler.txtAlquilerDestino.value=null;
    frmModificarAlquiler.txtAlquilerKms.value=null;
    
    oComboConductores=frmBorraAlquiler.querySelectorAll("#comboConductores");
    oComboAutobuses=frmBorraAlquiler.querySelectorAll("#comboAutobuses");
    frmBorraAlquiler.comboCliente.selectedIndex="-1";
    for(var i=0;i<oComboConductores.length;i++)
    {
        oComboConductores[i].selectedIndex="-1";
        oComboAutobuses[i].selectedIndex="-1";
    }
    frmBorraAlquiler.txtAlquilerID.value=null;
    frmBorraAlquiler.txtAlquilerHoras.value=null;
    frmBorraAlquiler.txtAlquilerFecha.value=null;
    frmBorraAlquiler.txtAlquilerNumPers.value=null;
    frmBorraAlquiler.txtAlquilerDesc.value=null;
    frmBorraAlquiler.txtAlquilerOrigen.value=null;
    frmBorraAlquiler.txtAlquilerDestino.value=null;
    frmBorraAlquiler.txtAlquilerKms.value=null;
    */
}

function comboEstadoInicialClientes() //al iniciar el programa muestra los datos del primero y al borrar/actualizar vuelve a mostrar el primero
{
    //cliente
    var oComboBajaCliente=document.frmClienteBaja.comboCliente;
    var oComboModificaCliente=document.frmClienteModificar.comboCliente;
    var oComboSeleccionaCliente=document.frmNuevoAlquiler.comboCliente;
    if(oComboBajaCliente.firstChild)
    {
        oComboBajaCliente.firstChild.selected;// seleccionar el primero al cargar el programa
        oComboModificaCliente.firstChild.selected;// seleccionar el primero al cargar el programa
        oComboSeleccionaCliente.firstChild.selected;
        var oCliente=oGestion.buscarCliente(frmClienteModificar.comboCliente.value);
        if(oCliente)
        {   
            frmClienteModificar.txtClienteDni.value=oCliente.dni;
            frmClienteModificar.txtClienteNombre.value=oCliente.nombre;
            frmClienteModificar.txtClienteApellidos.value=oCliente.apellidos;
            frmClienteModificar.txtClienteTelefono.value=oCliente.tlf;
            frmClienteModificar.txtClienteCorreo.value=oCliente.correo;
            frmClienteModificar.txtClienteCuenta.value=oCliente.numCuenta;
            frmClienteModificar.radioClienteSexo.value=oCliente.sexo;

            frmClienteBaja.txtClienteDni.value=oCliente.dni;
            frmClienteBaja.txtClienteNombre.value=oCliente.nombre;
            frmClienteBaja.txtClienteApellidos.value=oCliente.apellidos;
            frmClienteBaja.txtClienteTelefono.value=oCliente.tlf;
            frmClienteBaja.txtClienteCorreo.value=oCliente.correo;
            frmClienteBaja.txtClienteCuenta.value=oCliente.numCuenta;
            frmClienteBaja.txtClienteSexo.value=oCliente.sexo;
        }

    }  
    else
    {
        frmClienteModificar.txtClienteDni.value=null;
        frmClienteModificar.txtClienteNombre.value=null;
        frmClienteModificar.txtClienteApellidos.value=null;
        frmClienteModificar.txtClienteTelefono.value=null;
        frmClienteModificar.txtClienteCorreo.value=null;
        frmClienteModificar.txtClienteCuenta.value=null;
        frmClienteModificar.txtClienteSexo.value=null;

        frmClienteBaja.txtClienteDni.value=null;
        frmClienteBaja.txtClienteNombre.value=null;
        frmClienteBaja.txtClienteApellidos.value=null;
        frmClienteBaja.txtClienteTelefono.value=null;
        frmClienteBaja.txtClienteCorreo.value=null;
        frmClienteBaja.txtClienteCuenta.value=null;
        frmClienteBaja.txtClienteSexo.value=null;
    }
}

function comboEstadoInicialConductores(){
    //conductores
	var oComboBajaConductor=document.frmConductorBaja.comboConductor;
    var oComboModificaConductor=document.frmConductorModificar.comboConductor;
    var oComboSeleccionaConductor=document.frmNuevoAlquiler.querySelector(".alquilerConductoresOriginal").childNodes[3].childNodes[1];
	
	if(oComboBajaConductor.firstChild){
        oComboBajaConductor.firstChild.selected;// seleccionar el primero al cargar el programa
        frmConductorModificar.firstChild.selected;// seleccionar el primero al cargar el programa
        oComboSeleccionaConductor.firstChild.selected;
        var oConductor= oGestion.buscarConductor(frmConductorModificar.comboConductor.value);
        if(oConductor)
        {
            frmConductorModificar.txtConductorDni.value=oConductor.dni;
            frmConductorModificar.txtConductorNombre.value=oConductor.nombre;
            frmConductorModificar.txtConductorApellidos.value=oConductor.apellidos;
            frmConductorModificar.radioConductorSexo.value=oConductor.sexo;
            frmConductorModificar.txtConductorTelefono.value=oConductor.tlf;
            frmConductorModificar.txtConductorCorreo.value=oConductor.email;
            frmConductorModificar.txtConductorDireccion.value= oConductor.direccion;
            frmConductorModificar.txtConductorCuenta.value=oConductor.numCuenta;
    
            frmConductorBaja.txtConductorDni.value=oConductor.dni;
            frmConductorBaja.txtConductorNombre.value=oConductor.nombre;
            frmConductorBaja.txtConductorApellidos.value=oConductor.apellidos;
            frmConductorBaja.radioConductorSexo.value=oConductor.sexo;
            frmConductorBaja.txtConductorTelefono.value=oConductor.tlf;
            frmConductorBaja.txtConductorCorreo.value=oConductor.email;
            frmConductorBaja.txtConductorDireccion.value= oConductor.direccion;
            frmConductorBaja.txtConductorCuenta.value=oConductor.numCuenta;
        }


    } else{
        frmConductorModificar.txtConductorDni.value=null;
        frmConductorModificar.txtConductorNombre.value=null;
        frmConductorModificar.txtConductorApellidos.value=null;
        frmConductorModificar.radioConductorSexo.value=null;
        frmConductorModificar.txtConductorTelefono.value=null;
        frmConductorModificar.txtConductorCorreo.value=null;
		frmConductorModificar.txtConductorDireccion.value= null;
        frmConductorModificar.txtConductorCuenta.value=null;

        frmConductorBaja.txtConductorDni.value=null;
        frmConductorBaja.txtConductorNombre.value=null;
        frmConductorBaja.txtConductorApellidos.value=null;
        frmConductorBaja.radioConductorSexo.value=null;
        frmConductorBaja.txtConductorTelefono.value=null;
        frmConductorBaja.txtConductorCorreo.value=null;
		frmConductorBaja.txtConductorDireccion.value= null;
        frmConductorBaja.txtConductorCuenta.value=null;
    }
}
   
function estadoInicialComboVacaciones(){	
    var oComboBajaDeVacaciones= document.frmBajaDeVacaciones.comboConductorVacaciones;
    var oComboModificarVacaciones= document.frmBajaDeVacaciones.comboConductorVacaciones;
	
	if(oComboBajaDeVacaciones.firstChild){
		oComboBajaDeVacaciones.firstChild.selected;
		frmModificarVacaciones.firstChild.selected;
		
		var oVacaciones= oGestion.buscarVacaciones(frmBajaDeVacaciones.comboConductorVacaciones.value);
		
		if(oVacaciones){
			frmBajaDeVacaciones.fechaIni.value= oVacaciones.fechaIni;
			frmBajaDeVacaciones.fechaFin.value= oVacaciones.fechaFin;
			frmBajaDeVacaciones.descripcion.value= oVacaciones.descripcion;
			
			frmModificarVacaciones.fechaInicioAntigua.value= oVacaciones.fechaIni;
			frmModificarVacaciones.fechaFinAntigua.value= oVacaciones.fechaFin;
			frmModificarVacaciones.descripcion.value= oVacaciones.descripcion;
		} else{
			frmBajaDeVacaciones.fechaIni.value= null;
			frmBajaDeVacaciones.fechaFin.value= null;
			frmBajaDeVacaciones.descripcion.value= null;
			
			frmModificarVacaciones.fechaInicioAntigua.value= null;
			frmModificarVacaciones.fechaFinAntigua.value= null;
			frmModificarVacaciones.descripcion.value= null;
		}
	}
}

 //autobuses
function comboEstadoInicialAutubuses()
{
    var oComboBajaAutobus=document.frmAutobusBaja.comboAutobus;
    var oComboModificaAutobus=document.frmAutobusModificar.comboAutobus;
    var oComboAutobusMantenimiento=document.frmAltaMantenimiento.comboAutobus;

    var oComboBajaAutobusesRevisados=document.frmBajaMantenimiento.comboAutobusRevisado;
    var oComboModificarAutobusesRevisados=document.frmModificarMantenimiento.comboAutobusRevisado;

    if(oComboBajaAutobus.firstChild){
        oComboBajaCliente.firstChild.selected;// seleccionar el primero al cargar el programa
        oComboModificaCliente.firstChild.selected;// seleccionar el primero al cargar el programa
        oComboAutobusMantenimiento.firstChild.selected;

        var oAutobus=oGestion.buscarAutobus(frmAutobusModificar.comboAutobus.value);
        if(oAutobus)
        {
        frmAutobusModificar.txtAutobusMatricula.value=oAutobus.matricula;
        frmAutobusModificar.txtAutobusAsientos.value=oAutobus.asientos;
        frmAutobusModificar.txtAutobusModelo.value=oAutobus.modelo;
        frmAutobusModificar.txtAutobusConsumo.value=oAutobus.consumo;

        frmAutobusBaja.txtAutobusMatricula.value=oAutobus.matricula;
        frmAutobusBaja.txtAutobusAsientos.value=oAutobus.asientos;
        frmAutobusBaja.txtAutobusModelo.value=oAutobus.modelo;
        frmAutobusBaja.txtAutobusConsumo.value=oAutobus.consumo;
        }
    }
    else
    {
        frmAutobusModificar.txtAutobusMatricula.value=null;
        frmAutobusModificar.txtAutobusAsientos.value=null;
        frmAutobusModificar.txtAutobusModelo.value=null;
        frmAutobusModificar.txtAutobusConsumo.value=null;

        frmAutobusBaja.txtAutobusMatricula.value=null;
        frmAutobusBaja.txtAutobusAsientos.value=null;
        frmAutobusBaja.txtAutobusModelo.value=null;
        frmAutobusBaja.txtAutobusConsumo.value=null;
    }

    if (oComboBajaAutobusesRevisados.firstChild)
    {
        oComboBajaAutobusesRevisados.firstChild.selected;
        oComboModificarAutobusesRevisados.firstChild.selected;

        var oMantenimiento=oGestion.buscarMantenimiento(frmModificarMantenimiento.comboAutobusRevisado.value);

        if(oMantenimiento)
        {

        
        frmModificarMantenimiento.txtDescripcionMantenimiento.value=oMantenimiento.descripcion;
        frmModificarMantenimiento.txtImporteMantenimiento.value=oMantenimiento.importe;
        frmModificarMantenimiento.txtMantenimientoFecha.value=oMantenimiento.fecha;

        frmBajaMantenimiento.txtDescripcionMantenimiento.value=oMantenimiento.descripcion;
        frmBajaMantenimiento.txtImporteMantenimiento.value=oMantenimiento.importe;
        frmBajaMantenimiento.txtMantenimientoFecha.value=oMantenimiento.fecha;

    }

     }   

     else{
        frmModificarMantenimiento.txtDescripcionMantenimiento.value=null;
        frmModificarMantenimiento.txtImporteMantenimiento.value=null;
        frmModificarMantenimiento.txtMantenimientoFecha.value=null;

        frmBajaMantenimiento.txtDescripcionMantenimiento.value=null;
        frmBajaMantenimiento.txtImporteMantenimiento.value=null;
        frmBajaMantenimiento.txtMantenimientoFecha.value=null;
     }



 }
function calcularImporteAlquilerConductor(sHoras)
{
    return parseFloat(sHoras*8);
}

function calcularImporteAlquileEmpresa(numAutobuses, sHoras, kms)
{
    return parseFloat( (numAutobuses*10*sHoras)+ (2*kms) );
}

// EXPRESIONES REGULARES

var oExpRegDni = /^\d{8}[a-zA-Z]$/; //8 num y una letra DNI

var oExpRegNombre = /^[a-z\s]{3,20}$/i; //ENTRE 3 y 20 CARACTERES

var oExpRegApellidos = /^([a-zA-Z]\s?)+\s*$/; //puede tener un espacio

var oExpRegCorreo = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i; //EMAIL CORREO

var oExpRegTelefono = /^(\+34|0034|34)?[6|7|9][0-9]{8}$/; //TELEFONOS ESPAÑOLES

var oExpRegularNumCuenta = /^\d{20}$/; //numero de cuenta 20 numeros fijos //ej: 09876543211234567890

var oExpRegEsNumero=/^\d{1,20}$/; //es un numero entre 1 y 20

var oExpRegMatricula=/^\d{4}[A-Z]{3}/; // 4 numeros y 3 letras mayusculas

var oExpRegModelo=/^[a-z\s\d-]{3,20}$/i; // entre 3 y 20 caracteres con numeros


var oExpRegDate=/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{4})*$/; //mm/dd/yyyy

var oExpRegNumAsientos=/^[3-4-5]+[\d]+/;  // numero entre 30 y 60 sin incluir el 60

var oExpRegConsumo=/^\d{1,2}([.]\d{1})?$/; // un numero entero y posibilidad de un decimal separado por .

var oExpRegDescripcion=/^[a-z\s\d-]{3,50}$/i; // entre 3 y 50 caracteres con numeros

var oExpRegImporte=/^\d{1,3}([.]\d{1}\d?)?$/; // un numero entero y posibilidad de un decimal separado por .

//var oExpRegFecha = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/; //mm/dd/yyyy