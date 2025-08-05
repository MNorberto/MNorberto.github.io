# Contributing to Modern Blog

Thank you for your interest in contributing to Modern Blog! This document provides guidelines and instructions for contributing.

## How to Contribute

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use a clear title** that describes the issue
3. **Provide detailed information** including:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Browser and version
   - Screenshots if applicable

### Suggesting Features

1. **Open an issue** with the label "enhancement"
2. **Describe the feature** and its benefits
3. **Explain the use case** and why it's needed
4. **Consider the scope** - keep it focused and manageable

### Code Contributions

#### Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/modern-blog.git
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Guidelines

##### Code Style
- Use **2 spaces** for indentation
- Follow **semantic HTML** practices
- Use **CSS custom properties** for theming
- Write **vanilla JavaScript** (no frameworks)
- Keep functions **small and focused**
- Use **meaningful variable names**

##### CSS Guidelines
- Use **BEM methodology** for class naming when appropriate
- Leverage **CSS Grid and Flexbox** for layouts
- Ensure **responsive design** works on all screen sizes
- Test both **light and dark themes**

##### JavaScript Guidelines
- Use **modern ES6+ features**
- Keep code **modular and reusable**
- Add **comments** for complex logic
- Handle **errors gracefully**
- Ensure **accessibility** considerations

#### Adding New Features

##### Adding Blog Posts
Edit `posts.json` with proper structure:
```json
{
  "id": 999,
  "title": "Post Title",
  "excerpt": "Brief description...",
  "content": "Full post content...",
  "author": "Author Name",
  "date": "YYYY-MM-DD",
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "image": "https://images.unsplash.com/photo-valid-id"
}
```

##### Adding New Pages
1. Add route handling in `script.js`
2. Create render function
3. Add navigation link if needed
4. Ensure responsive design
5. Test theme switching

#### Testing

Before submitting:

1. **Test responsiveness** on different screen sizes
2. **Verify theme switching** works properly
3. **Check search functionality**
4. **Test navigation** between pages
5. **Validate HTML/CSS** if possible
6. **Test in multiple browsers**

#### Submitting Changes

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add meaningful commit message"
   ```

2. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request:**
   - Use a clear title describing the change
   - Reference any related issues
   - Provide detailed description of changes
   - Include screenshots for UI changes

#### Pull Request Guidelines

- **One feature per PR** - keep changes focused
- **Update documentation** if needed
- **Add comments** explaining complex changes
- **Ensure backwards compatibility**
- **Test thoroughly** before submitting

## Code of Conduct

### Our Standards

- **Be respectful** and inclusive
- **Be collaborative** and helpful
- **Be patient** with newcomers
- **Be constructive** in feedback

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Inappropriate language or imagery

## Getting Help

- **Issues:** Use GitHub issues for bugs and feature requests
- **Discussions:** Use GitHub discussions for general questions
- **Email:** Contact maintainers for sensitive issues

## Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Invited to be maintainers for significant contributions

---

Thank you for contributing to Modern Blog! 🚀