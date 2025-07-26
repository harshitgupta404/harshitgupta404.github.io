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

// Function to load article cards into the grid
async function loadArticleGrid() {
  const container = document.getElementById("latest-articles-grid");
  if (container) {
    try {
        const response = await fetch('articles.json');
        const articles = await response.json();

        const latestArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

        container.innerHTML = '';
        latestArticles.forEach(article => {
            const card = document.createElement("div");
            card.className = "article-card";
            const formattedDate = new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            card.innerHTML = `
                <p class="date">${formattedDate}</p>
                <h3><a href="articles.html#${article.id}">${article.title}</a></h3>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading articles:', error);
        container.innerHTML = '<p>Could not load articles.</p>';
    }
  }
}

// Function to load recent notes
async function loadRecentNotes() {
    const container = document.getElementById('recent-notes-list');
    if(container) {
        try {
            const response = await fetch('notes.json');
            const notes = await response.json();

            const latestNotes = notes.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

            container.innerHTML = '';
            latestNotes.forEach(note => {
                const li = document.createElement('li');
                const formattedDate = new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                li.innerHTML = `<a href="notes.html#${note.id}">${note.title}</a><span class="date">${formattedDate}</span>`;
                container.appendChild(li);
            });
        } catch (error) {
            console.error('Error loading notes:', error);
            container.innerHTML = '<li>Could not load notes.</li>';
        }
    }
}

// Function to load books into the library section
async function loadBooks() {
    const container = document.getElementById('library-list');
    if(container) {
        try {
            const response = await fetch('books.json');
            const allBooks = await response.json();

            const yetToStart = allBooks.filter(book => book.status === 'yet-to-start').sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 1);
            const reading = allBooks.filter(book => book.status === 'reading').sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
            const completed = allBooks.filter(book => book.status === 'completed').sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
            
            const booksToShow = [...yetToStart, ...reading, ...completed];

            container.innerHTML = '';
            booksToShow.forEach(book => {
                const item = document.createElement('div');
                item.className = 'book-item';
                
                let summaryHTML = book.summary ? `<p>${book.summary}</p>` : '';

                item.innerHTML = `
                    <h3><a href="books.html#${book.id}">${book.title}</a> <span class="book-author">by ${book.author}</span></h3>
                    ${summaryHTML}
                    <div class="status-pill ${book.status}">
                        <span class="light"></span>
                        ${book.statusText}
                    </div>
                `;
                container.appendChild(item);
            });
        } catch (error) {
            console.error('Error loading books:', error);
            container.innerHTML = '<p>Could not load books.</p>';
        }
    }
}

// Function to handle the "Content I've been consuming" tabs
function handleConsumingTabs() {
    const tabs = document.querySelectorAll('.tab-link');
    const contentContainer = document.getElementById('consuming-content');

    async function renderContent(tab) {
        try {
            const response = await fetch(`${tab}.json`);
            const items = await response.json();

            const latestItems = items.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

            const ul = document.createElement('ul');
            latestItems.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h3><a href="${tab}.html#${item.id}">${item.title}</a></h3>
                    <p class="consuming-item-description">${item.description}</p>
                `;
                ul.appendChild(li);
            });
            
            const viewAllLink = document.createElement('a');
            viewAllLink.className = 'read-more-link';
            viewAllLink.href = `${tab}.html`;
            viewAllLink.textContent = `View all ${tab}`;

            contentContainer.innerHTML = '';
            contentContainer.appendChild(ul);
            contentContainer.appendChild(viewAllLink);
        } catch (error) {
            console.error(`Error loading ${tab}:`, error);
            contentContainer.innerHTML = `<p>Could not load ${tab}.</p>`;
        }
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

// Function to load content for subpages
async function loadSubpageContent() {
    const navContainer = document.getElementById('subpage-nav-list');
    const contentContainer = document.getElementById('subpage-content-area');

    if (!navContainer || !contentContainer) return;

    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const jsonFile = `${currentPage}.json`;

    try {
        const response = await fetch(jsonFile);
        if (!response.ok) {
            contentContainer.innerHTML = `<p>Could not load content. Please check if ${jsonFile} exists.</p>`;
            return;
        }
        const data = await response.json();
        const converter = new showdown.Converter();

        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

        navContainer.innerHTML = '';
        sortedData.forEach((item) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${item.id}`;
            a.textContent = item.title;
            li.appendChild(a);
            navContainer.appendChild(li);
        });

        const renderContent = () => {
            const hash = window.location.hash.substring(1);
            const item = sortedData.find(d => d.id === hash) || sortedData[0];

            if (item) {
                const html = converter.makeHtml(item.content || item.description);
                contentContainer.innerHTML = `<h1>${item.title}</h1>${html}`;

                navContainer.querySelectorAll('a').forEach(l => l.classList.remove('active'));
                const activeLink = navContainer.querySelector(`a[href="#${item.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        };

        navContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = link.getAttribute('href');
                history.pushState(null, null, id);
                renderContent();
                // Close drawer on mobile after clicking a link
                if (window.innerWidth <= 992) {
                    document.body.classList.remove('drawer-open');
                }
            });
        });
        
        window.addEventListener('popstate', renderContent);

        renderContent();

    } catch (error) {
        console.error('Error fetching or parsing content:', error);
        contentContainer.innerHTML = '<p>An error occurred while loading the content.</p>';
    }
}

// Function to handle the mobile navigation drawer
function handleMobileNavDrawer() {
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    const overlay = document.querySelector('.sidebar-overlay');

    if (toggleButton && overlay) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('drawer-open');
        });

        overlay.addEventListener('click', () => {
            document.body.classList.remove('drawer-open');
        });
    }
}

// Run functions when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  handleActiveNav(); 
  loadArticleGrid();
  loadRecentNotes();
  loadBooks();
  handleConsumingTabs();
  loadSubpageContent();
  handleMobileNavDrawer();
});
