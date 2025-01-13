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

// Recuperer tous les etudiants
const fetchEtudiants = async () => {
  try {
    const etudiants = await fetchData('etudiants');    
    return etudiants;
  } catch (error) {
    console.error('Erreur lors de la récupération des etudiants:', error);
    return [];
  }
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
  
 

// UI Updates
const updateUserInfo = (user) => {
  const nameElement = document.querySelector('#user-info');
  if (nameElement) {
    nameElement.firstChild.textContent = `${user.prenom} ${user.nom}`;
    nameElement.firstChild.nextSibling.textContent = `Matricule: ${user.matricule}`;
  }
};

const generateTbody = (etudiants) => {
  const tbody = document.querySelector('#tbody');
  if (!tbody) return;

  tbody.innerHTML = etudiants.map(etudiant => `
    <tr class="bg-white border dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${etudiant.id}
      </th>
      <td class="px-6 py-4">
        ${etudiant.matricule}
      </td>
      <td class="px-6 py-4">
        ${etudiant.nomComplet}
      </td>
      <td class="px-6 py-4">
        ${etudiant.classe}
      </td>
      <td class="px-6 py-4">
        ${etudiant.adresse}
      </td>
     
    </tr>
  `).join('');
};


//merge de etudiant et classe
const mergeEtudiantsWithClasses = (etudiants, classes) => {
  // Créer des objets pour une recherche plus rapide
  const classesMap = classes.reduce((acc, classe) => {
    acc[classe.id] = classe.libelle;
    return acc;
  }, {});

  return etudiants.map(etudiant => {
    etudiant.classe = classesMap[etudiant.idClasse] || "Non défini";
    return etudiant;
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
    const [etudiants,classes] = await Promise.all([
        fetchEtudiants(),
        fetchClasses()  
    ]);

    // Faire un merge des données (classes, niveaux, filières)
    const mergedEtudiant =mergeEtudiantsWithClasses(etudiants, classes);

    // Afficher les données dans le tableau
    generateTbody(mergedEtudiant);
  } catch (error) {
    console.error('Erreur d\'initialisation:', error);
  }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);
