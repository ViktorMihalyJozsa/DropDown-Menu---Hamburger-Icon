/*  ========================================================================  *\

    D R O P D O W N   M E N Ü   J A V A S C R I P T
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    A menü gombokkal hivatkozott oldalak dinamikus betöltése
    és a hamburger menü megnyitása/zárása.
    A menü automatikusan bezáródik, ha új tartalom töltődik be.
    A betöltött tartalom megjelenik a fő tartalomban.
    Hiba esetén hibaüzenet jelenik meg a fő tartalomban.
    A menü automatikusan bezáródik hiba esetén is.

\*  ========================================================================  */

// Automatikusan betölti az alapértelmezett tartalmat, amikor az oldal betöltődik
window.onload = function() {
    loadContent('pages/home.html');  // Kezdőlap automatikus betöltése
}

// Toggle függvény a hamburger menü megnyitásához és bezárásához
function toggleNav(x) {
    const menuContent = document.getElementById("menu-content");

    console.log("toggleNav hívás");

    // Ha hibaüzenet van, töröljük az error osztályt és visszaállítjuk az alapértelmezett menüt
    if (menuContent.classList.contains("error")) {
        menuContent.classList.remove("error");
    }

    // Menü nyitása vagy zárása
    if (menuContent.classList.contains("open-close")) {
        menuContent.classList.remove("open-close");
        x.classList.remove("change");
        console.log("Menü zárva");
    } else {
        menuContent.classList.add("open-close");
        x.classList.add("change");
        console.log("Menü nyitva");
    }
}

// A menü gombokkal hivatkozott oldalak dinamikus betöltése
function loadContent(url) {
    const mainContent = document.getElementById("main-content");  // Fő tartalom
    const menuContent = document.getElementById("menu-content");  // Menü tartalom
    const menuButton = document.getElementById("menu-button");    // Hamburger menü gomb

    console.log("loadContent hívás: " + url);  // URL kiírása a konzolra

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`ERROR: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            // A betöltött tartalom megjelenítése a fő tartalomban
            mainContent.innerHTML = data;  // Betöltött tartalom megjelenítése
            console.log("Betöltött tartalom:", data);  // Betöltött tartalom kiírása a konzolra

            // Menü automatikus bezárása
            menuContent.classList.remove("open-close");
            menuButton.classList.remove("change");
            console.log("Menü automatikusan bezárva");
        })
        .catch(error => {  // Hiba kezelése
            console.error("Betöltési hiba:", error);  // Hibaüzenet a konzolon

            // Hibaüzenet megjelenítése a fő tartalomban
            mainContent.innerHTML = `
                <div class="error-message">
                    <h2>An error occurred!</h2>
                    <br>
                    <p><strong>${error.message}</strong></p>
                    <p>Please try again later.</p>
                </div>
            `;

            // Menü automatikus bezárása hiba esetén
            menuContent.classList.remove("open-close");
            menuButton.classList.remove("change");
            console.log("Menü automatikusan bezárva hiba esetén");
        });
}