const solicitarHoteles = async() => {
    // Mostrar spiner de carga en la pagina de hoteles principal
    response_hoteles.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;

    let lista = document.createElement('ol');
    lista.setAttribute('class','list-group list-group-numbered');

    const hoteles = await fetch('https://hoteleriamaalvaradol.herokuapp.com/public/api/hoteles')
    .then(resp => resp.json())
    .catch(err => console.log(err))

    hoteles.map(hotel => 
        {
            let item = document.createElement('li');
            item.setAttribute('class','list-group-item d-flex justify-content-between align-items-start');
            item.innerHTML = `<div class="ms-2 me-auto">
                <div class="fw-bold">Nit: ${hotel.hot_nit}</div>
                    <p>
                    <strong>ID: </strong> ${hotel.hot_id}<br>
                    <strong>Nombre: </strong> ${hotel.hot_nombre}<br>
                    <strong>Ciudad: </strong> ${hotel.ciu_nombre}<br>
                    <strong>Dirección: </strong>${hotel.hot_direccion}
                    </p>
                </div>
            <span class="badge bg-primary rounded-pill">Habitaciones ${hotel.hot_numero_habitaciones ?? 0}</span>`;

            lista.appendChild(item);
    });

    document.getElementById('response_hoteles').innerHTML = lista.innerHTML;
    
}   

const form_error = document.getElementById("form_error");
const form_done = document.getElementById("form_done");   

const crearHotel = async(e) => {
    e.preventDefault(); 

    form_error.innerHTML = '';
    form_done.innerHTML = '';  
    $("#btn_crear_hotel").prop('disabled',true).text('Guardando Hotel, por favor espere...');

    // Verifica que la cantidada de habitaciones de la tabla sea igual a la cantidad de habitaciones del formulario del hotel
    if(!habitacionesAsignadasCumpleMaximo()){
        return alert('El total de habitaciones configuradas debe ser igual al número de habitaciones del hotel');
    } 

    const body = new FormData(e.target)
    
    const response = await fetch('https://hoteleriamaalvaradol.herokuapp.com/public/api/hoteles',{
        method: 'POST',
        body: body
    })
    .then(resp => resp.json())
    .catch(err => err);   
    
    // Activa el boton de guardar de nuevo
    $("#btn_crear_hotel").prop('disabled',false).text('Guardar Hotel');;

    // Si existe un ID de hotel se indica la alerta con la información delvuelta por el servidor
    if(response.hot_id){
        form_done.innerHTML = `
        <div class="alert alert-success" role="alert">
            <b>Hotel ${response.hot_nombre.toUpperCase()}</b> creado con el ID <b>${response.hot_id}</b>
        </div>`;            

        e.target.reset();

        return;
    }

    // Valida si la respuesta con errores es un objeto y tiene valores
    if(Object.entries(response)){

        let div_error = document.createElement('div');

        Object.entries(response).map(resp => {

            let alert = document.createElement('div');
            alert.setAttribute('class','alert alert-danger text-uppercase');
            alert.setAttribute('role','alert');
            alert.innerHTML = resp;

            div_error.appendChild(alert);
        });

        return form_error.innerHTML = div_error.innerHTML;
    }
    
}
