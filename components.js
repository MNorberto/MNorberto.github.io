// Modern Vanilla JS Component System
class Component {
  constructor(element, props = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.props = props;
    this.state = {};
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    // Override in subclasses
  }

  bindEvents() {
    // Override in subclasses
  }
}

// Search Component
class SearchComponent extends Component {
  init() {
    this.state = {
      query: '',
      results: [],
      isSearching: false
    };
    super.init();
  }

  render() {
    if (!this.element) return;
    
    const searchHtml = `
      <div class="search-wrapper">
        <input 
          type="text" 
          id="searchInput" 
          class="search-input" 
          placeholder="Search articles..."
          aria-label="Search articles"
          value="${this.state.query}"
        >
        <button class="search-btn" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
        ${this.state.isSearching ? '<div class="search-loading">Searching...</div>' : ''}
      </div>
    `;
    
    this.element.innerHTML = searchHtml;
    this.bindEvents();
  }

  bindEvents() {
    const searchInput = this.element.querySelector('#searchInput');
    const searchBtn = this.element.querySelector('.search-btn');
    
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        this.setState({ query: e.target.value, isSearching: true });
        
        searchTimeout = setTimeout(() => {
          this.performSearch(e.target.value);
        }, 300);
      });

      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.performSearch(e.target.value);
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.performSearch(this.state.query);
      });
    }
  }

  performSearch(query) {
    this.setState({ isSearching: false });
    
    if (this.props.onSearch) {
      this.props.onSearch(query);
    }
  }
}

// Posts Grid Component
class PostsGridComponent extends Component {
  init() {
    this.state = {
      posts: this.props.posts || [],
      filteredPosts: this.props.posts || [],
      loading: false
    };
    super.init();
  }

  render() {
    if (!this.element) return;

    if (this.state.loading) {
      this.element.innerHTML = '<div class="loading">Loading posts...</div>';
      return;
    }

    if (this.state.filteredPosts.length === 0) {
      this.element.innerHTML = `
        <div class="no-posts">
          <p>No posts found.</p>
        </div>
      `;
      return;
    }

    const postsHtml = this.state.filteredPosts.map(post => `
      <a href="posts/${post.slug}.html" class="post-card">
        <div class="post-header">
          <h2 class="post-title">
            <span>${post.title}</span>
          </h2>
          <time class="post-date">${this.formatDate(post.date)}</time>
        </div>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-tags">
          ${post.tags.map(tag => `<a href="tags.html?tag=${tag.toLowerCase()}" class="tag" onclick="event.stopPropagation()">${tag}</a>`).join('')}
        </div>
      </a>
    `).join('');

    this.element.innerHTML = postsHtml;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  filterPosts(query) {
    if (!query.trim()) {
      this.setState({ filteredPosts: this.state.posts });
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = this.state.posts.filter(post => {
      return post.title.toLowerCase().includes(searchTerm) ||
             post.excerpt.toLowerCase().includes(searchTerm) ||
             post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
             post.author.toLowerCase().includes(searchTerm);
    });

    this.setState({ filteredPosts: filtered });
  }

  filterByTag(tag) {
    if (tag === 'all') {
      this.setState({ filteredPosts: this.state.posts });
      return;
    }

    const filtered = this.state.posts.filter(post => 
      post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    );

    this.setState({ filteredPosts: filtered });
  }
}

// Theme Toggle Component
class ThemeToggleComponent extends Component {
  init() {
    this.state = {
      theme: localStorage.getItem('theme') || 'light'
    };
    this.applyTheme();
    super.init();
  }

  render() {
    if (!this.element) return;
    
    const icon = this.state.theme === 'dark' ? '☀️' : '🌙';
    this.element.innerHTML = `<span class="toggle-icon">${icon}</span>`;
  }

  bindEvents() {
    this.element.addEventListener('click', () => {
      const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
      this.setState({ theme: newTheme });
      this.applyTheme();
      localStorage.setItem('theme', newTheme);
    });
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }
}

// Tags Filter Component
class TagsFilterComponent extends Component {
  init() {
    this.state = {
      selectedTag: 'all',
      tags: this.props.tags || []
    };
    super.init();
  }

  render() {
    if (!this.element) return;

    const tagsHtml = `
      <button class="tag-filter ${this.state.selectedTag === 'all' ? 'active' : ''}" data-tag="all">All Posts</button>
      ${this.state.tags.map(tag => `
        <button class="tag-filter ${this.state.selectedTag === tag.toLowerCase() ? 'active' : ''}" data-tag="${tag.toLowerCase()}">${tag}</button>
      `).join('')}
    `;

    this.element.innerHTML = tagsHtml;
    this.bindEvents();
  }

  bindEvents() {
    const buttons = this.element.querySelectorAll('.tag-filter');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const tag = button.getAttribute('data-tag');
        this.setState({ selectedTag: tag });
        
        if (this.props.onTagSelect) {
          this.props.onTagSelect(tag);
        }
      });
    });
  }

  setActiveTag(tag) {
    this.setState({ selectedTag: tag });
  }
}

// Animation Controller
class AnimationController {
  static addFadeInAnimation() {
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

  static smoothScrollToAnchor() {
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
  }
}

// App Controller
class BlogApp {
  constructor() {
    this.components = {};
    this.postsData = window.postsData || [];
    this.init();
  }

  init() {
    this.initComponents();
    this.handleUrlParams();
    AnimationController.addFadeInAnimation();
    AnimationController.smoothScrollToAnchor();
  }

  initComponents() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      this.components.themeToggle = new ThemeToggleComponent(themeToggle);
    }

    // Search
    const searchContainer = document.querySelector('.nav-search');
    if (searchContainer) {
      this.components.search = new SearchComponent(searchContainer, {
        onSearch: (query) => this.handleSearch(query)
      });
    }

    // Posts Grid
    const postsGrid = document.getElementById('postsGrid') || document.getElementById('filteredPostsGrid');
    if (postsGrid && this.postsData.length > 0) {
      this.components.postsGrid = new PostsGridComponent(postsGrid, {
        posts: this.postsData
      });
    }

    // Tags Filter (only on tags page)
    const tagsCloud = document.querySelector('.tags-cloud');
    if (tagsCloud && this.postsData.length > 0) {
      const allTags = this.getAllTags();
      this.components.tagsFilter = new TagsFilterComponent(tagsCloud, {
        tags: allTags,
        onTagSelect: (tag) => this.handleTagFilter(tag)
      });
    }
  }

  handleSearch(query) {
    if (this.components.postsGrid) {
      this.components.postsGrid.filterPosts(query);
      this.updatePageTitle(query ? `Search Results for "${query}"` : 'Latest Posts');
    }
  }

  handleTagFilter(tag) {
    if (this.components.postsGrid) {
      this.components.postsGrid.filterByTag(tag);
      const displayTag = tag === 'all' ? 'All Posts' : `${tag.charAt(0).toUpperCase() + tag.slice(1)} Posts`;
      this.updatePageTitle(displayTag);
    }
  }

  handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const tagParam = urlParams.get('tag');
    
    if (tagParam && this.components.tagsFilter) {
      this.components.tagsFilter.setActiveTag(tagParam);
      this.handleTagFilter(tagParam);
    }
  }

  updatePageTitle(title) {
    const pageTitle = document.getElementById('postsTitle') || document.querySelector('.section-title');
    if (pageTitle) {
      pageTitle.textContent = title;
    }
  }

  getAllTags() {
    const tags = new Set();
    this.postsData.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Component,
    SearchComponent,
    PostsGridComponent,
    ThemeToggleComponent,
    TagsFilterComponent,
    AnimationController,
    BlogApp
  };
}