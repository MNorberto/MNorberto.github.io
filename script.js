// Global variables
let postsData = window.postsData || [];

// Theme management
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  // Theme toggle event
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.toggle-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchInput) {
    // Search on input with debouncing
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(e.target.value);
      }, 300);
    });

    // Search on button click
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
      });
    }

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      }
    });
  }
}

function performSearch(query) {
  if (!postsData || postsData.length === 0) {
    console.log('No posts data available for search');
    return;
  }

  const searchTerm = query.toLowerCase().trim();
  
  if (searchTerm === '') {
    showAllPosts();
    return;
  }

  const filteredPosts = postsData.filter(post => {
    return post.title.toLowerCase().includes(searchTerm) ||
           post.excerpt.toLowerCase().includes(searchTerm) ||
           post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
           post.author.toLowerCase().includes(searchTerm);
  });

  displaySearchResults(filteredPosts, searchTerm);
}

function displaySearchResults(posts, searchTerm) {
  const postsGrid = document.getElementById('postsGrid') || document.getElementById('filteredPostsGrid');
  const sectionTitle = document.querySelector('.section-title') || document.getElementById('postsTitle');
  
  if (!postsGrid) return;

  if (posts.length === 0) {
    postsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <p style="color: var(--text-light); font-size: 1.1rem;">
          No posts found for "${searchTerm}"
        </p>
      </div>`;
    if (sectionTitle) {
      sectionTitle.textContent = `Search Results for "${searchTerm}"`;
    }
    return;
  }

  const postsHTML = posts.map(post => `
    <a href="posts/${post.slug}.html" class="post-card" data-tags="${post.tags.map(tag => tag.toLowerCase()).join(',')}">
      <div class="post-header">
        <h2 class="post-title">
          <span>${highlightSearchTerm(post.title, searchTerm)}</span>
        </h2>
        <time class="post-date">${formatDate(post.date)}</time>
      </div>
      <p class="post-excerpt">${highlightSearchTerm(post.excerpt, searchTerm)}</p>
      <div class="post-tags">
        ${post.tags.map(tag => `<span class="tag">${highlightSearchTerm(tag, searchTerm)}</span>`).join('')}
      </div>
    </a>
  `).join('');

  postsGrid.innerHTML = postsHTML;
  
  if (sectionTitle) {
    sectionTitle.textContent = `Search Results for "${searchTerm}" (${posts.length})`;
  }
}

function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark style="background-color: var(--link); color: white; padding: 0.1em 0.2em; border-radius: 2px;">$1</mark>');
}

function showAllPosts() {
  const postsGrid = document.getElementById('postsGrid') || document.getElementById('filteredPostsGrid');
  const sectionTitle = document.querySelector('.section-title') || document.getElementById('postsTitle');
  
  if (!postsGrid || !postsData) return;

  const postsHTML = postsData.map(post => `
    <a href="posts/${post.slug}.html" class="post-card" data-tags="${post.tags.map(tag => tag.toLowerCase()).join(',')}">
      <div class="post-header">
        <h2 class="post-title">
          <span>${post.title}</span>
        </h2>
        <time class="post-date">${formatDate(post.date)}</time>
      </div>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </a>
  `).join('');

  postsGrid.innerHTML = postsHTML;
  
  if (sectionTitle) {
    sectionTitle.textContent = 'Latest Posts';
  }
}

// Tag filtering (for tags page)
function initTagFiltering() {
  const tagFilters = document.querySelectorAll('.tag-filter');
  
  tagFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Remove active class from all filters
      tagFilters.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked filter
      filter.classList.add('active');
      
      const selectedTag = filter.getAttribute('data-tag');
      filterPostsByTag(selectedTag);
    });
  });

  // Check URL for tag parameter
  const urlParams = new URLSearchParams(window.location.search);
  const tagParam = urlParams.get('tag');
  
  if (tagParam) {
    const targetFilter = document.querySelector(`[data-tag="${tagParam}"]`);
    if (targetFilter) {
      targetFilter.click();
    }
  }
}

function filterPostsByTag(tag) {
  const postsGrid = document.getElementById('filteredPostsGrid');
  const postsTitle = document.getElementById('postsTitle');
  const allPosts = document.querySelectorAll('.post-card[data-tags]');
  
  if (!postsGrid) return;

  if (tag === 'all') {
    allPosts.forEach(post => post.style.display = 'block');
    if (postsTitle) {
      postsTitle.textContent = 'All Posts';
    }
    return;
  }

  let visibleCount = 0;
  allPosts.forEach(post => {
    const postTags = post.getAttribute('data-tags').split(',');
    if (postTags.includes(tag.toLowerCase())) {
      post.style.display = 'block';
      visibleCount++;
    } else {
      post.style.display = 'none';
    }
  });

  if (postsTitle) {
    const tagDisplay = tag.charAt(0).toUpperCase() + tag.slice(1);
    postsTitle.textContent = `${tagDisplay} Posts (${visibleCount})`;
  }
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Animation utilities
function addFadeInAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  });

  document.querySelectorAll('.post-card, .topic-card, .related-post-card').forEach(el => {
    observer.observe(el);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSearch();
  initTagFiltering();
  addFadeInAnimation();
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput && searchInput.value) {
    performSearch(searchInput.value);
  } else {
    showAllPosts();
  }
});

// Export functions for external use
window.BlogUtils = {
  addNewPost: (title, author, tags, excerpt) => {
    console.log('Use add-post.js script to add new posts');
  },
  regenerateSite: () => {
    console.log('Use generate-site.js script to regenerate the site');
  }
};