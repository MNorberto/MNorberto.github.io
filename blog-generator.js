class BlogGenerator {
  constructor(postsData) {
    this.posts = postsData.posts;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  generatePostHTML(post) {
    const relatedPosts = this.getRelatedPosts(post.id, 3);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} - Tech Git Blog</title>
  <meta name="description" content="${post.excerpt}">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="nav-brand">
          <h1><a href="/" style="text-decoration: none; color: inherit;">Tech Git Blog</a></h1>
        </div>
        <div class="nav-search">
          <div class="search-wrapper">
            <input 
              type="text" 
              id="searchInput" 
              class="search-input" 
              placeholder="Search articles..."
              aria-label="Search articles"
            >
            <button class="search-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <span class="toggle-icon">🌙</span>
        </button>
        <ul class="nav-links">
          <li><a href="../index.html" class="nav-link">Home</a></li>
          <li><a href="../about.html" class="nav-link">About</a></li>
          <li><a href="../tags.html" class="nav-link">Tags</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <article class="article">
        <header class="article-header">
          <h1 class="page-title">${post.title}</h1>
          <div class="article-meta">
            <span class="post-author">By ${post.author}</span>
            <time class="post-date">${this.formatDate(post.date)}</time>
            <div class="post-tags">
              ${post.tags.map(tag => `<a href="../tags.html?tag=${tag.toLowerCase()}" class="tag">${tag}</a>`).join('\n              ')}
            </div>
          </div>
        </header>

        <div class="article-content">
          ${this.generateContentSections(post.content)}
        </div>

        <section class="related-posts">
          <h2 class="related-posts-title">Related Posts</h2>
          <div class="related-posts-grid">
            ${relatedPosts.map(relatedPost => `
            <article class="related-post-card">
              <h3 class="related-post-title">
                <a href="${relatedPost.slug}.html">${relatedPost.title}</a>
              </h3>
              <p class="related-post-excerpt">${relatedPost.excerpt}</p>
              <div class="related-post-tags">
                ${relatedPost.tags.map(tag => `<a href="../tags.html?tag=${tag.toLowerCase()}" class="tag">${tag}</a>`).join('\n                ')}
              </div>
            </article>`).join('\n          ')}
          </div>
        </section>
      </article>
    </div>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 Tech Git Blog. Built with ❤️ for developers.</p>
    </div>
  </footer>

  <script src="../script.js"></script>
</body>
</html>`;
  }

  generateContentSections(content) {
    if (!content) return '';
    
    return content.map(section => {
      switch (section.type) {
        case 'section':
          return `
          <h2>${section.title}</h2>
          <p>${section.content}</p>
          ${section.code ? `<pre><code>${this.escapeHtml(section.code)}</code></pre>` : ''}
          ${section.list ? `<ul>${section.list.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}`;
        
        case 'conclusion':
          return `
          <h2>Conclusion</h2>
          <p>${section.content}</p>`;
        
        default:
          return `<p>${section.content}</p>`;
      }
    }).join('\n        ');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getRelatedPosts(currentPostId, limit = 3) {
    return this.posts
      .filter(post => post.id !== currentPostId)
      .slice(0, limit);
  }

  generateIndexHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tech Git Blog - Latest Web Development Insights</title>
  <meta name="description" content="Stay updated with the latest web development trends, tutorials, and best practices. Explore JavaScript, React, CSS, and more.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="nav-brand">
          <h1>Tech Git Blog</h1>
        </div>
        <div class="nav-search">
          <div class="search-wrapper">
            <input 
              type="text" 
              id="searchInput" 
              class="search-input" 
              placeholder="Search articles..."
              aria-label="Search articles"
            >
            <button class="search-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <span class="toggle-icon">🌙</span>
        </button>
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link active">Home</a></li>
          <li><a href="about.html" class="nav-link">About</a></li>
          <li><a href="tags.html" class="nav-link">Tags</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <section class="posts-section">
        <h1 class="section-title">Latest Posts</h1>
        <div class="posts-grid" id="postsGrid">
          ${this.posts.map(post => `
          <a href="posts/${post.slug}.html" class="post-card">
            <div class="post-header">
              <h2 class="post-title">
                <span>${post.title}</span>
              </h2>
              <time class="post-date">${this.formatDate(post.date)}</time>
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-tags">
              ${post.tags.map(tag => `<a href="tags.html?tag=${tag.toLowerCase()}" class="tag" onclick="event.stopPropagation()">${tag}</a>`).join('\n              ')}
            </div>
          </a>`).join('\n        ')}
        </div>
      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 Tech Git Blog. Built with ❤️ for developers.</p>
    </div>
  </footer>

  <script>
    // Load posts data for search functionality
    window.postsData = ${JSON.stringify(this.posts, null, 2)};
  </script>
  <script src="script.js"></script>
</body>
</html>`;
  }

  getAllTags() {
    const tags = new Set();
    this.posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  generateTagsHTML() {
    const allTags = this.getAllTags();
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tags - Tech Git Blog</title>
  <meta name="description" content="Browse all blog posts by tags and topics.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="nav-brand">
          <h1><a href="/" style="text-decoration: none; color: inherit;">Tech Git Blog</a></h1>
        </div>
        <div class="nav-search">
          <div class="search-wrapper">
            <input 
              type="text" 
              id="searchInput" 
              class="search-input" 
              placeholder="Search articles..."
              aria-label="Search articles"
            >
            <button class="search-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <span class="toggle-icon">🌙</span>
        </button>
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="about.html" class="nav-link">About</a></li>
          <li><a href="tags.html" class="nav-link active">Tags</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <div class="container">
      <div class="content-wrapper">
        <h1 class="page-title">Browse by Tags</h1>
        <p class="page-description">Explore articles by topic and technology</p>

        <section class="tags-section">
          <h2>All Tags</h2>
          <div class="tags-cloud">
            <button class="tag-filter active" data-tag="all">All Posts</button>
            ${allTags.map(tag => `<button class="tag-filter" data-tag="${tag.toLowerCase()}">${tag}</button>`).join('\n            ')}
          </div>
        </section>

        <section class="filtered-posts">
          <h2 id="postsTitle">All Posts</h2>
          <div class="posts-grid" id="filteredPostsGrid">
            ${this.posts.map(post => `
            <a href="posts/${post.slug}.html" class="post-card" data-tags="${post.tags.map(tag => tag.toLowerCase()).join(',')}">
              <div class="post-header">
                <h2 class="post-title">
                  <span>${post.title}</span>
                </h2>
                <time class="post-date">${this.formatDate(post.date)}</time>
              </div>
              <p class="post-excerpt">${post.excerpt}</p>
              <div class="post-tags">
                ${post.tags.map(tag => `<a href="tags.html?tag=${tag.toLowerCase()}" class="tag" onclick="event.stopPropagation()">${tag}</a>`).join('\n                ')}
              </div>
            </a>`).join('\n          ')}
          </div>
        </section>
      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 Tech Git Blog. Built with ❤️ for developers.</p>
    </div>
  </footer>

  <script>
    // Load posts data for filtering
    window.postsData = ${JSON.stringify(this.posts, null, 2)};
  </script>
  <script src="script.js"></script>
</body>
</html>`;
  }
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogGenerator;
}