import React, {useState, useEffect} from 'react'
import { Formulario} from 'elements/Formularios';
import Input from 'components/Input';
import Expresiones from 'components/Expresiones';
import BotonCentrado from 'components/BotonCentrado';
import AlertaError from 'components/AlertaError'
import Selects from 'components/Selects';
import { Link, useHistory, useParams  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "@material-ui/core";
import * as server from './server';
import Swal from 'sweetalert2';


function GestionUsuarios() {

    const params = useParams();
    const history =useHistory();

    const initialState={_id:'', nombre:'',apellido:'', documento:'', Estado:'', Rol:''}
    const [usuarios, setUsuarios]= useState(initialState);

    const [nombre, cambiarNombre] = useState({campo:'',valido: ''});
    const [apellido, cambiarApellido] = useState({campo:'',valido: ''});
    const [documento, cambiarDocumento] = useState({campo:'',valido: ''});
    const [Rol, cambiarRol] = useState({campo:'',valido: ''});
    const [Estado, cambiarEstado] = useState({campo:'',valido: ''});
    const [formularioValido, cambiarFormularioValido] = useState('');



    const getUsuario= async(usuarioId)=>{
        try{
            const res = await server.getUsuario(usuarioId);
            setUsuarios(res.data);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(params.id){
            getUsuario(params.id);
            cambiarNombre({...nombre, campo:"Correcto",valido: "true"});
            cambiarApellido({...apellido, campo:"Correcto",valido: "true"});
            cambiarDocumento({...documento, campo:"12345678",valido: "true"});
            cambiarRol({...Rol, campo:{value:"0", label:"Pendiente"}, valido: "true"});
            cambiarEstado({...Estado, campo:{value:"0", label:"Pendiente"}, valido: "true"});
        }
        // eslint-disable-next-line
    }, []);

    const onSubmitForm = async(e) =>{
        e.preventDefault();
        if (
            nombre.valido === 'true' &&
            apellido.valido === 'true' &&
            documento.valido === 'true' &&
            Rol.valido === 'true' &&
            Estado.valido === 'true'
            ){
                cambiarFormularioValido(true);
                try{
                    let res;
                    if(!params.id){
                        res= await server.registerUser(usuarios);
                        console.log(res)
                        showAlert("Creado con exito");
                        if (res === 'OK'){
                            setUsuarios(initialState);
                            }
                    }else{
                        await server.updateUser(params.id, usuarios);
                        showAlert("Actualizado con exito");
                    }
                history.push("/TablaGestionUsuarios");
            }catch(error){
                console.log(error)
            }
            }else{
                cambiarFormularioValido(false);
            }
        };

        const opcion1  = [
            {value:'0', label: 'Pendiente'},
            {value:'1', label: 'Vendedor'},
            {value:'2', label: 'Administrador'}
        ];

        const opcion2  = [
            {value:'0', label: 'Pendiente'},
            {value:'1', label: 'Autorizado'},
            {value:'2', label: 'No Autorizado'}
        ];

        const showAlert =(comentario)=>{
            Swal.fire({
                icon: 'success',
                title: (comentario),
                showConfirmButton: false,
                timer: 1500
              })
          }

    return ( 
        <main className="guiGestionUsuarios">
            <h2 className="tituloGestionVentas">Gestion Usuarios</h2>
            <Tooltip title="Regresar" arrow >
                <Link to='/TablaGestionUsuarios'>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
            </Tooltip>
           <Formulario action="" onSubmit={onSubmitForm}>
                <Input
                    estado={nombre}
                    cambiarEstado={cambiarNombre}
                    DefVal={usuarios.nombre}
                    tipo="text"
                    user="Nombre"
                    placeholdercont="Nombre de usuario"
                    name="nombre"
                    lenyenda= "El nombre solo admite letras"
                    expresionRegular={Expresiones.nombre}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                />
                <Input
                    estado={apellido}
                    cambiarEstado={cambiarApellido}
                    DefVal={usuarios.apellido}
                    tipo="text"
                    user="Apellido"
                    placeholdercont="Apellido de usuario"
                    name="apellido"
                    lenyenda= "El apellido solo admite letras"
                    expresionRegular={Expresiones.nombre}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                />
                 <Input
                    estado={documento}
                    cambiarEstado={cambiarDocumento}
                    DefVal={usuarios.documento}
                    tipo="number"
                    user="Id Usuario"
                    placeholdercont="N° ID del usuario"
                    name="documento"
                    lenyenda= "El Documento solo admite numeros, minimo 7 - maximo 14"
                    expresionRegular={Expresiones.telefono}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                />
                <Selects
                    estado={Rol}
                    cambiarEstado={cambiarRol}
                    DefVal={opcion1[usuarios.Rol.value]}
                    tipo="text"
                    user="Rol"
                    name="Rol"
                    lenyenda= "Administrador/ Vendedor / No Asignado"
                    expresionRegular={Expresiones.nombre}
                    opciones={opcion1}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                />
               <Selects
                    estado={Estado}
                    cambiarEstado={cambiarEstado}
                    DefVal={opcion2[usuarios.Estado.value]}
                    tipo="text"
                    user="Estado"
                    name="Estado"
                    lenyenda= "Pendiente / Autorizado / No Autorizado"
                    expresionRegular={Expresiones.nombre}
                    opciones={opcion2}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                />

                {formularioValido === false  && <AlertaError/> }
                { params.id?(
                    <BotonCentrado
                    nombreBoton = "Actualizar"
                    formularioValido = {formularioValido}
                    mensajeBoton = "Actualización exitosa"
                    />
                ):(
                    <BotonCentrado
                    nombreBoton = "Crear"
                    formularioValido = {formularioValido}
                    mensajeBoton = "Creación exitosa"
                    />
                )}

           </Formulario>
        </main>
    );
};


export default GestionUsuarios;
