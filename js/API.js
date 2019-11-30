class API {
    async obtenerDatos(){
        //Obtener datos en API
        const datos = await fetch('https://www.mapabase.es/arcgis/rest/services/Otros/Gasolineras/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json');

        //datos con json
        const respuestaJSON = await datos.json();

        return {
            respuestaJSON // devuelve esta variable para poder ser utilizada en otros componentes
        }
    }
}