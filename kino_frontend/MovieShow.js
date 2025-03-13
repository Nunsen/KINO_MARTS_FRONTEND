document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 MovieShow.js er indlæst!");

    fetch("http://localhost:8080/api/movieshows")
        .then(response => response.json())
        .then(data => {
            console.log("📊 Data fra API:", data); // Debugging

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
                    <h2 class="movie-title">${show.title}</h2>
                    <img src="${show.movie_photo}" alt="${show.title}">
                `;

                // Tidspunktet og book-knappen til højre
                const timeContainer = document.createElement("div");
                timeContainer.classList.add("time-container");
                timeContainer.innerHTML = `
                    <p><strong>Dato:</strong> ${show.date}</p>
                    <p><strong>Starttid:</strong> ${formatTime(show.start_time)}</p>
                    <p><strong>Sluttid:</strong> ${formatTime(show.end_time)}</p>
                    <button onclick="bookShow('${show.title}', '${show.date}', '${formatTime(show.start_time)}')">Book Billet</button>
                `;

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
