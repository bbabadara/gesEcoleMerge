// Charge dynamiquement la feuille de styles
const cssPath = '/src/pages/style.css';
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = cssPath;
document.head.appendChild(link);

// Toggle de la sidebar
const toggleButton = document.getElementById('toggle');
const sidebar = document.getElementById('logo-sidebar');
toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-collapsed');
});

// Gestion des tooltips
document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  document.querySelectorAll('[data-tooltip]').forEach(item => {
    item.addEventListener('mouseenter', event => {
      const text = item.getAttribute('data-tooltip');
      tooltip.textContent = text;
      tooltip.classList.add('visible');

      const rect = item.getBoundingClientRect();
      tooltip.style.left = `${rect.right + 10}px`; // Place à droite de l'élément
      tooltip.style.top = `${rect.top + window.scrollY + rect.height / 2 - tooltip.offsetHeight / 2}px`; // Centré verticalement
    });

    item.addEventListener('mousemove', event => {
      const rect = item.getBoundingClientRect();
      tooltip.style.left = `${rect.right + 10}px`;
      tooltip.style.top = `${rect.top + window.scrollY + rect.height / 2 - tooltip.offsetHeight / 2}px`;
    });

    item.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
});


