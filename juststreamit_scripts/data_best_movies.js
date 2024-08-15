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
        const yearElement = document.getElementById(`rank${rank}Year`);
        const descriptionElement = document.getElementById(`rank${rank}Description`);
        const longDescriptionElement = document.getElementById(`rank${rank}Long description`);
        const imdbScoreElement = document.getElementById(`rank${rank}Score Imdb`);
        const genresElement = document.getElementById(`rank${rank}Genre`);
        const directorsElement = document.getElementById(`rank${rank}Directors`);
        const actorsElement = document.getElementById(`rank${rank}Actors`);
        const countriesElement = document.getElementById(`rank${rank}Contrie`);
        const budgetElement = document.getElementById(`rank${rank}Budget`);
        const durationElement = document.getElementById(`rank${rank}Duration`);

        if (titleElement) titleElement.textContent = detailsBestMovie.title || "unapplicable";
        if (imageElement) imageElement.src = detailsBestMovie.thumbnail || "unapplicable";
        if (yearElement) yearElement.textContent = detailsBestMovie.year || "unapplicable";
        if (descriptionElement) descriptionElement.textContent = detailsBestMovie.description || "unapplicable";
        if (longDescriptionElement) longDescriptionElement.textContent = detailsBestMovie.longDescription || "unapplicable";
        if (imdbScoreElement) imdbScoreElement.textContent = detailsBestMovie.imdbScore || "unapplicable";
        if (genresElement) genresElement.textContent = detailsBestMovie.genres.join(',') || "unapplicable";
        if (directorsElement) directorsElement.textContent = detailsBestMovie.directors.join(',') || "unapplicable";
        if (actorsElement) actorsElement.textContent = detailsBestMovie.actors.join(',') || "unapplicable";
        if (countriesElement) countriesElement.textContent = detailsBestMovie.countries || "unapplicable";
        if (budgetElement) budgetElement.textContent = detailsBestMovie.budget || "unapplicable";
        if (durationElement) durationElement.textContent = detailsBestMovie.duration || "unapplicable";
    }
};

displayDetailsBestMovie()
