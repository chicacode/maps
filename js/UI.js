class UI {
    constructor() {

        //Instanciar API
        this.api = new API();

        // Crear los markers con layerGroup
        this.markers = new L.LayerGroup();


         // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([40.4636688, -3.7492199], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + enlaceMapa + ' Contributors',
            maxZoom: 18,
            }).addTo(map);
        return map;

    }
    mostrarEstablecimientos(){
        this.api.obtenerDatos()
            .then(datos =>{
                console.log(datos.respuestaJSON.features)
                const result = datos.respuestaJSON.features;
                // ejecutar funcion para mostrar pines
                this.mostrarPines(result)

            })
    }

    mostrarPines(result){
        // Limpiar los markers fn de leaftlet
        this.markers.clearLayers();

    console.log('Funcion mostarr pines');
        // recorrer los establecimientos
        result.forEach(result =>{
            //console.log("Los datos en el foreach estan", result);
            // Destructuring del JSON para extraer información
            // lati, longi, direccion, precio
            const { attributes: {latitud, longitud, dirección, precio_gasolina_95, precio_gasóleo_a} } = result;

            // Crear un nuevo popup
            const opcionesPopUp = L.popup() // Funcion de leaftlet
                    .setContent(`<p>Dirección: ${dirección}</p>
                                <p>Precio Regular: ${precio_gasóleo_a}</p>
                                <p>Precio Premium: ${precio_gasolina_95}</p>
                                `); 
            // Pintar pinnes
            const marker = new L.marker([
                parseFloat(latitud), 
                parseFloat(longitud)
            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa); // Propiedad que contiene todos los markers se añaden a lo mapas
    }

    // buscador input
    obtenerSugerencias(busqueda) {
        this.api.obtenerDatos()
            .then(datos => {
                const resultados = datos.respuestaJSON.features;
                console.log('En la funcion de obtener sugerencias los datos son', resultados )

                // Enviar el JSON y la busqueda para el filtrado
                this.filtrarSugerencias(resultados, busqueda);
            })
    }
    // Filtra sugerencias en base a input
    filtrarSugerencias(resultado, busqueda){
             // filtrar con .filter 
             // ITERA EN CADA UNO DE LOS REGISTROS y solo traer lo que se le defina sea == -1 o !== -1 para que concuerde
        const filtros = resultado.filter(filtro => filtro.attributes.localidad.indexOf(busqueda) !== -1); // .filter recorre los terminos y los encuentra segun la busqueda que desee encontrar y devuelve la que coincida, sino que el resultado sea -1
        // mostrar pines
        this.mostrarPines(filtros); 

    }
}