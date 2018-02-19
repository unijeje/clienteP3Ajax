var oGestion=new Gestion();

//botones principales
var bGestionClienteCargado=false;
$("#menuAltaCliente").click(cargaAltaCliente);
$("#menuBajaCliente").click(cargaBajaCliente);
$("#menuModificaCliente").click(cargaModificaCliente);

var bGestionAlquilerCargado=false;
$("#menuAltaAlquiler").click(cargaAltaAlquiler);
$("#menubajaAlquiler").click(cargaBajaAlquiler);
$("#menuModificaAlquiler").click(cargaModificaAlquiler);

var bGestionConductorCargado=false;
$("#menuAltaConductor").click(cargarAltaConductor);
$("#menuBajaConductor").click(cargarBajaConductor);
$("#menuModificarConductor").click(cargarModificarConductor);

function mostrarFormulario(sForm)
{
    $("form:not('#"+sForm+"')").hide("normal");
    $("#resultadoListados").hide("normal");
    $("#panelMensajes").hide("normal");
    $("#formulario").show("normal");
}

function cargaAltaAlquiler()
{
    mostrarFormulario("frmNuevoAlquiler");
    // Verifico si ya he cargado el formulario antes, si lo ha cargado antes lo muestra. Si no lo ha cargado antes trae el formulario y mira si ya se habia traido el codigo js correspondiente
    // si se ha traido el codigo javascript de otro formulario solo asigna eventlistener, si no se trae el js
    if ($('#frmNuevoAlquiler').length == 0) {
        $("<div>").appendTo('#formulario').load("formu/altaAlquiler.html", function()
        {
            if(bGestionAlquilerCargado)
            {
                buscarClientes();
                buscarConductores();
                buscarAutobuses();
                var oBtnDarAltaAlquiler=document.getElementById("btnAltaAlquiler");
                oBtnDarAltaAlquiler.addEventListener("click", altaAlquiler, false);
                
            }
            else
            {
                buscarClientes();
                $.getScript("js/gestion/gestionAlquiler.js", function(){
                    buscarClientes();
                    buscarConductores();
                    buscarAutobuses();
                    bGestionAlquilerCargado=true;
                    var oBtnDarAltaAlquiler=document.getElementById("btnAltaAlquiler");
                    oBtnDarAltaAlquiler.addEventListener("click", altaAlquiler, false);
                    
                    
                });
            }
            
        });
    } else {
        // Lo muestro si está oculto
        $('#frmNuevoAlquiler').show("normal");
    }
}

function cargaBajaAlquiler()
{
    mostrarFormulario("frmBorraAlquiler");
    // Verifico si ya he cargado el formulario antes, si lo ha cargado antes lo muestra. Si no lo ha cargado antes trae el formulario y mira si ya se habia traido el codigo js correspondiente
    // si se ha traido el codigo javascript de otro formulario solo asigna eventlistener, si no se trae el js
    if ($('#frmBorraAlquiler').length == 0) {
        $("<div>").appendTo('#formulario').load("formu/borraAlquiler.html", function()
        {
            if(bGestionAlquilerCargado)
            {
                buscarAlquileres();
                document.frmBorraAlquiler.buscarAlquiler.addEventListener("click", rellenaCamposAlquiler, false);
                var oBajaAlquiler=document.getElementById("btnBorrarAlquiler");
                oBajaAlquiler.addEventListener("click", bajaAlquiler, false);
            }
            else
            {
                $.getScript("js/gestion/gestionAlquiler.js", function(){
                    buscarAlquileres();
                    document.frmBorraAlquiler.buscarAlquiler.addEventListener("click", rellenaCamposAlquiler, false);
                    bGestionAlquilerCargado=true;
                    var oBajaAlquiler=document.getElementById("btnBorrarAlquiler");
                    oBajaAlquiler.addEventListener("click", bajaAlquiler, false);
                });
            }
            
        });
    } else {
        // Lo muestro si está oculto
        $('#frmBorraAlquiler').show("normal");
    }
}

function cargaModificaAlquiler()
{
    mostrarFormulario("frmModificarAlquiler");
    // Verifico si ya he cargado el formulario antes, si lo ha cargado antes lo muestra. Si no lo ha cargado antes trae el formulario y mira si ya se habia traido el codigo js correspondiente
    // si se ha traido el codigo javascript de otro formulario solo asigna eventlistener, si no se trae el js
    if ($('#frmModificarAlquiler').length == 0) {
        $("<div>").appendTo('#formulario').load("formu/modificaAlquiler.html", function()
        {
            if(bGestionAlquilerCargado)
            {
                buscarAlquileres();
                buscarClientes();
                buscarConductores();
                buscarAutobuses();
                document.frmModificarAlquiler.buscarAlquiler.addEventListener("click", rellenaCamposAlquiler, false);
                var oModificarAlquiler=document.getElementById("btnModificarAlquiler");
                oModificarAlquiler.addEventListener("click", modificarAlquiler, false);
            }
            else
            {
                $.getScript("js/gestion/gestionAlquiler.js", function(){
                    buscarAlquileres();
                    buscarClientes();
                    buscarConductores();
                    buscarAutobuses();
                    document.frmModificarAlquiler.buscarAlquiler.addEventListener("click", rellenaCamposAlquiler, false);
                    bGestionAlquilerCargado=true;
                    var oModificarAlquiler=document.getElementById("btnModificarAlquiler");
                    oModificarAlquiler.addEventListener("click", modificarAlquiler, false);
                });
            }
            
        });
    } else {
        // Lo muestro si está oculto
        $('#frmModificarAlquiler').show("normal");
    }
}


function cargaAltaCliente()
{
    mostrarFormulario("frmClienteAlta");
    // Verifico si ya he cargado el formulario antes, si lo ha cargado antes lo muestra. Si no lo ha cargado antes trae el formulario y mira si ya se habia traido el codigo js correspondiente
    // si se ha traido el codigo javascript de otro formulario solo asigna eventlistener, si no se trae el js
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
                buscarClientes();
                var oBtnDarBajaCliente=document.getElementById("btnBajaCliente");
                oBtnDarBajaCliente.addEventListener("click", bajaCliente, false);
                document.frmClienteBaja.buscarCliente.addEventListener("click", rellenaCamposCliente, false);
            }
            else
            {
            $.getScript("js/gestion/gestionCliente.js", function(){
                bGestionClienteCargado=true;
                buscarClientes();
                var oBtnDarBajaCliente=document.getElementById("btnBajaCliente");
                oBtnDarBajaCliente.addEventListener("click", bajaCliente, false);
                //document.frmClienteBaja.txtClienteDni.addEventListener("change", rellenaCamposCliente, false);
                document.frmClienteBaja.buscarCliente.addEventListener("click", rellenaCamposCliente, false);
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
                buscarClientes();
                var oBtnActualizarCliente=document.getElementById("btnModificarCliente");
                oBtnActualizarCliente.addEventListener("click", actualizaCliente, false);
                document.frmClienteModificar.buscarCliente.addEventListener("click", rellenaCamposCliente, false);
            }
            else
            {
            $.getScript("js/gestion/gestionCliente.js", function(){
                bGestionClienteCargado=true;
                buscarClientes();
                var oBtnActualizarCliente=document.getElementById("btnModificarCliente");
                oBtnActualizarCliente.addEventListener("click", actualizaCliente, false);
                document.frmClienteModificar.buscarCliente.addEventListener("click", rellenaCamposCliente, false);
                });
            }
        });
    } else {
        // Lo muestro si está oculto
        $('#frmClienteModificar').show("normal");
    }
}

function cargarAltaConductor(){
	mostrarFormulario("frmConductorAlta");
	
	if($("#frmConductorAlta").length==0){
		$("<div>").appendTo("#formulario").load("formu/altaConductor.html", function(){
			if(bGestionConductorCargado){
				var oBtnAltaConductor= document.getElementById("btnAltaConductor");
				oBtnAltaConductor.addEventListener("click",altaConductor,false);
			} else{
				$.getScript("js/gestion/gestionConductor.js", function(){
					bGestionConductorCargado= true;
					var oBtnAltaConductor= document.getElementById("btnAltaConductor");
					oBtnAltaConductor.addEventListener("click",altaConductor,false);
				});
			}
		});
	} else{
		$("#frmConductorAlta").show("normal");
	}
}

function cargarBajaConductor(){
	mostrarFormulario("frmConductorBaja");
	
	if($("#frmConductorBaja").length==0){
		$("<div>").appendTo("#formulario").load("formu/bajaConductor.html", function(){
			if(bGestionConductorCargado){
				//buscarConductores();
				var oBtnBajaConductor= document.getElementById("btnBajaConductor");
				oBtnBajaConductor.addEventListener("click",bajaConductor,false);
				//document.frmConductorBaja.buscarConductor.addEventListener("click",rellenaCamposConductor,false);
			} else{
				$.getScript("js/gestion/gestionConductor.js", function(){
					bGestionConductorCargado=true;
					//buscarConductores();
					var oBtnBajaConductor= document.getElementById("btnBajaConductor");
					oBtnBajaConductor.addEventListener("click",bajaConductor,false);
					//document.frmConductorBaja.buscarConductor.addEventListener("click",rellenaCamposConductor,false);
				});
			}
		});
	} else{
		$("frmConductorBaja").show("normal");
	}
}

function cargarModificarConductor(){
	mostrarFormulario("frmConductorModificar");
	
	if($("#frmConductorModificar").length==0){
		$("<div>").appendTo("#formulario").load("formu/modificaConductor.html", function(){
			if(bGestionConductorCargado){
				//buscarConductores();
				var oBtnModificarConductor= document.getElementById("btnModificarConductor");
				oBtnModificarConductor.addEventListener("click",modificarConductor,false);
				//document.frmConductorModificar.buscarConductor.addEventListener("click",rellenaCamposConductor,false);
			} else{
				$.getScript("js/gestion/gestionConductor.js", function(){
					bGestionConductorCargado=true;
					//buscarConductores();
					var oBtnModificarConductor= document.getElementById("btnModificarConductor");
					oBtnModificarConductor.addEventListener("click",modificarConductor,false);
					//document.frmConductorModificar.buscarConductor.addEventListener("click",rellenaCamposConductor,false);
				});
			}
		});
	} else{
		$("frmConductorModificar").show("normal");
	}
}

//botones Listados
var oBtnListadoAutobuses=document.getElementById("btnListadoAutobuses");
oBtnListadoAutobuses.addEventListener("click",mostrarListadoAutobuses,false);

var oBtnListadoClientes=document.getElementById("btnListadoClientes");
oBtnListadoClientes.addEventListener("click",mostrarListadoClientes,false);
//filtrado
$( document ).ready(function() {
    $("#btnFiltrarNombre").click(function(){
         filtrarNombreCliente();        
    });
});

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
    $("#panelCliente").hide("normal");
}

function mostrarListadoClientes()
{
    $("#formulario").hide("normal");
    listadoClientes();
    $("#panelCliente").show("normal");
    oCapaListado.style.display="block";
}

function mostrarListadoConductores()
{
    $("#formulario").hide("normal");
    listadoConductores();
    oCapaListado.style.display="block";
    $("#panelCliente").hide("normal");
}

function mostrarListadoVacaciones()
{
    $("#formulario").hide("normal");
	listadoVacaciones();
    oCapaListado.style.display="block";
    $("#panelCliente").hide("normal");
}

function mostrarListadoAlquileres()
{
    $("#formulario").hide("normal");
    listadoAlquileres();
    oCapaListado.style.display="block";
    $("#panelCliente").hide("normal");
}

//eliminar dialogo que se pase como string
function cerrarDialogo(sDialog)
{
	
	$("#"+sDialog).dialog('destroy').remove();
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

var oExpRegFecha = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/