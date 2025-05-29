function caricaDati() {
    var file = new XMLHttpRequest();
    file.open("GET", "json/Anagrafica.json", true);
    file.send();
    file.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonDoc = JSON.parse(file.responseText);
            mostraInfo(jsonDoc);
        }
    };
    document.getElementById("carica").style.width = "0px";
    document.getElementById("carica").style.visibility = "hidden";
    document.getElementById("tab").style.visibility = "visible";
}

function mostraInfo(ogg) {
    var tabella = document.createElement("table");
    var colonnaIndici = ["Immagine", "Nome", "Cognome", "Età", "Indirizzo", "Città", "Telefono 1", "Telefono 2", "Sport 1", "Sport 2"];
    var colonnaTit = document.createElement("tr");
    for (let i = 0; i < colonnaIndici.length; i++) {
        var righe = document.createElement("th");
        righe.appendChild(document.createTextNode(colonnaIndici[i]));
        colonnaTit.appendChild(righe);
    }
    tabella.appendChild(colonnaTit);

    // Usa ogg.Anagrafica.length per iterare su tutte le voci
    for (let i = 0; i < ogg.Anagrafica.length; i++) {
        var colonna = document.createElement("tr");

        var rigaNome = document.createElement("td"),
            rigaCognome = document.createElement("td"),
            rigaEta = document.createElement("td"),
            rigaIndirizzo = document.createElement("td"),
            rigaCitta = document.createElement("td"),
            rigaTelefono1 = document.createElement("td"),
            rigaTelefono2 = document.createElement("td"),
            rigaSport1 = document.createElement("td"),
            rigaSport2 = document.createElement("td"),
            img = document.createElement("td");

        // Popola le righe della tabella
        rigaNome.appendChild(document.createTextNode(ogg.Anagrafica[i].Nome));
        rigaCognome.appendChild(document.createTextNode(ogg.Anagrafica[i].Cognome));
        rigaEta.appendChild(document.createTextNode(ogg.Anagrafica[i].Eta));
        rigaIndirizzo.appendChild(document.createTextNode(ogg.Anagrafica[i].Indirizzo));
        rigaCitta.appendChild(document.createTextNode(ogg.Anagrafica[i].Citta));

        // Verifica i telefoni e sport
        rigaTelefono1.appendChild(document.createTextNode(ogg.Anagrafica[i].Telefoni[0]?.Telefono1 ?? ""));
        rigaTelefono2.appendChild(document.createTextNode(ogg.Anagrafica[i].Telefoni[1]?.Telefono2 ?? ""));
        rigaSport1.appendChild(document.createTextNode(ogg.Anagrafica[i].Sport[0]?.Sport1 ?? ""));
        rigaSport2.appendChild(document.createTextNode(ogg.Anagrafica[i].Sport[1]?.Sport2 ?? ""));

        // Creazione e aggiunta dell'immagine
        let bottone = document.createElement("img");
        bottone.src = ogg.Anagrafica[i].Immagine ?? "default-image.jpg"; // Immagine predefinita se non esiste
        bottone.classList.add("immagineProfilo");
        bottone.addEventListener("click", function() {
            localStorage.setItem("id", ogg.Anagrafica[i].id);
            console.log("Bottone premuto");
            window.location.href = "Cv.html";
        });

        var rigaBottone = document.createElement("td");
        rigaBottone.appendChild(bottone);
        colonna.appendChild(rigaBottone);
        colonna.appendChild(rigaNome);
        colonna.appendChild(rigaCognome);
        colonna.appendChild(rigaEta);
        colonna.appendChild(rigaIndirizzo);
        colonna.appendChild(rigaCitta);
        colonna.appendChild(rigaTelefono1);
        colonna.appendChild(rigaTelefono2);
        colonna.appendChild(rigaSport1);
        colonna.appendChild(rigaSport2);

        tabella.appendChild(colonna);
    }

    // Appende la tabella alla pagina
    document.getElementById("stringaJSON").appendChild(tabella);
}
