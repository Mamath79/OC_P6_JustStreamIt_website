// // fonction permetant de recuperer tous les genres de l'api
// async function getGenresList() {
//     let genresList = [];
//     let nextPage = `http://localhost:8000/api/v1/genres/`;

//     while (nextPage) {
//         const response = await fetch(nextPage);
//         const data = await response.json();
//         genresList = genresList.concat(data.results);
//         nextPage = data.next;
//     }
//     return genresList;
// };

// // fonction permettant de mettre en place les options dans la selection libre de genre
// async function appendSelectGenresList() {
//     const genresList = await getGenresList();
//     const selectElement = document.getElementById("genres-select");

//     genresList.forEach(genre =>{
//         const optionElement = document.createElement('option');
//         optionElement.value = genre.name;
//         optionElement.textContent = genre.name;
//         selectElement.appendChild(optionElement);
//     });
// }

// // Ajouter un écouteur pour l'événement de changement de sélection
// selectElement.addEventListener('change', function(event) {
//     const selectedGenre = event.target.value;
//     console.log('Genre sélectionné :', selectedGenre);
//     // Vous pouvez ajouter ici une fonction pour afficher des films basés sur le genre sélectionné
// });


// appendSelectGenresList()
