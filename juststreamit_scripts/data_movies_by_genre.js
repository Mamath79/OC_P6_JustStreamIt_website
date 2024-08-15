// fonction  async qui retourne l'id d'un des
// 6 meilleurs film d'une categorie choisie et triée par le score imdb de l'API,

async function getGenreMoviesIdByRank(genre, rank){
    let movieIds =[];
    let nextPage = `http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`;

    for (let i = 0; i < 2 && nextPage; i++){
        const response = await fetch(nextPage);
        const data = await response.json();

        
        const moviesOnPage = data.results.map(movie =>movie.id);
        movieIds = movieIds.concat(moviesOnPage);

        nextPage = data.next;
    };
    return movieIds[rank-1]
};

 
// fonction qui obtient tous les details pour un film via son id

async function getMovieDetailsById(id){
    const response = await fetch('http://localhost:8000/api/v1/titles/'+ Number(id));
    const data = await response.json();
    const titleMovie = data.title;
    const yearMovie = data.year;
    const descriptionMovie =data.description;
    const long_descriptionMovie = data.long_description;
    const imdb_scoreMovie = data.imdb_score;
    const thumbnailMovie = data.image_url;
    const genresMovie = data.genres;
    const directorsMovie = data.directors;
    const actorsMovie = data.actors;
    const countriesMovie = data.countries;
    const budgetMovie = data.budget;
    const durationMovie = data.duration;

    return {
        title: titleMovie,
        thumbnail: thumbnailMovie,
        year: yearMovie,
        description: descriptionMovie,
        longDescription: long_descriptionMovie,
        imdbScore: imdb_scoreMovie,
        genres: genresMovie,
        directors: directorsMovie,
        actors: actorsMovie,
        countries: countriesMovie,
        budget: budgetMovie,
        duration: durationMovie
    };

};

// fonction principale pour l'obtention des details d'un film par son classement 

async function mainGetDetailsGenreMovieByRank (genre, rank){
    const id = await getGenreMoviesIdByRank(genre, rank);
    const detailsGenreMovie = await getMovieDetailsById(id);
    return detailsGenreMovie
};

// affichage des details d'un des 7 meilleurs films
// avec test prealable d'existance du detail pour empecher un blocage

async function displayDetailsGenreMovie(genre) {
    for (let rank = 1; rank <= 7; rank++ ){
        const detailsGenreMovie = await mainGetDetailsGenreMovieByRank(genre,rank);

        const titleElement = document.getElementById(`genre${genre}rank${rank}Title`);
        const imageElement = document.getElementById(`genre${genre}rank${rank}Image`);
        const yearElement = document.getElementById(`genre${genre}rank${rank}Year`);
        const descriptionElement = document.getElementById(`genre${genre}rank${rank}Description`);
        const longDescriptionElement = document.getElementById(`genre${genre}rank${rank}Longdescription`);
        const imdbScoreElement = document.getElementById(`genre${genre}rank${rank}ScoreImdb`);
        const genresElement = document.getElementById(`genre${genre}rank${rank}Genre`);
        const directorsElement = document.getElementById(`genre${genre}rank${rank}Directors`);
        const actorsElement = document.getElementById(`genre${genre}rank${rank}Actors`);
        const countriesElement = document.getElementById(`genre${genre}rank${rank}Contrie`);
        const budgetElement = document.getElementById(`genre${genre}rank${rank}Budget`);
        const durationElement = document.getElementById(`genre${genre}rank${rank}Duration`);

        if (titleElement) titleElement.textContent = detailsGenreMovie.title || "undefined";
        if (imageElement) imageElement.src = detailsGenreMovie.thumbnail || "undefined";
        if (yearElement) yearElement.textContent = detailsGenreMovie.year || "undefined";
        if (descriptionElement) descriptionElement.textContent = detailsGenreMovie.description || "undefined";
        if (longDescriptionElement) longDescriptionElement.textContent = detailsGenreMovie.longDescription || "undefined";
        if (imdbScoreElement) imdbScoreElement.textContent = detailsGenreMovie.imdbScore || "undefined";
        if (genresElement) genresElement.textContent = detailsGenreMovie.genres.join(',') || "undefined";
        if (directorsElement) directorsElement.textContent = detailsGenreMovie.directors.join(",") || "undefined";
        if (actorsElement) actorsElement.textContent = detailsGenreMovie.actors.join(',') || "undefined";
        if (countriesElement) countriesElement.textContent = detailsGenreMovie.countries || "undefined";
        if (budgetElement) budgetElement.textContent = detailsGenreMovie.budget || "undefined";
        if (durationElement) durationElement.textContent = detailsGenreMovie.duration || "undefined";
    }    
}

displayDetailsGenreMovie("Biography")

displayDetailsGenreMovie("Family")

// fonction permetant de recuperer tous les genres de l'api
async function getGenresList() {
    let genresList = [];
    let nextPage = `http://localhost:8000/api/v1/genres/`;

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        genresList = genresList.concat(data.results);
        nextPage = data.next;
    }
    console.log(genresList)
    return genresList;
};


// fonction permettant de mettre en place les options dans la selection libre de genre
async function appendSelectGenresList() {
    const genresList = await getGenresList();
    const selectElement = document.getElementById("genres-select");

    genresList.forEach(genre =>{
        const optionElement = document.createElement('option');
        optionElement.value = genre.name;
        optionElement.textContent = genre.name;
        selectElement.appendChild(optionElement);
    });
}

async function displayDetailsSelectedGenreMovie(genre) {
    const container = document.getElementById('selected-genre-movies');
    container.innerHTML = ''; // Vide le conteneur avant d'ajouter les nouveaux films

    for (let rank = 1; rank <= 6; rank++) {
        const detailsGenreMovie = await mainGetDetailsGenreMovieByRank(genre, rank);

        // Créer les éléments pour la vignette du film
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-thumbnail');

        const imgElement = document.createElement('img');
        imgElement.src = detailsGenreMovie.thumbnail || "undefined";
        imgElement.alt = detailsGenreMovie.title || "Movie Thumbnail";

        const bannerDiv = document.createElement('div');
        bannerDiv.classList.add('banner');

        const titleSpan = document.createElement('span');
        titleSpan.classList.add('movie-title');
        titleSpan.textContent = detailsGenreMovie.title || "undefined";

        const buttonElement = document.createElement('button');
        buttonElement.textContent = "Details";
        buttonElement.classList.add('details-button');
        buttonElement.dataset.id = detailsGenreMovie.id;

        // Ajouter les éléments au conteneur

        bannerDiv.appendChild(titleSpan);
        bannerDiv.appendChild(buttonElement);

        movieDiv.appendChild(imgElement);
        movieDiv.appendChild(bannerDiv);

        container.appendChild(movieDiv);

        // Ajouter un écouteur sur le bouton "Details" pour afficher la modal
        buttonElement.addEventListener('click', async function() {
            openModal(detailsGenreMovie);
        });
    }    
};

async function initGenreSelection(){
    await appendSelectGenresList();

    document.getElementById("genres-select").addEventListener('change', async function(event) {
        const selectedGenre = event.target.value;
        await displayDetailsSelectedGenreMovie(selectedGenre);
    });
};

initGenreSelection();
