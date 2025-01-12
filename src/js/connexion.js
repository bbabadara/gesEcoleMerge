// connexion.js

// Fonction principale pour gérer la connexion
const btnLogin = document.getElementById('btnlogin');

btnLogin.addEventListener('click', async function () {
    const login = document.getElementById('login').value.trim();
    const pwd = document.getElementById('pwd').value.trim();

    const loginError = document.getElementById('loginError');
    const passwordError = document.getElementById('passwordError');

    // Réinitialiser les messages d'erreur
    loginError.textContent = "";
    passwordError.textContent = "";

    let hasError = false;

    // Validation des champs
    if (login === "") {
        loginError.textContent = "Le champ 'Login' est requis.";
        hasError = true;
    }

    if (pwd === "") {
        passwordError.textContent = "Le champ 'Mot de passe' est requis.";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    // Vérification de l'utilisateur
    try {
        const response = await fetch('http://localhost:3000/etudiants');

        if (response.ok) {
            const etudiants = await response.json();

            const etudiant = etudiants.find(et => et.login === login && et.mdp === pwd);

            if (etudiant) {
                console.log('Connexion réussie', etudiant);
                redirectToCourses(etudiant);
            } else {
                document.getElementById('alertConnex').innerHTML = `<div  class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-300" role="alert">Login ou mot de passe incorrect.</div>`; 
                document.getElementById('pwd').value = ''; // Réinitialiser le mot de passe
            }
        } else {
            loginError.textContent = "Erreur de connexion avec le serveur.";
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        loginError.textContent = "Une erreur réseau est survenue. Veuillez réessayer plus tard.";
    }
});

// Fonction pour rediriger vers la page des cours
function redirectToCourses(etudiant) {
    // Sauvegarder les données de l'étudiant dans le localStorage
    localStorage.setItem('etudiantConnecte', JSON.stringify(etudiant));

    // Redirection
    window.location.href = "listecours.html";
}
