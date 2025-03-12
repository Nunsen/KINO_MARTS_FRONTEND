document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:8080/api/movieshows")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("movie-container"); //den overordnede boks som filmene placeres indeni

            for (let show of data) { // Itererer gennem alle filmvisninger i vores dummyData
                const movieCard = document.createElement("div");//for hver film/moviecard oprettes en div
                movieCard.classList.add("movie-card");

                //i den oprettede div tilføjer vi disse informationer
                movieCard.innerHTML = ` 
                    <h2>${show.title}</h2>
                    <img src="${show.movie_photo}" alt="Filmbillede" width="300">
                    <div class="day">Mandag <button>14:00</button></div>
                    <div class="day">Tirsdag <button>15:00</button></div>
                    <div class="day">Onsdag <button>14:30</button></div>
                    <div class="day">Torsdag <button>16:00</button></div>
                    <div class="day">Fredag <button>17:00</button></div>
                    <div class="day">Lørdag <button>12:00</button></div>
                    <div class="day">Søndag <button>14:00</button></div>
                `;

                container.appendChild(movieCard); // Tilføjer hver film til HTML'en
            }
        })
        .catch(error => console.error("Fejl ved hentning af data:", error));
});