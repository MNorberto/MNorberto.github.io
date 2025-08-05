# Minimal Blog

A clean, static blog with dark/light mode toggle and search functionality.

## Adding New Posts

### Method 1: Edit posts.json (Easiest)

1. Go to your GitHub repository
2. Click on `posts.json`
3. Click the edit button (pencil icon)
4. Add your new post to the array:

```json
{
  "id": 7,
  "title": "Your New Post Title",
  "excerpt": "A brief description of your post...",
  "content": "Full content of your post with line breaks...",
  "date": "2024-01-20",
  "category": "Your Category",
  "tags": ["tag1", "tag2", "tag3"],
  "author": "Your Name"
}
```

5. Commit the changes
6. Your post will appear automatically!

### Method 2: GitHub Actions (Advanced)

Create `.github/workflows/add-post.yml` for automated post creation via GitHub Issues.

### Method 3: Local Development

1. Clone your repository
2. Edit `posts.json` locally
3. Push changes to GitHub

## Post Format

Each post requires:
- **id**: Unique number (increment from last post)
- **title**: Post title
- **excerpt**: Brief description (appears on cards)
- **content**: Full post content (use \n for line breaks)
- **date**: YYYY-MM-DD format
- **category**: Post category
- **tags**: Array of tags
- **author**: Author name

## Deployment

This blog is designed for GitHub Pages. Simply push changes to your repository and they'll be live automatically.

## Features

- ✅ Dark/Light mode toggle
- ✅ Full-text search
- ✅ Responsive design
- ✅ Click posts to read full content
- ✅ Static site (no backend required)
- ✅ Easy to add new posts via JSON