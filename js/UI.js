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
            console.log("Los datos en el foreach estan", result);
            // Destructuring del JSON para extraer información
            // lati, longi, direccion, precio
            const { attributes: {latitud, longitud, dirección, precio_gasolina_95, precio_gasóleo_a} }= result;

            // Pintar pinnes
            const marker = new L.marker([
                parseFloat(latitud), 
                parseFloat(longitud)
            ]);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }
}