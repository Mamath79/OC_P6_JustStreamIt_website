// fonction  async qui retourne l'id d'un des
// 6 meilleurs film d'une categorie choisie et triée par le score imdb de l'API,

async function getGenreMoviesIdByRank(genre, rank){
    let movieIds =[];
    let nextPage = `http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`;

    // le json donnant 5 films par pages,
    //il est necessaire de recuperer les détails des 2 premieres pages
    for (let i = 0; i < 2 && nextPage; i++){
        const response = await fetch(nextPage);  //revoir def await
        const data = await response.json();

        // expliquer map
        const moviesOnPage = data.results.map(movie => movie.id);
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

// affichage des details d'un des 6 meilleurs films
// avec test prealable d'existance du detail pour empecher un blocage

async function displayDetailsGenreMovie(genre) {
    for (let rank = 1; rank <= 7; rank++ ){
        const detailsGenreMovie = await mainGetDetailsGenreMovieByRank(genre,rank);

        const titleElement = document.getElementById(`genre${genre}rank${rank}Title`);
        const imageElement = document.getElementById(`genre${genre}rank${rank}Image`);
        
        if (titleElement) titleElement.textContent = detailsGenreMovie.title || "undefined";
        if (imageElement) imageElement.src = detailsGenreMovie.thumbnail || "undefined";
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

// fonction generant le contenu de la page avec les vignettes de films du genre selectionné
async function initGenreSelection(){
    await appendSelectGenresList();

    document.getElementById("genres-select").addEventListener('change', async function(event) {
        const selectedGenre = event.target.value;
        await displayDetailsSelectedGenreMovie(selectedGenre);
    });
};

// bouton voir plus pour tablette et mobile
document.querySelectorAll('.see-more-button').forEach(button => {
    button.addEventListener('click', function() {
        // previous element sibling: la div dont la class est category
        const category = this.previousElementSibling;
        category.querySelectorAll('.movie-thumbnail:nth-child(n+5)').forEach(thumbnail => {
            thumbnail.style.display = 'block';
        });
        this.style.display = 'none'; // Cacher le bouton après avoir affiché les vignettes
        // next element sibling : see-less-button
        this.nextElementSibling.style.display = 'block';
    });
});


// bouton voir moins pour tablette et mobile
document.querySelectorAll('.see-less-button').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.previousElementSibling.previousElementSibling;
        category.querySelectorAll('.movie-thumbnail:nth-child(n+5)').forEach(thumbnail => {
            thumbnail.style.display = 'none';
        });
        this.style.display = 'none'; // Cacher le bouton après avoir affiché les vignettes
        this.previousElementSibling.style.display = 'block';
    });
});

initGenreSelection();
