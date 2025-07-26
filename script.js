// Function to toggle between light and dark themes
function toggleTheme() {
  const htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark");

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

// Function to handle the active state of navigation links
function handleActiveNav() {
  const navLinks = document.querySelectorAll('.nav-pill a');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Dummy data for the homepage
const gridArticles = [
    { date: 'Jul 26, 2025', title: 'Week 30, 2025' },
    { date: 'Jul 25, 2025', title: 'Stationery' },
    { date: 'Jul 24, 2025', title: 'Baskerville, Libre Baskerville' },
    { date: 'Jul 23, 2025', title: 'Sublime Text' },
    { date: 'Jul 22, 2025', title: 'Productivity Rituals, Patterns, and Processes' },
    { date: 'Jul 21, 2025', title: 'Touch Typing' },
];

const recentNotes = [
    { title: 'The Art of Saying No', date: 'Jul 15, 2025' },
    { title: 'On Finding Your Ikigai', date: 'Jul 10, 2025' },
    { title: 'Lessons from a Year of Remote Work', date: 'Jul 05, 2025' },
    { title: 'The Power of Unlearning', date: 'Jun 28, 2025' },
    { title: 'Mental Models for Product Managers', date: 'Jun 20, 2025' },
    { title: 'A Guide to Mindful Journaling', date: 'Jun 15, 2025' },
];

const allLibraryBooks = [
    { 
        title: 'Capitalism, Socialism, and Democracy', 
        author: 'Joseph A. Schumpeter',
        description: '',
        status: 'yet-to-start',
        statusText: 'Yet to start'
    },
    { 
        title: 'In Search of Lost Time', 
        author: 'Marcel Proust',
        description: 'a monumental novel exploring memory, time, and identity',
        status: 'reading',
        statusText: 'Currently reading'
    },
    { 
        title: 'Walden', 
        author: 'Henry David Thoreau',
        description: 'a reflective account of simple living in natural surroundings',
        status: 'reading',
        statusText: 'Currently reading'
    },
    { 
        title: 'If This Is a Man', 
        author: 'Primo Levi',
        description: 'a harrowing memoir of his survival in Auschwitz',
        status: 'completed',
        statusText: 'Finished reading'
    },
    { 
        title: 'The Year of Magical Thinking', 
        author: 'Joan Didion',
        description: 'a poignant memoir exploring grief and loss',
        status: 'completed',
        statusText: 'Finished reading'
    },
];

const consumingContent = {
    movies: [
        'The Shawshank Redemption',
        'The Godfather',
        'The Dark Knight',
        'Pulp Fiction',
        'Forrest Gump'
    ],
    series: [
        'Breaking Bad',
        'Game of Thrones',
        'The Sopranos',
        'Friends',
        'The Office'
    ],
    videos: [
        'TED-Ed: How do vaccines work?',
        'Kurzgesagt: The Egg',
        'Vsauce: What is random?',
        'MKBHD: The State of Foldable Phones',
        'CaseyNeistat: The $21,000 First Class Airplane Seat'
    ]
};

// Function to load article cards into the grid
function loadArticleGrid() {
  const container = document.getElementById("latest-articles-grid");
  if (container) {
    gridArticles.forEach(article => {
      const card = document.createElement("div");
      card.className = "article-card";
      card.innerHTML = `<p class="date">${article.date}</p><h3><a href="#">${article.title}</a></h3>`;
      container.appendChild(card);
    });
  }
}

// Function to load recent notes
function loadRecentNotes() {
    const container = document.getElementById('recent-notes-list');
    if(container) {
        recentNotes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#">${note.title}</a><span class="date">${note.date}</span>`;
            container.appendChild(li);
        });
    }
}

// Function to load books into the library section
function loadBooks() {
    const container = document.getElementById('library-section');
    if(container) {
        const booksToShow = allLibraryBooks;

        booksToShow.forEach(book => {
            const item = document.createElement('div');
            item.className = 'book-item';
            
            let descriptionHTML = book.description ? `<p>${book.description}</p>` : '';

            item.innerHTML = `
                <h3>${book.title} <span class="book-author">by ${book.author}</span></h3>
                ${descriptionHTML}
                <div class="status-pill ${book.status}">
                    <span class="light"></span>
                    ${book.statusText}
                </div>
            `;
            container.appendChild(item);
        });
    }
}

// Function to handle the "Content I've been consuming" tabs
function handleConsumingTabs() {
    const tabs = document.querySelectorAll('.tab-link');
    const contentContainer = document.getElementById('consuming-content');

    function renderContent(tab) {
        const content = consumingContent[tab];
        if (!content) return;

        const ul = document.createElement('ul');
        content.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        
        const viewAllLink = document.createElement('a');
        viewAllLink.className = 'read-more-link';
        viewAllLink.href = `${tab}.html`;
        viewAllLink.textContent = `View all ${tab}`;

        contentContainer.innerHTML = '';
        contentContainer.appendChild(ul);
        contentContainer.appendChild(viewAllLink);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderContent(tab.dataset.tab);
        });
    });

    // Initial render
    if (tabs.length > 0) {
        renderContent('movies');
    }
}

// Run functions when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  handleActiveNav(); 
  loadArticleGrid();
  loadRecentNotes();
  loadBooks();
  handleConsumingTabs();
});
