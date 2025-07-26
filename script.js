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

const popularPosts = [
    { title: 'Phone', date: 'May 17, 2024' },
    { title: 'Plain Text', date: 'Oct 10, 2022' },
    { title: 'Steve Jobs at home in 1982', date: 'Dec 27, 2021' }
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
    { 
        title: 'A Study of History', 
        author: 'Arnold J. Toynbee',
        description: 'a comprehensive analysis of the rise and fall of civilizations',
        status: 'completed',
        statusText: 'Finished reading'
    },
    { 
        title: 'On Liberty', 
        author: 'John Stuart Mill',
        description: 'a philosophical great advocating for individual freedom',
        status: 'completed',
        statusText: 'Finished reading'
    }
];

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

// Function to load popular posts
function loadPopularPosts() {
    const container = document.getElementById('popular-posts-list');
    if(container) {
        popularPosts.forEach(post => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#">${post.title}</a><span class="date">${post.date}</span>`;
            container.appendChild(li);
        });
    }
}

// Function to load books into the library section
function loadBooks() {
    const container = document.getElementById('library-section');
    if(container) {
        // Filter books for the homepage view
        const yetToStart = allLibraryBooks.filter(book => book.status === 'yet-to-start').slice(0, 1);
        const reading = allLibraryBooks.filter(book => book.status === 'reading').slice(0, 2);
        const completed = allLibraryBooks.filter(book => book.status === 'completed').slice(0, 2);
        
        const booksToShow = [...yetToStart, ...reading, ...completed];

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

// Run functions when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  handleActiveNav(); 
  loadArticleGrid();
  loadPopularPosts();
  loadBooks();
});
