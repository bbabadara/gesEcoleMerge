// listecours.js

// Constants
const API_URL = 'http://localhost:3000';
const ROUTES = {
  LOGIN: './../connexion.html'
};

// Local Storage Utils
const getStoredUser = () => {
  const data = localStorage.getItem('utilisateurConnecte');
  return data ? JSON.parse(data) : null;
};

// API Service
const fetchData = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) throw new Error(`Erreur API: ${endpoint}`);
  return response.json();
};

// Recuperer tous les classes
const fetchClasses = async () => {
  try {
    const classes = await fetchData('classes');
    return classes;
  } catch (error) {
    console.error('Erreur lors de la récupération des classes:', error);
    return [];
  }
};

// Recuperer tous les niveaux
const fetchNiveaux = async () => {
  try {
    const niveaux = await fetchData('niveaux');
    return niveaux;
  } catch (error) {
    console.error('Erreur lors de la récupération des niveaux:', error);
    return [];
  }
};

// Recuperer tous les filieres
const fetchFilieres = async () => {
  try {
    const filieres = await fetchData('filieres');
    return filieres;
  } catch (error) {
    console.error('Erreur lors de la récupération des filieres:', error);
    return [];
  }
};

// Recuperer toutes les etudiants d'une classe
const fetchEtudiants = async (idClasse) => {
  try {
    const etudiants = await fetchData(`etudiants/classe/${idClasse}`);
    return etudiants;
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants:', error);
    return [];
  }
};

// UI Updates
const updateUserInfo = (user) => {
  console.log(user);
  const nameElement = document.querySelector('#user-info');
  if (nameElement) {
    nameElement.firstChild.textContent = `${user.prenom} ${user.nom}`;
    nameElement.firstChild.nextSibling.textContent = `Matricule: ${user.matricule}`;
  }
};

const generateTbody = (classes) => {
  const tbody = document.querySelector('#tbody');
  if (!tbody) return;

  tbody.innerHTML = classes.map(classe => `
    <tr class="bg-white border dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${classe.libelle}
      </th>
      <td class="px-6 py-4">
        ${classe.idNiveau}
      </td>
      <td class="px-6 py-4">
        ${classe.idFiliere}
      </td>
      <td class="px-6 py-4 flex justify-center">
        <a href="#" data-modal-target="default-modal" data-modal-toggle="default-modal" data-idclasse="${classe.id}">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg> 
        </a>                       
      </td>
    </tr>
  `).join('');
};

const mergeClassesWithNiveauxAndFilieres = (classes, niveaux, filieres) => {
  // Créer des objets pour une recherche plus rapide
  const niveauxMap = niveaux.reduce((acc, niveau) => {
    acc[niveau.id] = niveau.libelle;
    return acc;
  }, {});
  const filieresMap = filieres.reduce((acc, filiere) => {
    acc[filiere.id] = filiere.libelle;
    return acc;
  }, {});

  return classes.map(classe => {
    classe.idNiveau = niveauxMap[classe.idNiveau] || "Non défini";
    classe.idFiliere = filieresMap[classe.idFiliere] || "Non défini";
    return classe;
  });
};

// Main Initialization
const initializePage = async () => {
  const user = getStoredUser();
  
  if (!user) {
    console.log("Session expirée");
    window.location.href = ROUTES.LOGIN;
    return;
  }

  updateUserInfo(user);

  try {
    const [classes, niveaux, filieres] = await Promise.all([
      fetchClasses(),
      fetchNiveaux(),
      fetchFilieres()
    ]);

    // Faire un merge des données (classes, niveaux, filières)
    const mergedClasses = mergeClassesWithNiveauxAndFilieres(classes, niveaux, filieres);

    // Afficher les données dans le tableau
    generateTbody(mergedClasses);
  } catch (error) {
    console.error('Erreur d\'initialisation:', error);
  }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);
