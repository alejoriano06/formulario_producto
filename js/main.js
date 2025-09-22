// REAMOS LAS CONSTATNTES GLOBALES
const iFoto = document.getElementById('foto');
const iNombres = document.getElementById('nombres');
const iMarca = document.getElementById('marca');
const iModelo = document.getElementById('modelo');
const iKilometraje = document.getElementById('kilometraje');
const iPrecio = document.getElementById('precio');
const form = document.getElementById('vehiculo-form');
const card = document.getElementById('cont-cardss');

//CREAMOS LA FUNCION QUE NOS PERMITE CREAR UNA NUEVA TAREA A PARTIR DEL FORMULARIO
//TODA ETIQUETA QUE VAMOS A CREAR ES APARTIR DE LA MAQUETA HTML PRE-EXISTENTE

// ESTA FUNCION SOLO CREA LA ESTRUCTURA DEL HTML Y AUN NO LA INSERTA EN LA PAGINA, LA DEJA EN EL LIMBO
function crearVehiculo(imagenV,titulo1,sMarca,modeloV,kVehiculo,pVehiculo){
    //CREAMOS EL NODO, ELEMENTO PADRE O CONTENEDOR
    const pPrincipal = document.createElement('div');
    pPrincipal.classList.add('item-vehiculo', 'col-md-6');

    //CREAMOS EL NODO SERIA UN PADRE SECUNDARIO
    const pCard = document.createElement('div');
    pCard.classList.add('card', 'h-100');

    // CREAMOS LOS NODOS HIJOS
    const imagen = document.createElement('img');
    imagen.classList.add('card-img-top', 'w-100');
    imagen.setAttribute('src', imagenV);
    imagen.setAttribute('alt', 'Foto vehiculo')

    // CREO UN TERCER CONTENEDOR PADRE
    const pTercero = document.createElement('div');
    pTercero.classList.add('card-body');

    const titulo = document.createElement('h3');
    titulo.classList.add('card-title');
    titulo.textContent = titulo1

    const marca = document.createElement('h4');
    marca.classList.add('card-subtitle', 'text-muted')
    marca.textContent = sMarca;

    const  modelo = document.createElement('h4');
    modelo.classList.add('card-text');
    modelo.textContent = 'Modelo: '+ modeloV;

    const kilometraje = document.createElement('h4');
    kilometraje.classList.add('card-text');
    kilometraje.textContent = 'Kilometraje: ' + kVehiculo;

    const precio = document.createElement('h2');
    precio.classList.add('text-success')
    precio.textContent = '$'+ pVehiculo;

    // CREO EL CUARTO CONTENEDOR PADRE
    const pCuarto = document.createElement('div');
    pCuarto.classList.add('d-flex', 'justify-content-between', 'mt-3');

    // CREO LOS HIJOS DEL CUARTO CONTENEDOR PADRE
    const comprar = document.createElement('button');
    comprar.classList.add('btn', 'btn-success');
    comprar.textContent = 'Comprar';

    const eliminar = document.createElement('button');
    eliminar.classList.add('btn', 'btn-danger');
    eliminar.textContent = 'Eliminar';

    // ELIMINAOS LA TARJETA
    eliminar.addEventListener('click', ()=>{
        pPrincipal.remove();
    });

    // MUESTRA UN MENSAJE AL DAR CLICK EN EL BOTON COMPRAR
    comprar.addEventListener('click', ()=>{
        alert('Te contactaremos muy pronto');
    });

    //ENSAMBLAMOS DENTRO DE LOS NODOS PADRES SUS NODOS HIJOS
    pPrincipal.appendChild(pCard);

    pCard.appendChild(imagen);
    pCard.appendChild(pTercero);
    
    pTercero.appendChild(titulo);
    pTercero.appendChild(marca);
    pTercero.appendChild(modelo);
    pTercero.appendChild(kilometraje);
    pTercero.appendChild(precio);
    pTercero.appendChild(pCuarto);

    pCuarto.appendChild(comprar);
    pCuarto.appendChild(eliminar);

    // UTILIZAMOS EL RETURN PARA RETORNAR O DAR RESPUESTA DEL ELEMENTO CREADO YA QUE LO USAREMOS EN OTRA FUNCION MAS ADELANTE
    return pPrincipal;

};

// DETECTAMOS EL EVENTO CLICK SOBRE EL BOTON AGREGAR CON UN EVENTO DE ESCUCHA O LISTENER
// PARA QUE A PARTIR DE ESTE EVENTO SE AGREGUE LA TAREA DENTRO DEL CONTENEDOR
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let imagenV = iFoto.value.trim();
    const titulo1 = iNombres.value.trim();
    const sMarca = iMarca.value.trim();
    const modeloV = iModelo.value.trim();
    const kVehiculo = iKilometraje.value.trim();
    const pVehiculo = iPrecio.value.trim();

    if(imagenV==''){
        imagenV= 'https://img.freepik.com/vector-gratis/pagina-error-404-distorsion_23-2148105404.jpg';
    }

    if(titulo1=='' || sMarca=='' || modeloV=='' || kVehiculo=='' || pVehiculo==''){
        alert('Registre todos los campos')
    }else{
        const newVehiculo = crearVehiculo(imagenV,titulo1,sMarca,modeloV,kVehiculo,pVehiculo);
        card.appendChild(newVehiculo);
        iFoto.value='';
        iNombres.value='';
        iMarca.value='';
        iModelo.value='';
        iKilometraje.value='';
        iPrecio.value='';
    }

});