// Modern Blog Application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the blog app
  const app = new BlogApp();
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value) {
      app.handleSearch(searchInput.value);
    } else if (app.components.postsGrid) {
      app.components.postsGrid.setState({ 
        filteredPosts: app.components.postsGrid.state.posts 
      });
    }
  });

  // Global utilities
  window.BlogUtils = {
    formatDate: (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    highlightSearchTerm: (text, searchTerm) => {
      if (!searchTerm) return text;
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      return text.replace(regex, '<mark style="background-color: var(--link); color: white; padding: 0.1em 0.2em; border-radius: 2px;">$1</mark>');
    },

    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };

  // Performance optimizations
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Preload critical resources
      const criticalImages = document.querySelectorAll('img[data-src]');
      criticalImages.forEach(img => {
        img.src = img.dataset.src;
      });
    });
  }

  // Service Worker registration (for offline support)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
});