document.addEventListener('DOMContentLoaded', () => {
    const penduDisplay = document.getElementById('penduDisplay');
    const penduMotActuel = document.getElementById('penduMotActuel');
    const penduInput = document.getElementById('penduInput');
    const penduSubmit = document.getElementById('penduSubmit');
    const message = document.getElementById('message');
    const mots = [
        "ami", "amour", "arbre", "bateau", "beau", "beaute", "belle", "bibliotheque", "bleu", "bois",
        "bonjour", "bouche", "boulanger", "branche", "brouillard", "bureau", "cafe", "camion", "campagne",
        "carnet", "chaise", "chanson", "chapeau", "chat", "chaud", "chemin", "cheval", "chien", "chocolat",
        "ciel", "citron", "cloche", "coeur", "colline", "conte", "coq", "cour", "crayon", "crepuscule",
        "cuisine", "danse", "dauphin", "decouverte", "delai", "dent", "depart", "diner", "drapeau", "droit",
        "eau", "ecole", "ecriture", "eglise", "electricite", "energie", "enfant", "enveloppe", "etoile",
        "faim", "famille", "fenetre", "feuille", "fille", "fleur", "foret", "fromage", "fruit", "garcon",
        "gateau", "gauche", "glace", "grenouille", "guitare", "herbe", "histoire", "hiver", "homme",
        "horizon", "hotel", "ile", "imagination", "immeuble", "jardin", "jeu", "journee", "jupe", "lait",
        "lampe", "lancement", "langue", "lecture", "legume", "liberte", "livre", "lumiere", "lundi",
        "maison", "maman", "manoir", "marin", "mer", "montagne", "musique", "mystere", "nager", "nuit",
        "ocean", "oiseau", "ombre", "or", "ordinateur", "orage", "oreille", "ours", "page", "pain",
        "papa", "parapluie", "parc", "parfum", "parler", "patience", "pays", "peinture", "pensee", "perle",
        "piano", "plage", "pluie", "poisson", "porte", "poussiere", "prairie", "pre", "printemps",
        "probleme", "promenade", "question", "reve", "riviere", "robe", "rocher", "rouge", "ruisseau",
        "sable", "saison", "salade", "sapin", "scene", "sculpture", "soleil", "sourire", "souvenir",
        "spectacle", "stade", "stylo", "table", "tapis", "telephone", "temps", "the", "tigre", "timbre",
        "train", "tranquillite", "travail", "tresor", "vent", "verre", "village", "ville", "vin", "voiture",
        "voyage", "vue", "zoo"];
    
    let motADeviner = '';
    let lettresTrouvees = [];
    let tentativesRestantes = 6;
    let erreurs = 0;

    function choisirMot() {
        return mots[Math.floor(Math.random() * mots.length)];
    }

    function afficherPendu(erreurs) {
        const dessinsPendu = [
            `
             ------
             |    |
             |
             |
             |
             |
            ---
            `,
            `
             ------
             |    |
             |    O
             |
             |
             |
            ---
            `,
            `
             ------
             |    |
             |    O
             |    |
             |
             |
            ---
            `,
            `
             ------
             |    |
             |    O
             |   /|
             |
             |
            ---
            `,
            `
             ------
             |    |
             |    O
             |   /|\\
             |
             |
            ---
            `,
            `
             ------
             |    |
             |    O
             |   /|\\
             |   /
             |
            ---
            `,
            `
             ------
             |    |
             |    O
             |   /|\\
             |   / \\
             |
            ---
            `
        ];

        penduDisplay.innerHTML = `<pre>${dessinsPendu[erreurs]}</pre>`;
    }

    function afficherMotCache(mot, lettresTrouvees) {
        return mot.split('').map(lettre => lettresTrouvees.includes(lettre) ? lettre : '_').join(' ');
    }

    function initPendu() {
        motADeviner = choisirMot();
        lettresTrouvees = [];
        tentativesRestantes = 6;
        erreurs = 0;
        message.textContent = '';
        penduMotActuel.textContent = afficherMotCache(motADeviner, lettresTrouvees);
        afficherPendu(erreurs);
    }

    penduSubmit.addEventListener('click', () => {
        const lettre = penduInput.value.toLowerCase();
        penduInput.value = '';
        if (lettre.length === 1 && /^[a-z]$/i.test(lettre)) {
            if (lettresTrouvees.includes(lettre)) {
                message.textContent = "Vous avez déjà deviné cette lettre. Essayez encore.";
                return;
            }

            lettresTrouvees.push(lettre);
            if (motADeviner.includes(lettre)) {
                message.textContent = "Bonne devinette!";
            } else {
                message.textContent = "Mauvaise devinette.";
                erreurs++;
                tentativesRestantes--;
                afficherPendu(erreurs);
            }

            penduMotActuel.textContent = afficherMotCache(motADeviner, lettresTrouvees);

            if (!penduMotActuel.textContent.includes('_')) {
                message.textContent = `Félicitations, vous avez deviné le mot: ${motADeviner}`;
                penduInput.disabled = true;
                penduSubmit.disabled = true;
            } else if (tentativesRestantes === 0) {
                message.textContent = `Désolé, vous avez épuisé toutes vos tentatives. Le mot était: ${motADeviner}`;
                penduInput.disabled = true;
                penduSubmit.disabled = true;
            }
        }
    });

    initPendu();
});
