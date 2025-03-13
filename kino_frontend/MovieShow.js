document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 MovieShow.js er indlæst!");

    fetch("http://localhost:8080/api/movieshows")
        .then(response => response.json())
        .then(data => {
            console.log("📊 Data fra API:", data);

            const container = document.getElementById("movie-container");
            if (data.length === 0) {
                container.innerHTML = "<p>Ingen filmvisninger tilgængelige.</p>";
                return;
            }

            data.forEach(show => {
                console.log("🎬 Film:", show);

                const movieWrapper = document.createElement("div");
                movieWrapper.classList.add("movie-wrapper");

                // Filmens billede og titel
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <h2 class="movie-title">${show.movie.title}</h2>
                    <img src="${show.movie.movie_photo}" alt="${show.movie.title}">
                `;

                // Opret en container til tidspunkterne
                const timeContainer = document.createElement("div");
                timeContainer.classList.add("time-container");

                // Tjek om der er visningstider
                if (!show.showTimes || show.showTimes.length === 0) {
                    timeContainer.innerHTML = `<p>Ingen visningstider tilgængelige.</p>`;
                } else {
                    // Looper gennem alle visningstider
                    show.showTimes.forEach(time => {
                        const timeElement = document.createElement("div");
                        timeElement.classList.add("time-slot");
                        timeElement.innerHTML = `
                            <p><strong>Dato:</strong> ${show.date_of_movie}</p>
                            <p><strong>Starttid:</strong> ${formatTime(time.start_time)}</p>
                            <p><strong>Sluttid:</strong> ${formatTime(time.end_time)}</p>
                            <button onclick="bookShow('${show.movie.title}', '${show.date_of_movie}', '${formatTime(time.start_time)}')">Book Billet</button>
                        `;
                        timeContainer.appendChild(timeElement);
                    });
                }

                // Tilføj elementer til wrapper
                movieWrapper.appendChild(movieCard);
                movieWrapper.appendChild(timeContainer);
                container.appendChild(movieWrapper);
            });
        })
        .catch(error => {
            console.error("❌ Fejl ved hentning af data:", error);
            document.getElementById("movie-container").innerHTML = "<p>Kunne ikke hente filmvisninger.</p>";
        });
});

// Formatér tidspunkt korrekt
function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" });
}

// Booking funktion
function bookShow(title, date, time) {
    alert(`Du har valgt ${title} den ${date} kl. ${time}`);
}
