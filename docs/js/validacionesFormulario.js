let cantidadHabitacionesAsignadas = 0;
let permiteRegistrarHabitaciones = false;

// Cuando se cambie el valor de las habitaciones del hotel se disparan los siguientes eventos
$("#habitaciones").change(function(el){
    parseInt(el.target.value) > 0 ? permiteRegistrarHabitaciones = true : permiteRegistrarHabitaciones = false;
    limpiarTabla();
    activarTablaHabitaciones();
});

// Permite que el boton de agregar se active para agregar filas en la tabla
const activarTablaHabitaciones = () => {
    (permiteRegistrarHabitaciones) ? $("#btn_agregar_habitacion").show() : $("#btn_agregar_habitacion").hide();
}

// Genera una nueva fila de habitacion en la tablas
const agregarNuevaFila = () => {

    calcularCantidadHabitacionesAsignadas();

    if(habitacionesAsignadasSuperaMaximo()){
        alert('No se pueden agregar mas habitaciones');
    }else{
        $("#table_habitaciones").append(
            camposRegistroHabitacion()
        );
    }
    
}

// Es la estructura de campos para la tabla
const camposRegistroHabitacion = () => {

    const contadorFilas = $("#table_habitaciones").children().length;

    return `
        <tr>
            <td>
                <input type="number" class="form-control" name="tb_habitaciones[]" id="canthab_${contadorFilas}" placeholder="cantidad" required onchange="calcularCantidadHabitacionesAsignadas()">                                
            </td>
            <td>
                <select class="form-select" id="tiphab_${contadorFilas}" aria-label="Floating label select example" name="tb_tipo_habitacion[]" required onchange="seleccionarTipoAcomodacionHabitacion(this.value, ${contadorFilas})">
                    <option selected disabled value="">Seleccione una</option>
                    <option value="1">ESTANDAR</option>
                    <option value="2">JUNIOR</option>
                    <option value="3">SUITE</option>
                </select>
            </td>
            <td>
                <select class="form-select" id="tipacomo_${contadorFilas}" aria-label="Floating label select example" name="tb_tipo_acomodacion[]" required>
                </select>                                
            </td>
            <td>
                <button type="button" class="btn btn-danger" onclick="quitarHabitacion(this)">
                    Quitar
                </button>
            </td>
        </tr>
    `;          
}

const calcularCantidadHabitacionesAsignadas = () => {
    cantidadHabitacionesAsignadas = 0;
    $("#table_habitaciones > tr").each(function(index, fila){
        let cantidadColumna = $(fila)[0].children[0].children[0].value;
        cantidadHabitacionesAsignadas += (isNaN(parseInt(cantidadColumna))) ? 0 : parseInt(cantidadColumna);
    });

    $("#totalHabitaciones").val(cantidadHabitacionesAsignadas);
}

const quitarHabitacion = (el) => {
    $(el).remove();
    calcularCantidadHabitacionesAsignadas();
}

const limpiarTabla = () => {
    $("#table_habitaciones").empty();
    calcularCantidadHabitacionesAsignadas();
}

const habitacionesAsignadasSuperaMaximo = () => {
    if(cantidadHabitacionesAsignadas > getHabitacionesMaximas()){
        return true;
    }else{
        return false;
    }
}

const habitacionesAsignadasCumpleMaximo = () => {
    if(cantidadHabitacionesAsignadas == getHabitacionesMaximas()){
        return true;
    }else{
        return false;
    }
}

const getHabitacionesMaximas = () => {
    return parseInt(document.getElementById('habitaciones').value);
}

const seleccionarTipoAcomodacionHabitacion = (idTipoHabitacion, idFila) => {
    let lista = '<option selected disabled value="">Seleccione una</option>';
    tipoAcomodacionHabitacion.filter(acomodacion => acomodacion.idTipoHabitacion == idTipoHabitacion)
    .map(acomodacion => {
        lista += `<option value="${acomodacion.id}">${acomodacion.nombre}</option>`;
    });

    $("#tipacomo_"+idFila).html(lista);


}

const tipoAcomodacionHabitacion = [
    { id: 1, nombre: 'SENCILLA', idTipoHabitacion: 1 },
    { id: 2, nombre: 'DOBLE', idTipoHabitacion: 1 },
    { id: 4, nombre: 'TRIPLE', idTipoHabitacion: 2},
    { id: 5, nombre: 'CUÁDRUPLE', idTipoHabitacion: 2},
    { id: 1, nombre: 'SENCILLA', idTipoHabitacion: 3 },
    { id: 2, nombre: 'DOBLE', idTipoHabitacion: 3 },
    { id: 4, nombre: 'TRIPLE', idTipoHabitacion: 3},
];