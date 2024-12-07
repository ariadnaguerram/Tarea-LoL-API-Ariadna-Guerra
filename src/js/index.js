//Aseguramos que el código dentro de la función se ejecute después de que el html se cargue
//Utilizo jQuery para facilitar el Javascript
$(document).ready(function() {

    // Cargar campeones al hacer clic en el botón
    async function fetchChampions() {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/12.18.1/data/es_ES/champion.json'); //Solicitud a la API
        const data = await response.json(); //Convertir la respuesta a JSON
        displayChampions(data.data); //Llama a la función para mostrar los campeones
    }
    //Mostramos a los campeones en el DOM
    function displayChampions(champions) {
        $('#champion-list').empty(); //Limpia la lista de los campeones existentes
        $.each(champions, function(index, champion) {
            const championCard = $('<div class="col-md-2 mb-4"></div>'); //Contenedor para cada campeón

            // Establecer la imagen de la skin por defecto
            const defaultSkin = `${champion.id}_0.jpg`; // Skin por defecto
            const skinImage = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${defaultSkin}`; //URL de la imagen de la skin
            //Añadimos codigo html a la tarjeta del campeón nombre, titulo, skin... 
            championCard.html(`
                <div class="card">
                    <img src="${skinImage}" class="card-img-top champion-skin" alt="${champion.name}"> 
                    <div class="card-body">
                        <h5 class="card-title">${champion.name}</h5>
                        <p class="card-text">${champion.title}</p>
                    </div>
                </div>
            `);

            // Agregar eventos para cambiar la skin al pasar el mouse
            championCard.on('mouseover', function() {
                const newSkin = `${champion.id}_1.jpg`; // Cambia a la segunda skin
                const newSkinImage = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${newSkin}`; //URL de la nueva skin
                championCard.find('.champion-skin').attr('src', newSkinImage); // Cambiar la imagen de la skin
                
            });
            championCard.on('mouseout', function() {
                championCard.find('.champion-skin').attr('src', skinImage);
            });
            //Añadir la tarjeta de campeón a la lista con append
            $('#champion-list').append(championCard);
        });
    }
    //Se asigna la función fetchChampions al evento click del botón.
    $('#show-champions').on('click', fetchChampions);
});
