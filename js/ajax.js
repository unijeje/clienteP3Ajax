//AJAX
function instanciarXHR() 
{
    var xhttp = null;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xhttp;
}

function respuestaAltaCliente()
{
    var oAjax = this;

    // 5. Proceso la respuesta cuando llega
    if (oAjax.readyState == 4 && oAjax.status == 200) {

        //sRespuesta=oAjax.responseText;

        //alert(sRespuesta);
        if(parseInt(oAjax.responseText)>0)
        {
            document.frmClienteAlta.reset();
            document.frmClienteAlta.style.display="none";
            mensaje("Cliente Insertado Correctamente");
            }
            else
            mensaje("Ese cliente ya existe");
    }
}

function buscarCliente()
{


    
    
    var oAjax = instanciarXHR();

    //1. Preparar parametros
    var sDNI=document.frmClienteBaja.txtClienteDni.value.trim();

    var sDatosEnvio = "datos=" + sDNI;

    //2. Configurar la llamada --> Asincrono por defecto
    oAjax.open("GET", encodeURI("php/buscarCliente.php?" + sDatosEnvio));

    //3. Asociar manejador de evento de la respuesta
    oAjax.addEventListener("readystatechange", respuestaBusquedaCliente, false);

    //4. Hacer la llamada
    oAjax.send(null);
    

}

function respuestaBusquedaCliente()
{
    var oAjax = this;

    if (oAjax.readyState == 4 && oAjax.status == 200) {

        var oRespuesta=JSON.parse(oAjax.responseText);

        var arrayDNI=[];
        for(var i=0;i<oRespuesta.length;i++)
            arrayDNI.push(oRespuesta[i].dni);

       $("#frmClienteBaja #txtClienteDni").autocomplete({source: arrayDNI});
        

    }
}