// Function to toggle between light and dark themes
function toggleTheme() {
  const htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark");

  // Save the new theme state to localStorage
  if (htmlElement.classList.contains("dark")) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

// Function to navigate to the home page
function goHome() {
  window.location.href = "index.html";
}

// Function to handle the active state of navigation links based on the current page
function handleActiveNav() {
  const navLinks = document.querySelectorAll('.nav-pill a');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Dummy data for latest articles and notes (only needed for index.html)
const articles = [
  "How I built my portfolio site",
  "Designing with performance in mind",
  "From MVP to polished product",
  "Lessons from a debugging nightmare",
  "Everything is a JSON",
  "React patterns I use everyday",
  "Writing content like code",
];

const notes = [
  "You don’t need more time, just less distractions",
  "Most decisions are reversible",
  "Ship before you think it's perfect",
  "Solve for understanding, not memorization",
  "Logs > guesses",
];

// Function to load article titles into the list
function loadArticles() {
  const container = document.getElementById("latest-articles");
  if (container) {
    articles.slice(0, 6).forEach((title) => {
      const li = document.createElement("li");
      li.textContent = title;
      container.appendChild(li);
    });
  }
}

// Function to load notes into the list
function loadNotes() {
  const container = document.getElementById("highlight-notes");
  if (container) {
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      container.appendChild(li);
    });
  }
}

// Load dynamic content and set up event listeners when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // These functions will only run if the corresponding elements exist on the page
  loadArticles();
  loadNotes();
  
  // This will run on all pages to set the active nav link
  handleActiveNav(); 
});
