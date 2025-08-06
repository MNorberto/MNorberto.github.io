# Tech Git Blog

A modern, responsive blog focused on web development, built with a Jekyll-style static site generator.

## 🚀 Live Demo

Visit the live site: [Your GitHub Pages URL]

## ✨ Features

- **Static Site Generation** - Jekyll-style blog with JSON data source
- **Responsive Design** - Mobile-first, fully responsive layout
- **Dark/Light Theme** - Toggle between themes with persistent storage
- **Tag System** - Filter posts by technology and topic
- **Search Functionality** - Real-time search through posts
- **SEO Optimized** - Meta tags, structured data, and semantic HTML
- **Fast Loading** - Optimized CSS and minimal JavaScript
- **Accessible** - WCAG compliant with proper ARIA labels

## 📁 Project Structure

```
├── posts/                 # Generated blog post HTML files
├── posts.json            # Blog posts data source
├── blog-generator.js     # Static site generator
├── generate-site.js      # Build script
├── add-post.js          # New post creation script
├── index.html           # Homepage (generated)
├── tags.html            # Tags page (generated)
├── about.html           # About page (static)
├── styles.css           # Global styles
├── script.js            # Client-side functionality
└── package.json         # Dependencies and scripts
```

## 🛠️ Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd tech-git-blog

# Install dependencies
npm install

# Generate the site
npm run build

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

## 📝 Adding New Posts

### Method 1: Command Line
```bash
# Add a new post
node add-post.js "Your Post Title" "tag1,tag2,tag3" "Post description"

# Build the site
npm run build
```

### Method 2: Direct JSON Editing
1. Edit `posts.json`
2. Add your post object with the following structure:
```json
{
  "id": "post-slug",
  "title": "Your Post Title",
  "slug": "post-slug",
  "author": "Author Name",
  "date": "2024-12-15",
  "excerpt": "Brief description...",
  "tags": ["JavaScript", "React"],
  "content": [
    {
      "type": "section",
      "title": "Section Title",
      "content": "Section content...",
      "code": "// Optional code block"
    }
  ]
}
```
3. Run `npm run build`

## 🔧 Content Structure

Posts in `posts.json` support:

- **Sections** - Main content blocks with optional code examples
- **Lists** - Bulleted or numbered lists
- **Code blocks** - Syntax-highlighted code examples
- **Conclusions** - Special conclusion sections

## 🎨 Customization

### Colors and Themes
Edit CSS variables in `styles.css`:
```css
:root {
  --primary: #111111;
  --link: #6f42c1;
  /* ... other variables */
}
```

### Adding New Pages
1. Create HTML file in root directory
2. Follow existing navigation structure
3. Link from navigation in `blog-generator.js`

## 📦 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Choose source: Deploy from branch `main`
4. Your site will be available at `https://username.github.io/repository-name`

### Other Platforms
The generated static files can be deployed to:
- Netlify
- Vercel
- Firebase Hosting
- Any static hosting service

## 🧩 Scripts

- `npm run build` - Generate all HTML files from JSON data
- `npm run dev` - Start development server
- `npm run start` - Build and start development server
- `npm run add-post` - Interactive post creation

## 🤝 Contributing

1. Fork the repository
2. Add your post to `posts.json`
3. Test locally with `npm run build && npm run dev`
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own blog!

## 🛟 Support

If you encounter any issues:
1. Check that all file paths are correct
2. Ensure `posts.json` is valid JSON
3. Run `npm run build` after any changes
4. Verify all dependencies are installed

---

Built with ❤️ for the developer community