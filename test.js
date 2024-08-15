async function data(genre) {
    const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`);
    const data = await response.json();
    console.log(data)
}

data("Action")