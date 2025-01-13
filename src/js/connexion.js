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
        const response = await fetch('http://localhost:3000/utilisateurs'); // Changer 'etudiants' à 'utilisateurs'

        if (response.ok) {
            const utilisateurs = await response.json();

            const utilisateur = utilisateurs.find(user => user.login === login && user.mdp === pwd);

            if (utilisateur) {
                console.log('Connexion réussie', utilisateur);
                redirectToRoleBasedPage(utilisateur); // Redirection basée sur le rôle
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

// Fonction pour rediriger l'utilisateur en fonction de son rôle
function redirectToRoleBasedPage(utilisateur) {
    // Sauvegarder les données de l'utilisateur dans le localStorage
    localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateur));

    // Vérifier le rôle de l'utilisateur et rediriger en conséquence
    switch (utilisateur.idRole) {
        case 1: // RP
            window.location.href = "./rpviews/classes.html";  
        case 2: // AC
            window.location.href = "./rpviews/classes.html";  
            break;
        case 3: // Professeur
            window.location.href = "./profviews/coursprofs.html";  
            break;
        case 4: // Etudiant
        window.location.href = "./etudiantviews/listecours.html"
        break;
        default:
            console.log("Rôle inconnu");
            break;
    }
}
