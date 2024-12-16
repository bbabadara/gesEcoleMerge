// const toogle = document.getElementById("toggle")

// toogle.addEventListener('click', function () {
//     alert("C'est bon")
// })
  // Sélectionne le bouton de toggle et la sidebar
  const toggleButton = document.getElementById('toggle');
  const sidebar = document.getElementById('logo-sidebar');

  // Ajoute un gestionnaire d'événements pour le clic sur le toggle
  toggleButton.addEventListener('click', () => {
    // Alterne la classe 'sidebar-collapsed' pour cacher le texte et réduire la sidebar
    sidebar.classList.toggle('sidebar-collapsed');
  });
