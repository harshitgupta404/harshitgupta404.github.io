// Toggle between light and dark themes
function toggleTheme() {
  document.body.classList.toggle('dark');
}

function goHome() {
  window.location.href = 'index.html';
}

// Dummy data for latest articles and notes
const articles = [
  'How I built my portfolio site',
  'Designing with performance in mind',
  'From MVP to polished product',
  'Lessons from debugging nightmare',
  'Everything is a JSON',
  'React patterns I use everyday',
  'Writing content like code'
];

const notes = [
  'You don’t need more time, just less distractions',
  'Most decisions are reversible',
  'Ship before perfect',
  'Solve for understanding not memorization',
  'Logs > guesses'
];

function loadArticles() {
  const container = document.getElementById('latest-articles');
  articles.slice(0, 6).forEach(title => {
    const li = document.createElement('li');
    li.textContent = title;
    container.appendChild(li);
  });
}

function loadNotes() {
  const container = document.getElementById('highlight-notes');
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    container.appendChild(li);
  });
}

window.onload = () => {
  loadArticles();
  loadNotes();
};
