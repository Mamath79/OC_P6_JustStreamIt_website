// fonction  async qui retourne  l'id d'un des
// 7 meilleurs film ,trier par leur score imdb de l'API,
// en fonction de leur classement

async function getBestMoviesIdByRank(rank) {
    const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7');
    const data = await response.json();
    const preDataBestMovie = data.results[Number(rank) - 1];
    const movieId = preDataBestMovie.id;
    return movieId;
};


// fonction qui obtient tous les details pour un film via son id

async function getMovieDetailsById(id) {
    const response = await fetch('http://localhost:8000/api/v1/titles/' + Number(id));
    const data = await response.json();
    const titleMovie = data.title;
    const yearMovie = data.year;
    const descriptionMovie = data.description;
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

async function mainGetDetailsBestMovieByRank(rank) {
    const id = await getBestMoviesIdByRank(rank);
    const detailsBestMovie = await getMovieDetailsById(id);
    return detailsBestMovie
};

// affichage des details d'un des 7 meilleurs films
// avec test prealable d'existance du detail pour empecher un blocage

async function displayDetailsBestMovie() {
    for (let rank = 1; rank <= 7; rank++) {
        const detailsBestMovie = await mainGetDetailsBestMovieByRank(rank);

        const titleElement = document.getElementById(`rank${rank}Title`);
        const imageElement = document.getElementById(`rank${rank}Image`);
        const descriptionElement = document.getElementById(`rank${rank}Description`);

        if (titleElement) titleElement.textContent = detailsBestMovie.title || "unapplicable";
        if (imageElement) imageElement.src = detailsBestMovie.thumbnail || "unapplicable";
        if (descriptionElement) descriptionElement.textContent = detailsBestMovie.description || "unapplicable";
    }
};

displayDetailsBestMovie()
