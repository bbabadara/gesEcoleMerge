// connexion.js

const btnLogin = document.getElementById('btnlogin');

btnLogin.addEventListener('click', async function () {
    const login = document.getElementById('login').value.trim();
    const pwd = document.getElementById('pwd').value.trim();

    // Validation des champs
    if (!validateInputs(login, pwd)) {
        return;
    }

    try {
        // Récupération des utilisateurs depuis le serveur
        const response = await fetch('http://localhost:3000/etudiants');
        if (!response.ok) {
            showError('Impossible de contacter le serveur.');
            return;
        }

        const etudiants = await response.json();

        // Recherche de l'utilisateur correspondant
        const etudiant = etudiants.find(et => et.login === login && et.mdp === pwd);

        if (etudiant) {
            console.log('Connexion réussie', etudiant);
            redirectToCourses();
        } else {
            showError('Login ou mot de passe incorrect.');
            document.getElementById('pwd').value = '';
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        showError('Une erreur réseau est survenue. Veuillez réessayer plus tard.');
    }
});

// Fonction de validation des champs
function validateInputs(login, pwd) {
    if (login === "" || pwd === "") {
        showError("Veuillez remplir tous les champs !");
        return false;
    }
    return true;
}

// Fonction pour afficher une erreur
function showError(message) {
    alert(message); // Peut être remplacé par une bannière ou un message intégré dans la page
}

// Fonction pour rediriger vers la page des cours
function redirectToCourses() {
    window.location.href = "listecours.html";
}
