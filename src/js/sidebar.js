  // Chemin vers ton fichier CSS
const cssPath = '/src/pages/style.css';

// Crée une balise <link>
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = cssPath;

// Ajoute la balise <link> dans le <head>
document.head.appendChild(link);

  // Sélectionne le bouton de toggle et la sidebar
  const toggleButton = document.getElementById('toggle');
  const sidebar = document.getElementById('logo-sidebar');

  // Ajoute un gestionnaire d'événements pour le clic sur le toggle
  toggleButton.addEventListener('click', () => {
    // Alterne la classe 'sidebar-collapsed' pour cacher le texte et réduire la sidebar
    sidebar.classList.toggle('sidebar-collapsed');
  });


//   document.addEventListener('DOMContentLoaded', () => {
//   const tooltip = document.createElement('div');
//   tooltip.className = 'tooltip';
//   document.body.appendChild(tooltip);

//   document.querySelectorAll('[data-tooltip]').forEach(item => {
//     item.addEventListener('mouseenter', event => {
//       const text = item.getAttribute('data-tooltip');
//       tooltip.textContent = text;
//       tooltip.classList.add('visible');

//       const rect = item.getBoundingClientRect();
//       tooltip.style.left = `${rect.right + 10}px`; // Place le tooltip à droite
//       tooltip.style.top = `${rect.top + rect.height / 2 - tooltip.offsetHeight / 2}px`; // Centré verticalement
//     });

//     item.addEventListener('mousemove', event => {
//       const rect = item.getBoundingClientRect();
//       tooltip.style.left = `${rect.right + 10}px`;
//       tooltip.style.top = `${rect.top + rect.height / 2 - tooltip.offsetHeight / 2}px`;
//     });

//     item.addEventListener('mouseleave', () => {
//       tooltip.classList.remove('visible');
//     });
//   });
// });

