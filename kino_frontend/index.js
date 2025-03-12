fetch('http://localhost:8080/api/movieshows')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Fejl:', error));
