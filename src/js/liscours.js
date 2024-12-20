// Récupérer la chaîne JSON depuis localStorage
const etudiantJSON = localStorage.getItem('etudiantConnecte');

// Vérifier si des données existent dans localStorage
if (etudiantJSON) {
  // Parser la chaîne JSON pour obtenir l'objet étudiant
  const etudiant = JSON.parse(etudiantJSON);

  // Utiliser les données pour mettre à jour l'interface utilisateur (comme dans l'exemple précédent)
    const nomElement = document.querySelector('#dropdown-user .text-sm:first-child');
    const matriculeElement = document.querySelector('#dropdown-user .text-sm:nth-child(2)');

    if (nomElement) {
        nomElement.textContent = etudiant.nomComplet;
    }

    if (matriculeElement) {
        matriculeElement.textContent = `Matricule: ${etudiant.matricule}`;
    }
} else {
  // Gérer le cas où aucune donnée n'est trouvée dans localStorage
  console.log("Aucun étudiant trouvé dans localStorage.");
    window.location.href = "connexion.html";
}
// Fonction pour récupérer la liste des cours
async function fetchCours() {
  try {
    // Faire une requête GET à l'API JSON Server
    const response = await fetch('http://localhost:3000/cours');
    
    // Vérifier que la réponse est ok
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    // Convertir la réponse en JSON
    const data = await response.json();
    
    // Afficher les cours sur la page
    displayCours(data);
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Fonction pour afficher les cours sur la page (dans un tableau)
function displayCours(cours) {
  // Vérification que les cours existent et que le tbody est présent
  if (!Array.isArray(cours) || cours.length === 0) {
    console.error('Aucun cours à afficher');
    return;
  }

  const tBody = document.querySelector('#tbody');
  if (!tBody) {
    console.error('Elément tbody introuvable');
    return;
  }

  // Créer le contenu HTML pour toutes les lignes
  // const htmlContent = cours.map(cour => {
  //   // Extraire les informations directement du cours
  //   const idCours = cour.id;
  //   const dateCours = cour.dateCours;
  //   const idClasse = cour.idClasse;
  //   const idSemestre = cour.idSemestre;
  //   const idProfesseur = cour.idProfesseur;

  //   return `
  //     <tr>
  //       <td>${idCours}</td>
  //       <td>${dateCours}</td>
  //       <td>${idClasse}</td>
  //       <td>${idSemestre}</td>
  //       <td>${idProfesseur}</td>
  //     </tr>
  //   `;
  // }).join('');

  // Insérer le HTML généré dans le tbody
  tBody.innerHTML = htmlContent;
}


// Appeler la fonction pour récupérer les cours dès que la page est chargée
window.onload = fetchCours;
