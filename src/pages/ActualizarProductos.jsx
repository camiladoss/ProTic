import React, {useState, useEffect} from 'react';
import Input from 'components/Input';
import {Formulario} from 'elements/Formularios';
import Expresiones from 'components/Expresiones';
import BotonCentrado from 'components/BotonCentrado';
import AlertaError from 'components/AlertaError'
import Selects from 'components/Selects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Link,useHistory,useParams } from 'react-router-dom';
import * as api from 'Api'
import Swal from 'sweetalert2';


const ActualizarProductos = () => {

    const params=useParams();
    const history=useHistory();

    const initialState={_id:'', nombre:'', descripcion:'', valor:'', Estado:'' };
    const [usuarios,setUsuarios]= useState(initialState);


    const [nombre, cambiarNombre] = useState({campo:'',valido: ''});
    const [descripcion, cambiarDescripcion] = useState({campo:'',valido: ''});
    const [valor, cambiarvalor] = useState({campo:'',valido: ''});
    //const [idVendedor, cambiarIdVendedor] = useState({valido: ''});
    const [Estado, cambiarEstado] = useState({campo:'',valido: ''});
    const [formularioValido, cambiarFormularioValido] = useState('');

    const getProducto= async(productId)=>{
        try{
            const res = await api.getProduct(productId);
            setUsuarios(res.data);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(params.id){
            getProducto(params.id);
            cambiarNombre({...nombre, campo:"Correcto", valido: "true"});
            cambiarDescripcion({...descripcion, campo:"Correcto", valido: "true"});
            cambiarvalor({...valor, campo:"123456", valido: "true"});
            cambiarEstado({...Estado, campo:{value:"0", label:"Pendiente"}, valido: "true"});
        }
        // eslint-disable-next-line
    }, []);


    const onSubmitForm = async(e) =>{
        e.preventDefault();
        if (
            nombre.valido === 'true' &&
            descripcion.valido === 'true' &&
            valor.valido === 'true' &&
            Estado.valido === 'true'
            ){
                cambiarFormularioValido(true);
                try{
                    let res;
                    if(!params.id){
                        res= await api.registerProducts(usuarios);
                        console.log(res)
                        showAlert("Creado con exito");
                        if (res === 'OK'){
                            setUsuarios(initialState);
                            }
                    }else{
                        await api.updateProduct(params.id, usuarios);
                        showAlert("Actualizado con exito");
                    }
                        history.push("/ListadoProductos");
                    }catch(error){
                    console.log(error)
                }
            }else{
                cambiarFormularioValido(false);
            }
        }

    const productoDisponible = [
        {value:'0', label: 'Disponible'},
        {value:'1', label: 'No disponible'},
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
        <main>
        <button className="botonVolver">
                <Link to='/listadoProductos'>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
            </button>
            <h2 className="tituloGestionVentas">Registro de productos</h2>
            <Formulario className = "guiGestionUsuarios" onSubmit = {onSubmitForm} action="">
                <Input
                    user = "Nombre"
                    placeholdercont = "Nombre producto"
                    tipo = "text"
                    lenyenda = "El nombre solo admite letras"
                    expresionRegular = {Expresiones.nombre}
                    DefVal={usuarios.nombre}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                    name = "nombre"
                    estado = {nombre}
                    cambiarEstado = {cambiarNombre}
                    />
                    <Input
                    user = "Descripcion"
                    placeholdercont = "Descripción producto"
                    tipo = "text"
                    lenyenda = "El descripción solo admite letras"
                    expresionRegular = {Expresiones.descripcion}
                    name = "descripcion"
                    estado = {descripcion}
                    cambiarEstado = {cambiarDescripcion}
                    DefVal={usuarios.descripcion}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                    />
                    <Input
                    user = "Valor"
                    placeholdercont = "valor producto"
                    tipo = "number"
                    lenyenda = "El valor solo admite números"
                    expresionRegular = {Expresiones.valores}
                    name = "valor"
                    estado = {valor}
                    cambiarEstado = {cambiarvalor}
                    DefVal={usuarios.valor}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                    />

                   {/* <Input
                    user = "Id-Producto"
                    placeholdercont = "Id-Producto"
                    tipo = "number"
                    lenyenda = "El Id solo admite números"
                    expresionRegular = {Expresiones.telefono}
                    name = "idVendedor"
                    estado = {idVendedor}
                    cambiarEstado = {cambiarIdVendedor}
                    />
                     */}
                    <Selects
                    user = "Estado"
                    placeholdercont = "Selecciona el estado"
                    tipo = "text"
                    lenyenda = "Solo ingrese disponible o no disponible"
                    expresionRegular = {Expresiones.nombre}
                    name = "Estado"
                    estado = {Estado}
                    cambiarEstado = {cambiarEstado}
                    opciones={productoDisponible}
                    DefVal={productoDisponible[usuarios.Estado.value]}
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                    />

                    {formularioValido === false  && <AlertaError/>}
                    { params.id?(
                        <BotonCentrado
                            nombreBoton = "Actualizar"
                            mensajeBoton = "Actualización exitos"
                            formularioValido = {formularioValido}
                    />
                    ):(
                        <BotonCentrado
                            nombreBoton = "Crear"
                            formularioValido = {formularioValido}
                            mensajeBoton = "Creación exitosa"
                    />
                    ) }
                </Formulario>
        </main>
    )
};

export default ActualizarProductos;