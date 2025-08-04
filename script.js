// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimalism in Design",
    excerpt: "Exploring how less can be more in modern web design. Understanding the principles that make minimalist designs so effective and timeless.",
    content: "Minimalism in design is about removing unnecessary elements while maintaining functionality and visual appeal...",
    date: "2024-01-15",
    category: "Design",
    tags: ["minimalism", "design", "ui/ux"],
    author: "Jane Doe"
  },
  {
    id: 2,
    title: "Building Fast Static Sites",
    excerpt: "Why static sites are making a comeback and how they can improve your web performance. A deep dive into static site generators and their benefits.",
    content: "Static sites offer incredible performance benefits and security advantages over traditional dynamic websites...",
    date: "2024-01-12",
    category: "Development",
    tags: ["static-sites", "performance", "web-development"],
    author: "John Smith"
  },
  {
    id: 3,
    title: "Typography That Speaks",
    excerpt: "The importance of typography in creating readable and engaging content. How to choose fonts that enhance your message.",
    content: "Typography is the backbone of good design. It's not just about making text readable, but about creating hierarchy...",
    date: "2024-01-10",
    category: "Design",
    tags: ["typography", "fonts", "readability"],
    author: "Emily Chen"
  },
  {
    id: 4,
    title: "Dark Mode: More Than a Trend",
    excerpt: "Understanding the benefits of dark mode interfaces and how to implement them effectively for better user experience.",
    content: "Dark mode isn't just a aesthetic choice - it has real benefits for user comfort and battery life...",
    date: "2024-01-08",
    category: "UI/UX",
    tags: ["dark-mode", "accessibility", "user-experience"],
    author: "Mike Johnson"
  },
  {
    id: 5,
    title: "The Psychology of Color",
    excerpt: "How color choices affect user behavior and perception in digital interfaces. The science behind effective color palettes.",
    content: "Color psychology plays a crucial role in design decisions. Different colors evoke different emotions...",
    date: "2024-01-05",
    category: "Design",
    tags: ["color-theory", "psychology", "branding"],
    author: "Sarah Wilson"
  },
  {
    id: 6,
    title: "Performance Optimization Tips",
    excerpt: "Essential techniques for improving website speed and user experience. From image optimization to code splitting strategies.",
    content: "Website performance directly impacts user experience and search engine rankings...",
    date: "2024-01-03",
    category: "Development",
    tags: ["performance", "optimization", "web-vitals"],
    author: "David Lee"
  }
];

let filteredPosts = [...blogPosts];

// DOM elements
const postsContainer = document.getElementById('postsContainer');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const noResults = document.getElementById('noResults');
const toggleIcon = document.querySelector('.toggle-icon');

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  toggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Post rendering
function renderPosts(posts) {
  if (posts.length === 0) {
    postsContainer.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }

  postsContainer.style.display = 'grid';
  noResults.style.display = 'none';

  postsContainer.innerHTML = posts.map(post => `
    <article class="post-card" data-post-id="${post.id}">
      <div class="post-meta">
        <span class="post-date">${formatDate(post.date)}</span>
        <span class="post-category">${post.category}</span>
      </div>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-tags">
        ${post.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
      </div>
    </article>
  `).join('');
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Search functionality
function searchPosts(query) {
  if (!query.trim()) {
    filteredPosts = [...blogPosts];
  } else {
    const searchTerm = query.toLowerCase();
    filteredPosts = blogPosts.filter(post => {
      const searchableText = [
        post.title,
        post.excerpt,
        post.content,
        post.category,
        post.author,
        ...post.tags
      ].join(' ').toLowerCase();
      
      return searchableText.includes(searchTerm);
    });
  }
  
  renderPosts(filteredPosts);
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);

searchInput.addEventListener('input', (e) => {
  searchPosts(e.target.value);
});

// Simulate post click (in a real blog, this would navigate to the full post)
postsContainer.addEventListener('click', (e) => {
  const postCard = e.target.closest('.post-card');
  if (postCard) {
    const postId = postCard.dataset.postId;
    const post = blogPosts.find(p => p.id === parseInt(postId));
    
    // In a real implementation, this would navigate to a detailed post page
    alert(`Opening post: "${post.title}"\n\nIn a real blog, this would open the full article.`);
  }
});

// Clear search with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    searchPosts('');
    searchInput.blur();
  }
});

// Initialize the blog
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderPosts(filteredPosts);
});

// Sort posts by date (newest first) on load
blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));