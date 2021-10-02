import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import {Formulario} from 'elements/Formularios';
import Expresiones from 'components/Expresiones';
import BotonesProductos from 'components/BotonesProductos';import AlertaError from 'components/AlertaError'
import Selects from 'components/Selects';
import {Table, TableHead, TableData, Boton, ContenedorBotonCentrado} from 'elements/Listas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenAlt} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const productosBackend = [
    {
        nombreProducto: 'Hills',
        idProducto: 123456,
        estado: 'Disponible',
    },
    {
        nombreProducto: 'DogChow',
        idProducto: 123456,
        estado: 'Disponible',
    },
    {
        nombreProducto: 'Monello',
        idProducto: 4782377,
        estado: 'Disponible',
    },
    
  ];

  const Ventas = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVehiculos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nueva Venta');
  
    useEffect(() => {
      //obtener lista de vehículos desde el backend
      setVehiculos(productosBackend);
    }, []);
  
    useEffect(() => {
      if (mostrarTabla) {
        setTextoBoton('Agregar producto');
      } else {
        setTextoBoton('Mostrar productos');
      }
    }, [mostrarTabla]);
    return (
      <div>
        <div>
          
          <ContenedorBotonCentrado>
            <Boton
              onClick={() => {
                setMostrarTabla(!mostrarTabla);
              }}
            >
              {textoBoton}
            </Boton>
          </ContenedorBotonCentrado>
        </div>
        {mostrarTabla ? (
          <TablaVentas listaProductos={ventas} />
        ) : (
          <GestionProductos />
        )}
      </div>
    );
  };

  const TablaVentas = ({ listaProductos }) => {
    useEffect(() => {
      console.log('este es el listado de ventas en el componente de tabla', listaProductos);
    }, [listaProductos]);
    return (
      <div className="mainContainerTable">
        <h2 className="tituloGestionVentas">Todos las productos</h2>
        <Table>
          <TableHead>
            <tr>
              <TableData>Nombre del cliente</TableData>
              <TableData>Documento del cliente</TableData>
              <TableData>Id compra</TableData>
              <TableData>Actualizar</TableData>
            </tr>
          </TableHead>
          <tbody>
            {listaProductos.map((ventas, key) => {
              return (
                <tr key={key}>
                  <TableData>{ventas.nombreProducto}</TableData>
                  <TableData>{ventas.estado}</TableData>
                  <TableData>{ventas.idProducto}</TableData>
                  <TableData>
                  <button>
                      <Link to='/actualizarProductos'>
                        <FontAwesomeIcon icon={faPenAlt}/>
                      </Link>
                    </button>
                  </TableData>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };
  
  const GestionProductos = () => {
    
    const [nombre, cambiarNombre] = useState({campo:'', valido: null});
    const [descripcion, cambiarDescripcion] = useState({campo:'', valido: null});
    const [valor, cambiarvalor] = useState({campo:'', valido: null});
    const [idVendedor, cambiarIdVendedor] = useState({campo:'', valido: null});
    const [formularioValido, cambiarFormularioValido] = useState(null);
    const [estado, cambiarEstado] = useState({campo:'', valido: null});

    const productoDisponible = [
        {value:'Disponible', label: 'Disponible'},
        {value:'No disponible', label: 'No disponible'},
        ];
        

    const onSubmitForm = (e) =>{
        e.preventDefault();
        if (
            nombre.valido === 'true' &&
            descripcion.valido === 'true' &&
            valor.valido === 'true' &&
            idVendedor.valido === 'true' &&
            estado.valido === 'true'  
            ){
                cambiarFormularioValido(true);
                cambiarNombre({campo: '', valido:''});
                cambiarDescripcion({campo: '', valido:''});
                cambiarvalor({campo: '', valido:''});
                cambiarIdVendedor({campo: '', valido:''});
                cambiarEstado({campo: '', valido:''});
                // hacer envios a apis base de datos
            }else{
                cambiarFormularioValido(false);
            }
        }
    return (
        <main>
            <h2 className="tituloGestionVentas">Registro de productos</h2>
            <Formulario className = "guiGestionUsuarios" onSubmit = {onSubmitForm}>
                <Input 
                    user = "Nombre"
                    placeholdercont = "Nombre producto"
                    tipo = "text"
                    lenyenda = "El nombre solo admite letras"
                    expresionRegular = {Expresiones.nombre}
                    name = "nombre"
                    estado = {nombre}
                    cambiarEstado = {cambiarNombre}
                    />
                    <Input 
                    user = "Descripcion"
                    placeholdercont = "Descripción producto"
                    tipo = "text"
                    lenyenda = "El descripción solo admite letras"
                    expresionRegular = {Expresiones.nombre}
                    name = "descripcion"
                    estado = {descripcion}
                    cambiarEstado = {cambiarDescripcion}
                    />
                    <Input 
                    user = "valor"
                    placeholdercont = "valor producto"
                    tipo = "number"
                    lenyenda = "El valor solo admite números"
                    expresionRegular = {Expresiones.valores}
                    name = "valor"
                    estado = {valor}
                    cambiarEstado = {cambiarvalor}
                    />
                    
                    <Input 
                    user = "Id-Producto"
                    placeholdercont = "Id-Producto"
                    tipo = "number"
                    lenyenda = "El Id solo admite números"
                    expresionRegular = {Expresiones.telefono}
                    name = "idVendedor"
                    estado = {idVendedor}
                    cambiarEstado = {cambiarIdVendedor}
                    />
                    
                    <Selects 
                    user = "Estado"
                    placeholdercont = "Selecciona el estado"
                    tipo = "text"
                    lenyenda = "Solo ingrese disponible o no disponible"
                    expresionRegular = {Expresiones.nombre}
                    name = "estado"
                    estado = {estado}
                    cambiarEstado = {cambiarEstado}
                    opciones={productoDisponible}
                    />

                    {formularioValido === false  && <AlertaError/>}
                
                <BotonesProductos 
                    nombreBoton = "Agregar"
                    mensajeBoton = "Producto agregado exitosamente"
                    formularioValido = {formularioValido}
                />
                </Formulario>
        </main>
    )
};

export default Ventas;