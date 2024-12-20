// connexion.js

// Fonction principale pour gérer la connexion
const btnLogin = document.getElementById('btnlogin');

btnLogin.addEventListener('click', async function () {
    const login = document.getElementById('login').value.trim();
    const pwd = document.getElementById('pwd').value.trim();

    // Validation des champs
    if (!validateInputs(login, pwd)) {
        return;
    }

    // Envoi des données au serveur
    try {
        const response = await fetch('http://localhost:3000/etudiants');

        if (response.ok) {
            const etudiants = await response.json();
            
            // Recherche de l'utilisateur correspondant
            const etudiant = etudiants.find(et => et.login === login && et.mdp === pwd);

            if (etudiant) {
                console.log('Connexion réussie', etudiant);
                redirectToCourses(etudiant);
            } else {
                showError('Login ou mot de passe incorrect.');
                document.getElementById('pwd').value = '';
            }
        } else {
            showError('Erreur de connexion avec le serveur');
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
    alert(message); // 
}

// Fonction pour rediriger vers la page des cours
function redirectToCourses(etudiant) {
    // Sauvegarder les données de l'étudiant dans le localStorage
    localStorage.setItem('etudiantConnecte', JSON.stringify(etudiant));

    // Redirection
    window.location.href = "listecours.html";
}
