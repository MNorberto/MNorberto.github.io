// Blog data and state
let posts = [];
let allTags = [];
let currentPage = 'home';
let searchQuery = '';
let selectedTag = '';

// Initialize the blog
document.addEventListener('DOMContentLoaded', async () => {
  await loadPosts();
  initializeRouter();
  initializeTheme();
  initializeSearch();
  
  // Handle navigation
  document.addEventListener('click', handleNavigation);
});

// Load posts from JSON file
async function loadPosts() {
  try {
    const response = await fetch('posts.json');
    posts = await response.json();
    
    // Extract all unique tags
    allTags = [...new Set(posts.flatMap(post => post.tags))].sort();
    
    console.log('Posts loaded:', posts.length);
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

// Initialize theme system
function initializeTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('.toggle-icon');
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Initialize search functionality
function initializeSearch() {
  const searchInput = document.querySelector('.search-input');
  
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    if (currentPage === 'home') {
      renderHomePage();
    }
  });
}

// Router system
function initializeRouter() {
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    routeTo(path, false);
  });
  
  // Initial route
  const path = window.location.pathname;
  routeTo(path, false);
}

function routeTo(path, pushState = true) {
  if (pushState) {
    history.pushState(null, '', path);
  }
  
  // Update active nav item
  updateActiveNav(path);
  
  if (path === '/' || path === '/index.html') {
    currentPage = 'home';
    renderHomePage();
  } else if (path === '/about') {
    currentPage = 'about';
    renderAboutPage();
  } else if (path === '/tags') {
    currentPage = 'tags';
    renderTagsPage();
  } else if (path.startsWith('/tag/')) {
    const tag = path.split('/tag/')[1];
    currentPage = 'tag';
    selectedTag = tag;
    renderTagPage(tag);
  } else if (path.startsWith('/post/')) {
    const postId = parseInt(path.split('/post/')[1]);
    currentPage = 'post';
    renderPostPage(postId);
  }
}

function updateActiveNav(path) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  if (path === '/' || path === '/index.html' || path.startsWith('/post/') || path.startsWith('/tag/')) {
    document.querySelector('[href="/"]')?.classList.add('active');
  } else if (path === '/about') {
    document.querySelector('[href="/about"]')?.classList.add('active');
  } else if (path === '/tags') {
    document.querySelector('[href="/tags"]')?.classList.add('active');
  }
}

// Navigation handler
function handleNavigation(e) {
  const link = e.target.closest('a[href]');
  if (!link) return;
  
  const href = link.getAttribute('href');
  
  // Handle internal links
  if (href.startsWith('/') || href.startsWith('#')) {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      // Handle post cards and other internal links
      if (href.includes('post-')) {
        const postId = parseInt(href.split('post-')[1]);
        routeTo(`/post/${postId}`);
      }
    } else {
      routeTo(href);
    }
  }
}

// Render functions
function renderHomePage() {
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.content.toLowerCase().includes(searchQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery));
    
    return matchesSearch;
  });

  const content = `
    <div class="posts-grid">
      ${filteredPosts.length > 0 ? 
        filteredPosts.map(post => createPostCard(post)).join('') :
        '<div class="no-results">No posts found matching your search.</div>'
      }
    </div>
  `;
  
  document.querySelector('.main .container').innerHTML = content;
}

function renderAboutPage() {
  const content = `
    <div class="page-header">
      <h1 class="page-title">About Me</h1>
      <p class="page-description">
        Passionate web developer and technology enthusiast sharing insights and experiences.
      </p>
    </div>
    
    <div class="about-content">
      <div class="about-section">
        <h2>Who I Am</h2>
        <p>
          I'm a full-stack developer with a passion for creating beautiful, functional web applications. 
          With over 5 years of experience in the industry, I've worked with startups and established 
          companies to bring digital ideas to life.
        </p>
        <p>
          My journey in web development started with curiosity about how websites work, and it has 
          evolved into a deep appreciation for clean code, user experience, and the ever-evolving 
          landscape of web technologies.
        </p>
      </div>
      
      <div class="about-section">
        <h2>What I Write About</h2>
        <div class="topics-grid">
          <div class="topic-card">
            <h3>Frontend Development</h3>
            <p>Modern JavaScript frameworks, CSS techniques, and user interface design patterns that create engaging user experiences.</p>
          </div>
          <div class="topic-card">
            <h3>Backend Technologies</h3>
            <p>Server-side development, database design, API architecture, and cloud computing solutions for scalable applications.</p>
          </div>
          <div class="topic-card">
            <h3>Emerging Technologies</h3>
            <p>AI/ML integration, WebAssembly, serverless architecture, and other cutting-edge technologies shaping the future of web development.</p>
          </div>
        </div>
      </div>
      
      <div class="about-section">
        <h2>My Approach</h2>
        <p>
          I believe in sharing knowledge through practical examples and real-world applications. 
          Every post aims to provide actionable insights that you can apply to your own projects.
        </p>
        
        <ul class="features-list">
          <li>Focus on practical, implementable solutions</li>
          <li>Clear explanations with code examples</li>
          <li>Coverage of both fundamentals and advanced topics</li>
          <li>Regular updates on industry trends and best practices</li>
        </ul>
      </div>
    </div>
  `;
  
  document.querySelector('.main .container').innerHTML = content;
}

function renderTagsPage() {
  const tagCounts = {};
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const content = `
    <div class="page-header">
      <h1 class="page-title">Browse by Tags</h1>
      <p class="page-description">
        Explore posts organized by topics and technologies.
      </p>
    </div>
    
    <div class="tags-cloud">
      ${allTags.map(tag => `
        <a href="/tag/${tag}" class="tag-cloud-item">
          <span class="tag-name">${tag}</span>
          <span class="tag-count">${tagCounts[tag]}</span>
        </a>
      `).join('')}
    </div>
  `;
  
  document.querySelector('.main .container').innerHTML = content;
}

function renderTagPage(tag) {
  const tagPosts = posts.filter(post => post.tags.includes(tag));
  
  const content = `
    <div class="post-nav">
      <a href="/tags" class="back-link">← Back to all tags</a>
    </div>
    
    <div class="page-header">
      <h1 class="page-title">Posts tagged "${tag}"</h1>
      <p class="page-description">
        ${tagPosts.length} post${tagPosts.length !== 1 ? 's' : ''} found.
      </p>
    </div>
    
    <div class="posts-grid">
      ${tagPosts.map(post => createPostCard(post)).join('')}
    </div>
  `;
  
  document.querySelector('.main .container').innerHTML = content;
}

function renderPostPage(postId) {
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    document.querySelector('.main .container').innerHTML = `
      <div class="no-results">Post not found.</div>
    `;
    return;
  }

  // Find previous and next posts
  const currentIndex = posts.findIndex(p => p.id === postId);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const content = `
    <div class="post-nav">
      <a href="/" class="back-link">← Back to all posts</a>
    </div>
    
    <div class="post-content">
      <div class="post-header">
        <div class="post-meta-full">
          <span class="post-date">${formatDate(post.date)}</span>
          <span class="post-category">${post.category}</span>
          <span class="post-author">By ${post.author}</span>
        </div>
        <h1 class="post-title-full">${post.title}</h1>
      </div>
      
      ${post.image ? `
        <div class="post-image">
          <img src="${post.image}" alt="${post.title}" />
        </div>
      ` : ''}
      
      <div class="post-body">
        ${formatPostContent(post.content)}
      </div>
      
      <div class="post-tags">
        ${post.tags.map(tag => `
          <a href="/tag/${tag}" class="post-tag">#${tag}</a>
        `).join('')}
      </div>
      
      <div class="pagination">
        ${prevPost ? `
          <a href="/post/${prevPost.id}" class="nav-link">
            ← ${prevPost.title}
          </a>
        ` : '<div></div>'}
        
        ${nextPost ? `
          <a href="/post/${nextPost.id}" class="nav-link">
            ${nextPost.title} →
          </a>
        ` : '<div></div>'}
      </div>
    </div>
  `;
  
  document.querySelector('.main .container').innerHTML = content;
}

// Helper functions
function createPostCard(post) {
  return `
    <div class="post-card" onclick="routeTo('/post/${post.id}')">
      ${post.image ? `
        <div class="post-card-image">
          <img src="${post.image}" alt="${post.title}" />
        </div>
      ` : ''}
      <div class="post-card-content">
        <div class="post-meta">
          <span class="post-date">${formatDate(post.date)}</span>
          <span class="post-category">${post.category}</span>
        </div>
        <h2 class="post-title">${post.title}</h2>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-tags">
          ${post.tags.slice(0, 3).map(tag => `
            <a href="/tag/${tag}" class="post-tag" onclick="event.stopPropagation()">#${tag}</a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatPostContent(content) {
  return content
    .split('\n\n')
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('');
}