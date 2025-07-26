// Function to toggle between light and dark themes
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// Function to navigate to the home page
function goHome() {
  window.location.href = "index.html";
}

// Dummy data for latest articles and notes
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

// Load content when the window is ready
window.onload = () => {
  loadArticles();
  loadNotes();
};
