/*datos de prueba
var oAutobus1=new Autobus("4444HTH",30,"asdasd",8);
var oAutobus2=new Autobus("5555RGD",25,"PPPPP",7);

var oMantenimiento44=new Mantenimiento("Cambio de aceite",55,"06/02/2018","4444HTH");

oGestion.altaAutobus(oAutobus1);
oGestion.altaAutobus(oAutobus2);
oGestion.altaMantenimiento(oMantenimiento44);
//console.log(oMantenimiento44.fecha);

$("#buscarAutobus").click(buscaCamposAutobus);
var oFormTarget=null;
/*var oBtnDarAltaAutobus=document.getElementById("btnAltaAutobus");
oBtnDarAltaAutobus.addEventListener("click",fAltaAutobus,false);

var oBtnDarBajaAutobus=document.getElementById("btnBajaAutobus");
oBtnDarBajaAutobus.addEventListener("click",fBajaAutobus,false);

var oBtnModificarAutobus=document.getElementById("btnModificarAutobus");
oBtnModificarAutobus.addEventListener("click",fModificarAutobus,false);

var oBtnAltaMantenimiento=document.getElementById("btnAltaMantenimiento");
oBtnAltaMantenimiento.addEventListener("click",fAltaMantenimiento,false);

var oBtnBajaMantenimiento=document.getElementById("btnBajaMantenimiento");
oBtnBajaMantenimiento.addEventListener("click",fBajaMantenimiento,false);

var oBtnModificarMantenimiento=document.getElementById("btnModificarMantenimiento");
oBtnModificarMantenimiento.addEventListener("click",fModificarMantenimiento,false);

var oComboBajaAutobus=document.frmAutobusBaja.comboAutobus;
var oComboModificaAutobus=document.frmAutobusModificar.comboAutobus;
var oComboAltaMantenimiento=document.frmAltaMantenimiento.comboAutobus;
var oComboAutobusRevisado=document.frmBajaMantenimiento.comboAutobusRevisado;
var oComboAutobusRevisado2=document.frmModificarMantenimiento.comboAutobusRevisado;
var oRadioMantenimientoSeleccion=document.frmAutobusMantenimiento.rdMantenimientoSeleccion;

//oComboBajaAutobus.addEventListener("change", rellenaCamposAutobus, false);
oComboModificaAutobus.addEventListener("change", rellenaCamposAutobus, false);
oComboAutobusRevisado.addEventListener("change", rellenaCamposMantenimiento, false);
oComboAutobusRevisado2.addEventListener("change", rellenaCamposMantenimiento, false);

oRadioMantenimientoSeleccion=document.getElementById("rdMantenimientoSeleccion");
oRadioMantenimientoSeleccion.addEventListener("click", muestraFormsMantenimiento, false);
oRadioMantenimientoSeleccion1=document.getElementById("rdMantenimientoSeleccion1");
oRadioMantenimientoSeleccion1.addEventListener("click", muestraFormsMantenimiento1, false);
oRadioMantenimientoSeleccion2=document.getElementById("rdMantenimientoSeleccion2");
oRadioMantenimientoSeleccion2.addEventListener("click", muestraFormsMantenimiento2, false);


comboEstadoInicialAutubuses();
*/



function fAltaAutobus(oEvento){

    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el boton
	/////////////validar formulario///////////////////
    if (validarAutobus(oForm)){

    	var sMatriculaAutobus=frmAutobusAlta.txtAutobusMatricula.value.trim();
        var iAsientosAutobus=parseInt(frmAutobusAlta.txtAutobusAsientos.value.trim());
        var sModeloAutobus=frmAutobusAlta.txtAutobusModelo.value.trim();
        var fConsumoAutobus=parseFloat(frmAutobusAlta.txtAutobusConsumo.value.trim());

        var oNuevoAutobus=new Autobus(sMatriculaAutobus,iAsientosAutobus,sModeloAutobus,fConsumoAutobus);
        var datos="autobus="+JSON.stringify(oNuevoAutobus);

        $.post("php/altaAutobus.php",datos,mostrarMensajeAccion,"json");
        oFormTarget=oForm;
        //$.post("php/altaAutobus.php",$( "#frmAutobusAlta" ).serialize(),);
/*
        var bInsercion=oGestion.altaAutobus(oNuevoAutobus);
        if (bInsercion)
        {
        	document.frmAutobusAlta.reset();
        	document.frmAutobusAlta.style.display="none";
        	mensaje("Autobus dado de alta correctamente");
        }
        else
        	mensaje("Ya existe un autobus con esa matrícula");*/
    }
}

function fBajaAutobus(oEvento)
{
    var oE = oEvento || windows.event;
    oFormTarget=oE.target.parentNode.parentNode.parentNode;

	var sMatriculaAutobus=frmAutobusBaja.txtAutobusMatricula.value.trim();
    //console.log(sMatriculaAutobus);

	var oNuevoAutobus=new Autobus(sMatriculaAutobus,"","","");
    var datos="autobus="+JSON.stringify(oNuevoAutobus);

    $.post("php/bajaAutobus.php",datos,mostrarMensajeAccion,"json");

/*
	var bBaja=oGestion.bajaAutobus(oNuevoAutobus);

	  if(bBaja)
        {
            mensaje("Autobus con matricula "+sMatriculaAutobus+" dado de baja correctamente");
            document.frmAutobusBaja.style.display="none";
            comboEstadoInicialAutubuses(); //vuelve a seleccionar el primero del combo
        }
        else
            mensaje("Error al dar de baja: "+sMatriculaAutobus); */     
    
}

function fModificarAutobus(oEvento)
{
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el boton
    oFormTarget=oForm;

    if (validarAutobus(oForm)){
        var sMatriculaAutobus=frmAutobusModificar.txtAutobusMatriculaB.value.trim();
        var iAsientosAutobus=parseInt(frmAutobusModificar.txtAutobusAsientos.value.trim());
        var sModeloAutobus=frmAutobusModificar.txtAutobusModelo.value.trim();
        var iConsumoAutobus=parseFloat(frmAutobusModificar.txtAutobusConsumo.value.trim());

        var oNuevoAutobus=new Autobus(sMatriculaAutobus,iAsientosAutobus,sModeloAutobus,iConsumoAutobus);
        var datos="autobus="+JSON.stringify(oNuevoAutobus);

        $.post("php/modificarAutobus.php",datos,mostrarMensajeAccion,"json");

        /*
        var bInsercion=oGestion.modificarAutobus(oNuevoAutobus);
        if (bInsercion)
        {
            document.frmAutobusModificar.reset();
            document.frmAutobusModificar.style.display="none";
            mensaje("Autobús modificado correctamente");
            comboEstadoInicialAutubuses();
        }
        else
            mensaje("No se ha podido modificar el autobús");*/
    }
}

function fAltaMantenimiento(oEvento)
{
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode;
    oFormTarget=oForm; //recupera el formulario padre sobre el que esta el boton

    if (validarMantenimiento(oForm)){
        var sDescripcion=frmAltaMantenimiento.txtDescripcionMantenimiento.value.trim();
        var fImporte=parseFloat(frmAltaMantenimiento.txtImporteMantenimiento.value.trim());
        //var dFecha=new Date(frmAltaMantenimiento.txtMantenimientoFecha.value.trim()).toLocaleDateString("es-ES");
        var dFecha=frmAltaMantenimiento.txtMantenimientoFecha.value.trim();
        var sMatricula=frmAltaMantenimiento.txtAutobusMantenimiento.value.trim();

        //dFecha.toLocaleDateString("es-ES");
        //console.log(dFecha);
        //console.log(sMatricula);
        var oNuevoMantenimiento=new Mantenimiento(sDescripcion,fImporte,dFecha,sMatricula);
        console.log(oNuevoMantenimiento);
        var datos="mantenimiento="+JSON.stringify(oNuevoMantenimiento);

        $.post("php/altaMantenimiento.php",datos,mostrarMensajeAccion,"json");

        //console.log(oNuevoMantenimiento.fecha);
        /*var bInsercion=oGestion.altaMantenimiento(oNuevoMantenimiento);
        if(bInsercion){
            document.frmAltaMantenimiento.reset();
            document.frmAltaMantenimiento.style.display="none";
            document.frmAutobusMantenimiento.style.display="none";

            comboEstadoInicialAutubuses(); 
            //oGestion.actualizaComboRevisado();
            
            oGestion.gestionContabilidad("mantenimiento", oGestion.cuentaEmpresa.numCuenta, fImporte, dFecha);
            
            
            mensaje("Mantenimiento añadido correctamente");
            //actualizar combo mantenimientos
        }
        else
            mensaje("El autobús seleccionado ya tiene pasado el mantenimiento");*/
    }
}

function fBajaMantenimiento(oEvento)
{
    //var sMatricula=frmBajaMantenimiento.comboAutobusRevisado.value.trim();
    var oE = oEvento || windows.event;
    oFormTarget=oE.target.parentNode.parentNode.parentNode;

    var sMatriculaAutobus=frmBajaMantenimiento.txtAutobusMantenimiento.value.trim();
    //console.log(sMatriculaAutobus);

    var oNuevoMantenimiento=new Mantenimiento("","","",sMatriculaAutobus);
    var datos="mantenimiento="+JSON.stringify(oNuevoMantenimiento);

    $.post("php/bajaMantenimiento.php",datos,mostrarMensajeAccion,"json");
    /*var anulado=oGestion.bajaMantenimiento(sMatricula);
    if (anulado)
    {
        mensaje("Mantenimiento anulado correctamente");
        comboEstadoInicialAutubuses();
    }
    
    else
        mensaje("Error al anular el mantenimiento");*/

}

function fModificarMantenimiento(oEvento)
{
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el boton

    if (validarMantenimiento(oForm)){
        var sDescripcion=frmModificarMantenimiento.txtDescripcionMantenimiento.value.trim();
        var sMatricula=frmModificarMantenimiento.txtAutobusMantenimiento.value.trim();
        var fImporte=parseFloat(frmModificarMantenimiento.txtImporteMantenimiento.value.trim());
        var dFecha=frmModificarMantenimiento.txtMantenimientoFechaN.value.trim();
        //console.log(sMatricula);
        if(dFecha=="")
        {
            //dFecha=new Date(frmModificarMantenimiento.txtMantenimientoFecha.value.trim()).toLocaleDateString("es-ES");
            dFecha=frmModificarMantenimiento.txtMantenimientoFecha.value.trim();
        }
        else{
             //dFecha=new Date(dFecha).toLocaleDateString("es-ES");
             dFecha=dFecha;
        }
        //console.log(dFecha);
        var oNuevoMantenimiento=new Mantenimiento(sDescripcion,fImporte,dFecha,sMatricula);
        oFormTarget=oForm;

        var datos="mantenimiento="+JSON.stringify(oNuevoMantenimiento);
        $.post("php/modificarMantenimiento.php",datos,mostrarMensajeAccion,"json");
        /*
        var bModificado=oGestion.modificarMantenimiento(oMantenimiento);
        if( bModificado)
        {
            document.frmModificarMantenimiento.reset();
            document.frmModificarMantenimiento.style.display="none";
            document.frmAutobusMantenimiento.style.display="none";
            mensaje("Mantenimiento modificado correctamente");

            comboEstadoInicialAutubuses();
            //oGestion.actualizaComboRevisado();

        }
        else
            mensaje("Error al modificar el mantenimiento");*/
    }
}



function rellenaCamposAutobus(oEvento) //actualiza
{
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el combo
    //console.log(oForm.name);
    //var oAutobus=oGestion.buscarAutobus(oForm.comboAutobus.value);//recupera el autobus a traves de la matricula
     oForm.txtAutobusMatricula.value=oAutobus.matricula;
     oForm.txtAutobusAsientos.value=oAutobus.asientos;
     oForm.txtAutobusModelo.value=oAutobus.modelo;
     oForm.txtAutobusConsumo.value=oAutobus.consumo;

}

function rellenaCamposMantenimiento(oForm,oAutobus) //actualiza
{
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el combo
    //console.log(oForm.name);
    //console.log(oForm.comboAutobusRevisado.value);
    var oMantenimiento=oGestion.buscarMantenimiento(oForm.comboAutobusRevisado.value);//recupera el autobus a traves de la matricula

    //console.log(oMantenimiento.fecha);
     oForm.txtDescripcionMantenimiento.value=oMantenimiento.descripcion;
     oForm.txtImporteMantenimiento.value=oMantenimiento.importe;
     oForm.txtMantenimientoFecha.value=oMantenimiento.fecha;

}

function muestraFormsMantenimiento()
{
    document.frmAltaMantenimiento.style.display="block";
    document.frmBajaMantenimiento.style.display="none";
    document.frmModificarMantenimiento.style.display="none";
    /*
    if(oRadioMantenimientoSeleccion.value=="Alta"){
        document.frmAltaMantenimiento.style.display="block";
        document.frmBajaMantenimiento.style.display="none";
        document.frmModificarMantenimiento.style.display="none";
    }
    else if(oRadioMantenimientoSeleccion.value=="Baja"){
            document.frmAltaMantenimiento.style.display="none";
            document.frmBajaMantenimiento.style.display="block";
            document.frmModificarMantenimiento.style.display="none";
        }
        else{
            document.frmAltaMantenimiento.style.display="none";
            document.frmBajaMantenimiento.style.display="none";
            document.frmModificarMantenimiento.style.display="block";
        }

    */
}

function muestraFormsMantenimiento1()
{
    document.frmAltaMantenimiento.style.display="none";
    document.frmBajaMantenimiento.style.display="block";
    document.frmModificarMantenimiento.style.display="none";
    
}
function muestraFormsMantenimiento2()
{
    document.frmAltaMantenimiento.style.display="none";
    document.frmBajaMantenimiento.style.display="none";
    document.frmModificarMantenimiento.style.display="block";
    
}

function validarMantenimiento(oForm)
{
    var bValidacion=true;
    var sError="";

    //Descripcion
    var sDescripcion=oForm.txtDescripcionMantenimiento.value.trim();
    oForm.txtDescripcionMantenimiento.value=oForm.txtDescripcionMantenimiento.value.trim();

    if(!oExpRegDescripcion.test(sDescripcion))
    {
        oForm.txtDescripcionMantenimiento.parentNode.parentNode.classList.add("has-error");
        oForm.txtDescripcionMantenimiento.focus();
        sError="La descripción debe tener entre 3 y 50 caracteres incluyendo números y -";
        falloValidacion(sError,oForm.txtDescripcionMantenimiento);
        bValidacion=false;
    }
    else
    {
         oForm.txtDescripcionMantenimiento.parentNode.parentNode.classList.remove("has-error");
         falloValidacion("",oForm.txtDescripcionMantenimiento);
    }

    var fImporte=oForm.txtImporteMantenimiento.value.trim();
    oForm.txtImporteMantenimiento.value=oForm.txtImporteMantenimiento.value.trim();

    if(!oExpRegImporte.test(fImporte))
    {
        oForm.txtImporteMantenimiento.parentNode.parentNode.classList.add("has-error");
        oForm.txtImporteMantenimiento.focus();
        sError="El importe debe constar de como máximo 3 números enteros y 2 decimales";
        falloValidacion(sError,oForm.txtImporteMantenimiento);
        bValidacion=false;
    }
    else
    {
         oForm.txtImporteMantenimiento.parentNode.parentNode.classList.remove("has-error");
         falloValidacion("",oForm.txtImporteMantenimiento);
    }


    if(oForm.name=="frmAltaMantenimiento"){
        var fecha=oForm.txtAltaMantenimientoFecha.value.trim();
        oForm.txtAltaMantenimientoFecha.value=oForm.txtAltaMantenimientoFecha.value.trim();


            if(fecha=="")
            {
                oForm.txtAltaMantenimientoFecha.parentNode.parentNode.classList.add("has-error");
                oForm.txtAltaMantenimientoFecha.focus();
                sError="Debe seleccionar una fecha";
                falloValidacion(sError,oForm.txtAltaMantenimientoFecha);
                bValidacion=false;
            }
            else
            {
                 oForm.txtAltaMantenimientoFecha.parentNode.parentNode.classList.remove("has-error");
                 falloValidacion("",oForm.txtAltaMantenimientoFecha);
            }
    }

     return bValidacion;
}


function validarAutobus(oForm)
{
    var bValidacion=true;
    var sError="";

    //Matricula
    var sMatricula=oForm.txtAutobusMatricula.value.trim();
    oForm.txtAutobusMatricula.value=oForm.txtAutobusMatricula.value.trim();

    if(!oExpRegMatricula.test(sMatricula))
    {
        oForm.txtAutobusMatricula.parentNode.parentNode.classList.add("has-error");
        oForm.txtAutobusMatricula.focus();
        sError="La matricula debe tener 4 numeros y 3 letras mayúsculas";
        falloValidacion(sError,oForm.txtAutobusMatricula);
        bValidacion=false;
    }
    else
    {
         oForm.txtAutobusMatricula.parentNode.parentNode.classList.remove("has-error");
         falloValidacion("",oForm.txtAutobusMatricula);
    }

    //num asientos
    var iNumAsientos=oForm.txtAutobusAsientos.value.trim();
    oForm.txtAutobusAsientos.value=oForm.txtAutobusAsientos.value.trim();

    if(!oExpRegNumAsientos.test(iNumAsientos))
    {
        oForm.txtAutobusAsientos.parentNode.parentNode.classList.add("has-error");
        oForm.txtAutobusAsientos.focus();
        sError="El número de asientos debe estar entre 30 y 60";
        falloValidacion(sError,oForm.txtAutobusAsientos);
        bValidacion=false;
    }
    else
    {
         oForm.txtAutobusAsientos.parentNode.parentNode.classList.remove("has-error");
         falloValidacion("",oForm.txtAutobusAsientos);
    }

    //MARCA
    var sModelo=oForm.txtAutobusModelo.value.trim();
    oForm.txtAutobusModelo.value=oForm.txtAutobusModelo.value.trim();

    if(!oExpRegModelo.test(sModelo))
    {
        oForm.txtAutobusModelo.parentNode.parentNode.classList.add("has-error");
        oForm.txtAutobusModelo.focus();
        sError="El modelo debe estar entre 3 y 20 caracteres";
        falloValidacion(sError,oForm.txtAutobusModelo);
        bValidacion=false;
    }
    else
    {
         oForm.txtAutobusModelo.parentNode.parentNode.classList.remove("has-error");
         falloValidacion("",oForm.txtAutobusModelo);
    }

    //CONSUMO
    var fConsumo=parseFloat(oForm.txtAutobusConsumo.value.trim());
    oForm.txtAutobusConsumo.value=oForm.txtAutobusConsumo.value.trim();

    if(!oExpRegConsumo.test(fConsumo))
    {
        oForm.txtAutobusConsumo.parentNode.parentNode.classList.add("has-error");
        oForm.txtAutobusConsumo.focus();
        sError="El consumo debe tener 1 o 2 caracteres enteros y uno decimal";
        falloValidacion(sError,oForm.txtAutobusConsumo);
        bValidacion=false;
    }
    else
    {
         oForm.txtAutobusConsumo.parentNode.parentNode.classList.remove("has-error");
         falloValidacion("",oForm.txtAutobusConsumo);
    }


    return bValidacion;
    
}
function buscaCamposAutobus(oEvento){
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode;
    var datos="datos="
    datos+=oForm.txtAutobusMatriculaB.value;

    $.get("php/rellenaAutobus.php",datos,function(oRespuesta, sStatus, oAjax){
   
    //console.log(oRespuesta);
    //console.log(oForm.txtAutobusMatricula);
    if(oRespuesta.matricula==undefined)
        mensaje("No se encuentra autobus con esa matricula");
    else{
     oForm.txtAutobusMatricula.value=oRespuesta.matricula;
     oForm.txtAutobusAsientos.value=oRespuesta.asientos;
     oForm.txtAutobusModelo.value=oRespuesta.modelo;
     oForm.txtAutobusConsumo.value=oRespuesta.consumo;
    }
    },"json");
}

function buscaCamposMantenimiento(oEvento){
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode;
    var datos="datos="
    datos+=oForm.txtAutobusMantenimiento.value;

    $.get("php/rellenaMantenimiento.php",datos,function(oRespuesta, sStatus, oAjax){
   
    //console.log(oRespuesta);
    //console.log(oForm.txtAutobusMatricula);
    if(oRespuesta.descripcion==undefined)
        mensaje("No se encuentra mantenimiento con esa matricula");
    else{
     oForm.txtDescripcionMantenimiento.value=oRespuesta.descripcion;
     oForm.txtImporteMantenimiento.value=oRespuesta.importe;
     oForm.txtMantenimientoFecha.value=oRespuesta.fecha;
    }

    },"json");
}

function mostrarMensajeAccion(oRespuesta, sStatus, oAjax){
    if(oRespuesta[0]){
        oFormTarget.reset();
        oFormTarget.style.display="none";
    }
    buscarAutobuses();
    mensaje(oRespuesta[1]);
    oFormTarget=null;
}