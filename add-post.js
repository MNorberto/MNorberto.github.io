const fs = require('fs');
const path = require('path');

function addNewPost(title, author = 'Miguel', tags = [], excerpt = '') {
  // Generate slug from title
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Get current date
  const date = new Date().toISOString().split('T')[0];

  // Create new post object
  const newPost = {
    id: slug,
    title,
    slug,
    author,
    date,
    excerpt: excerpt || `Learn about ${title.toLowerCase()} in this comprehensive guide.`,
    tags,
    content: [
      {
        type: "section",
        title: "Introduction",
        content: "Add your introduction content here..."
      },
      {
        type: "section", 
        title: "Main Content",
        content: "Add your main content here...",
        code: "// Add code examples here"
      },
      {
        type: "conclusion",
        content: "Add your conclusion here..."
      }
    ]
  };

  // Load existing posts
  const postsData = JSON.parse(fs.readFileSync('posts.json', 'utf8'));
  
  // Add new post to the beginning of the array (latest first)
  postsData.posts.unshift(newPost);

  // Save updated posts
  fs.writeFileSync('posts.json', JSON.stringify(postsData, null, 2));
  
  console.log(`✅ Added new post: "${title}"`);
  console.log(`📝 Edit posts.json to customize the content`);
  console.log(`🚀 Run "node generate-site.js" to build the site`);
  
  return slug;
}

// Command line usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node add-post.js "Post Title" [tags] [excerpt]');
    console.log('Example: node add-post.js "Vue 3 Composition API" "Vue,JavaScript,Frontend" "Learn the new Vue 3 Composition API"');
    process.exit(1);
  }

  const title = args[0];
  const tags = args[1] ? args[1].split(',').map(tag => tag.trim()) : [];
  const excerpt = args[2] || '';

  addNewPost(title, 'Miguel', tags, excerpt);
}

module.exports = addNewPost;