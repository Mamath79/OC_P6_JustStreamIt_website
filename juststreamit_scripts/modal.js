// fonctions gerant la fenetre modal

const modal = document.querySelector('.modal');
const openButtons = document.querySelectorAll('.details-button');
const closeButtons = document.querySelectorAll('.close, .closeX');



// recup details best movie via data-rank qui est un attibut de chaque bouton

async function getMovieDataToDisplay(button) {
    const rank = button.getAttribute('data-rank');
    const movieDataDisplay = await mainGetDetailsBestMovieByRank(rank);
    return movieDataDisplay;
};

// recup details Genre movie via  data_genre et data-rank qui sont des attibuts de chaque bouton

async function getMovieDataByGenreToDisplay(button) {
    const genre = button.getAttribute('data-genre');
    const rank = button.getAttribute('data-rank');
    const movieDataDisplay = await mainGetDetailsGenreMovieByRank(genre, rank);
    return movieDataDisplay
};

// Lie un evenement à chaque bouton de details pour ouvrir la modal

openButtons.forEach(button => {
    button.addEventListener('click', async () => {
        let movieDetails;
        if (button.hasAttribute('data-genre')) {
            movieDetails = await getMovieDataByGenreToDisplay(button);
        } else {
            movieDetails = await getMovieDataToDisplay(button)
        };
        openModal(movieDetails);
    });
});


function openModal(movieDetails) {
    const titleElement = document.getElementById('modal-title');
    const imgElement = document.getElementById('modal-img');
    const imgElementTabletMobile = document.getElementById('modal-img-tablet-mobile');
    const descriptionElement = document.getElementById('modal-description');
    const longDescriptionElement = document.getElementById('modal-long-description');
    const kindElement = document.getElementById('modal-kind');
    const releaseDateElement = document.getElementById('modal-release-date');
    const ratingElement = document.getElementById('modal-rating');
    const directorElement = document.getElementById('modal-director');
    const actorsElement = document.getElementById('modal-actors');
    const durationElement = document.getElementById('modal-duration');
    const countryElement = document.getElementById('modal-country');
    const boxOfficeElement = document.getElementById('modal-box-office');

    // verif d'existance de l'element pour ne pas bloquer le code
    
    if (titleElement) titleElement.textContent = movieDetails.title;
    if (imgElement) imgElement.src = movieDetails.thumbnail;
    if (imgElementTabletMobile) imgElementTabletMobile.src = movieDetails.thumbnail;
    if (descriptionElement) descriptionElement.textContent = movieDetails.description;
    if (longDescriptionElement) longDescriptionElement.textContent = movieDetails.longDescription;
    if (kindElement) kindElement.textContent = movieDetails.genres.join(', ');
    if (releaseDateElement) releaseDateElement.textContent = movieDetails.year;
    if (ratingElement) ratingElement.textContent = movieDetails.imdbScore;
    if (directorElement) directorElement.textContent = movieDetails.directors.join(', ');
    if (actorsElement) actorsElement.textContent = movieDetails.actors.join(', ');
    if (durationElement) durationElement.textContent = movieDetails.duration;
    if (countryElement) countryElement.textContent = movieDetails.countries.join(', ');
    if (boxOfficeElement) boxOfficeElement.textContent = movieDetails.budget;

    modal.style.display = 'block';

    // Forcer le scroll en haut de la modal
    modal.scrollTop = 0;
};

function closeModal() {
    modal.style.display = 'none'
};
// Attache un evenement au bouton de fermeture pour fermer la modal
closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

