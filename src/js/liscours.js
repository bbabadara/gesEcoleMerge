// listecours.js

// Constants
const API_URL = 'http://localhost:3000';
const ROUTES = {
  LOGIN: 'connexion.html'
};

// Local Storage Utils
const getStoredStudent = () => {
  const data = localStorage.getItem('etudiantConnecte');
  return data ? JSON.parse(data) : null;
};

// API Service
const fetchData = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) throw new Error(`Erreur API: ${endpoint}`);
  return response.json();
};

// Course Data Service
const fetchCourseData = async (classId) => {
  try {
    const [courses, professors] = await Promise.all([
      fetchData('cours'),
      fetchData('professeurs')
    ]);

    return courses
      .filter(course => course.idClasse === classId)
      .map(course => {
        const professor = professors.find(p => p.id === course.idProfesseur);
        return {
          ...course,
          nomProfesseur: professor ? `${professor.prenom} ${professor.nom}` : 'Inconnu'
        };
      });
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    return [];
  }
};

// UI Updates
const updateStudentInfo = (student) => {
  const nameElement = document.querySelector('#dropdown-user .text-sm:first-child');
  const idElement = document.querySelector('#dropdown-user .text-sm:nth-child(2)');

  if (nameElement) nameElement.textContent = student.nomComplet;
  if (idElement) idElement.textContent = `Matricule: ${student.matricule}`;
};

const renderCourseTable = (courses) => {
  const tbody = document.querySelector('#tbody');
  if (!tbody) return;

  tbody.innerHTML = courses.map(course => `
    <tr class="bg-white border dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${course.libelle}
      </th>
      <td class="px-6 py-4">
        ${course.nombreHeures}H
      </td>
      <td class="px-6 py-4">
        ${course.nomProfesseur}
      </td>
      <td class="px-6 py-4 flex justify-center">
        <a href="#" data-modal-target="default-modal" data-modal-toggle="default-modal" 
           data-course-id="${course.id}">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
        </a>
      </td>
    </tr>
  `).join('');
};

// Event Handlers
const handleSemestreChange = async (student) => {
  const semestreSelect = document.querySelector('select');
  if (!semestreSelect) return;

  semestreSelect.addEventListener('change', async () => {
    const courses = await fetchCourseData(student.idClasse);
    renderCourseTable(courses);
  });
};

// Main Initialization
const initializePage = async () => {
  const student = getStoredStudent();
  
  if (!student) {
    console.log("Session expirée");
    window.location.href = ROUTES.LOGIN;
    return;
  }

  updateStudentInfo(student);
  
  try {
    const courses = await fetchCourseData(student.idClasse);
    renderCourseTable(courses);
    handleSemestreChange(student);
  } catch (error) {
    console.error('Erreur d\'initialisation:', error);
  }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);
