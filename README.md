# Modern Blog

A clean, minimalistic blog built with vanilla HTML, CSS, and JavaScript. Features a responsive design with dark/light theme support and real-time search functionality.

## Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark/Light Theme** - Toggle between themes with persistence
- 🔍 **Real-time Search** - Search through posts by title, content, or tags
- 🏷️ **Tag System** - Browse posts by categories and topics
- ⚡ **Fast Loading** - No frameworks, pure vanilla JavaScript
- 🎨 **Clean UI** - Minimalistic design focused on readability

## Live Demo

Visit the live site: [Your GitHub Pages URL will be here]

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- Local Storage for theme persistence

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # All styles and responsive design
├── script.js           # JavaScript functionality
├── posts.json          # Blog posts data
├── package.json        # Development dependencies
└── README.md           # This file
```

## Getting Started

### Option 1: View on GitHub Pages
Simply visit the GitHub Pages URL (will be available after deployment).

### Option 2: Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/modern-blog.git
   cd modern-blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## Deployment on GitHub Pages

This blog is configured to work seamlessly with GitHub Pages:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

3. **Access your live site:**
   Your site will be available at: `https://yourusername.github.io/repository-name`

## Customization

### Adding New Posts

Edit the `posts.json` file to add new blog posts:

```json
{
  "id": 7,
  "title": "Your New Post Title",
  "excerpt": "A brief description of your post...",
  "content": "Full content of your post...",
  "author": "Your Name",
  "date": "2024-01-15",
  "category": "Technology",
  "tags": ["javascript", "web-development"],
  "image": "https://images.unsplash.com/photo-example"
}
```

### Customizing Colors

Modify CSS variables in `styles.css`:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #222222;
  --accent-color: #333333;
  /* ... */
}
```

### Updating Site Information

- Change the site title in `index.html`
- Update the logo text in the header
- Modify the about page content in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Website: [your-website.com](https://your-website.com)

---

⭐ **Star this repository if you found it helpful!**