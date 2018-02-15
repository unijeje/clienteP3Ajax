
//objeto
class Cliente
{
    constructor(sDni, sNombre, sApellidos, iTlf, sCorreo, sSexo)
    {
        this.dni=sDni;
        this.nombre=sNombre;
        this.apellidos=sApellidos;
        this.tlf=iTlf;
        this.correo=sCorreo;

        this.sexo=sSexo;
        this.estado=true; //para saber si está o no de baja
    }
}

//funciones