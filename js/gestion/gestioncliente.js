

/*
var oBtnDarAltaCliente=document.getElementById("btnAltaCliente");
oBtnDarAltaCliente.addEventListener("click", altaCliente, false);
var oBtnDarBajaCliente=document.getElementById("btnBajaCliente");
oBtnDarBajaCliente.addEventListener("click", bajaCliente, false);

/*
var oBtnActualizarCliente=document.getElementById("btnModificarCliente");
oBtnActualizarCliente.addEventListener("click", actualizaCliente, false);
*/


//comboEstadoInicialClientes();
/*
var oBtnBuscarCliente=document.getElementById("buscarCliente");
oBtnBuscarCliente.addEventListener("click", buscarCliente, false);
*/

var oFormCliente;

function altaCliente(oEvento)
{
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el boton

    if(validarCliente(oForm))
    {
        var sDniCliente=frmClienteAlta.txtClienteDni.value.trim();
        var sNombreCliente=frmClienteAlta.txtClienteNombre.value.trim();
        var sApellidosCliente=frmClienteAlta.txtClienteApellidos.value.trim();
        var sTlfCliente=frmClienteAlta.txtClienteTelefono.value.trim();
        var sCorreoCliente=frmClienteAlta.txtClienteCorreo.value.trim();
        var sSexoCliente=frmClienteAlta.radioClienteSexo.value;

        var oCliente=new Cliente(sDniCliente, sNombreCliente, sApellidosCliente, sTlfCliente, sCorreoCliente, sSexoCliente);
        
        oGestion.altaCliente(oCliente);

    }
}

function validarCliente(oForm)
{
    var bValidacion=true;
    var sError="";

    //DNI
    var sDniCliente=oForm.txtClienteDni.value.trim();
    oForm.txtClienteDni.value=oForm.txtClienteDni.value.trim();

    if(!oExpRegDni.test(sDniCliente))
    {
        oForm.txtClienteDni.parentNode.parentNode.classList.add("has-error");
        oForm.txtClienteDni.focus();
        sError="El DNI tiene que ser 8 caracteres númericos y uno alfabético";
        falloValidacion(sError, oForm.txtClienteDni);
        bValidacion=false;
    }
    else
    {
        oForm.txtClienteDni.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtClienteDni); //vuelve a eliminar el mensaje
    }

    //NOMBRE
    var sNombreCliente=oForm.txtClienteNombre.value.trim();
    oForm.txtClienteNombre.value=oForm.txtClienteNombre.value.trim();

    if(!oExpRegNombre.test(sNombreCliente))
    {
        oForm.txtClienteNombre.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
            oForm.txtClienteNombre.focus();
        sError="El nombre del cliente tiene que ser entre 3 y 20 carácteres alfabéticos \n";
        falloValidacion(sError, oForm.txtClienteNombre);
        bValidacion=false;
    }
    else
    {
        oForm.txtClienteNombre.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtClienteNombre);
    }
    //Apellidos
    var sApellidosCliente=oForm.txtClienteApellidos.value.trim();
    oForm.txtClienteApellidos.value=oForm.txtClienteApellidos.value.trim();

    if(!oExpRegApellidos.test(sApellidosCliente))
    {
        oForm.txtClienteApellidos.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
            oForm.txtClienteApellidos.focus();
        sError="El Apellido del cliente tiene que ser entre 3 y 20 carácteres alfabéticos \n";
        falloValidacion(sError, oForm.txtClienteApellidos);
        bValidacion=false;
    }
    else
    {
        falloValidacion("", oForm.txtClienteApellidos);
        oForm.txtClienteApellidos.parentNode.parentNode.classList.remove("has-error");
    }
    //Tlf
    var sTlfCliente=oForm.txtClienteTelefono.value.trim();
    oForm.txtClienteTelefono.value=oForm.txtClienteTelefono.value.trim();

    if(!oExpRegTelefono.test(sTlfCliente))
    {
        oForm.txtClienteTelefono.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
            oForm.txtClienteTelefono.focus();
        sError="El Telefono no es correcto \n";
        falloValidacion(sError, oForm.txtClienteTelefono);
        bValidacion=false;
    }
    else
    {
        oForm.txtClienteTelefono.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtClienteTelefono);
    }
    //Correo
    var sCorreoCliente=oForm.txtClienteCorreo.value.trim();
    oForm.txtClienteCorreo.value=oForm.txtClienteCorreo.value.trim();

    if(!oExpRegCorreo.test(sCorreoCliente))
    {
        oForm.txtClienteCorreo.parentNode.parentNode.classList.add("has-error");
        if(bValidacion)
            oForm.txtClienteCorreo.focus();
        sError="El correo no es correcto";
        falloValidacion(sError, oForm.txtClienteCorreo);
        bValidacion=false;
    }
    else
    {
        oForm.txtClienteCorreo.parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.txtClienteCorreo);
    }


    //Genero
    var sSexoCliente=oForm.radioClienteSexo.value;
    var bSexoCliente=validarRadio(oForm.radioClienteSexo);

    if(!bSexoCliente)
    {
        oForm.radioClienteSexo[0].parentNode.parentNode.classList.add("has-error");
        sError="Debe seleccionar un genero";
        bValidacion=false;
        falloValidacion(sError, oForm.radioClienteSexo[0].parentNode);
    }
    else
    {   
        oForm.radioClienteSexo[0].parentNode.parentNode.classList.remove("has-error");
        falloValidacion("", oForm.radioClienteSexo[0].parentNode);
    }

    return bValidacion;
}

function bajaCliente()
{
    var sDniCliente=frmClienteBaja.txtClienteDni.value.trim();
    var oCliente=oGestion.buscarCliente(sDniCliente);
    if(oCliente==null)
        mensaje("Cliente con el DNI: "+sDniCliente+" no encontrado");
    else if(oCliente.estado==false)
        mensaje("Ese cliente ya ha sido dado de baja");
    else
    {
        var bBaja=oGestion.bajaCliente(oCliente);
        if(bBaja)
        {
            mensaje("Cliente "+sDniCliente+" dado de baja correctamente");
            document.frmClienteBaja.reset();
            document.frmClienteBaja.style.display="none";
            buscarClientes();
        }
        else
            mensaje("Error al dar de baja: "+sDniCliente);
            
    }
}

function actualizaCliente(oEvento)
{
    //console.log("actualziar");
    var oE = oEvento || windows.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el boton
    if(validarCliente(oForm))
    {
        /*
        var sDniCliente=frmClienteModificar.txtClienteDni.value.trim();
        var sNombreCliente=frmClienteModificar.txtClienteNombre.value.trim();
        var sApellidosCliente=frmClienteModificar.txtClienteApellidos.value.trim();
        var sTlfCliente=frmClienteModificar.txtClienteTelefono.value.trim();
        var sCorreoCliente=frmClienteModificar.txtClienteCorreo.value.trim();
        var sSexoCliente=frmClienteModificar.radioClienteSexo.value.trim();
        */
       var sDatos=$("#frmClienteModificar").serialize();

        //var oNuevoCliente=new Cliente(sDniCliente, sNombreCliente, sApellidosCliente, sTlfCliente, sCorreoCliente, sSexoCliente);
        
        oGestion.modificarCliente(sDatos);
        
        
        
    }
    
    
}

function rellenaCamposCliente(oEvento) //actualiza campos usando el dni del campo txtClienteDni del formulario del que se le ha enviado
{
    var oE = oEvento || window.event;
    var oForm=oE.target.parentNode.parentNode.parentNode; //recupera el formulario padre sobre el que esta el combo
    
    var oCliente=oGestion.buscarCliente(oForm.txtClienteDni.value);//recupera el conductor a traves del DNI
    //console.log(oForm);
    if(oCliente)
    {
        oForm.txtClienteDni.value=oCliente.dni;
        oForm.txtClienteNombre.value=oCliente.nombre;
        oForm.txtClienteApellidos.value=oCliente.apellidos;
        oForm.txtClienteTelefono.value=oCliente.tlf;
        oForm.txtClienteCorreo.value=oCliente.correo;
        if(oForm.id=="frmClienteModificar")
        {
            //selecciona el radio del sexo correspondiente
            $('input:radio[id="radioClienteSexo"]').filter('[value="'+oCliente.sexo+'"]').attr('checked', true);
        }
        else
        { 
            oForm.txtClienteSexo.value=oCliente.sexo;
        }
        
    }
    else
    {
        mensaje("No se encuentra ese DNI");
        //oForm.txtClienteDni.value="";
        oForm.txtClienteNombre.value="";
        oForm.txtClienteApellidos.value="";
        oForm.txtClienteTelefono.value="";
        oForm.txtClienteCorreo.value="";
        oForm.txtClienteSexo.value="";
    }
    
}




