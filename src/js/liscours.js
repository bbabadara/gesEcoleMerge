alert("ok");
// URL de l'API JSON Server
const API_URL = "http://localhost:3000";

// Fonction pour charger les données des étudiants
async function fetchEtudiants() {
  try {
    // Charger les étudiants
    const responseEtudiants = await fetch(`${API_URL}/etudiants`);
    const etudiants = await responseEtudiants.json();

    // Charger les classes pour obtenir les noms des classes
    const responseClasses = await fetch(`${API_URL}/classes`);
    const classes = await responseClasses.json();

    // Associer les étudiants à leur classe
    etudiants.forEach(etudiant => {
      const classe = classes.find(c => c.id === etudiant.idClasse);
      etudiant.nomClasse = classe ? classe.nom : "Non défini";
    });

    console.log(etudiants);
    

    // Afficher les données
    afficherEtudiants(etudiants);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
}