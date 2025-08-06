const fs = require('fs');
const path = require('path');
const BlogGenerator = require('./blog-generator.js');

// Load posts data
const postsData = JSON.parse(fs.readFileSync('posts.json', 'utf8'));
const generator = new BlogGenerator(postsData);

// Create posts directory if it doesn't exist
const postsDir = path.join(__dirname, 'posts');
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir);
}

// Generate individual post pages
console.log('🔄 Generating blog posts...');
postsData.posts.forEach(post => {
  if (post.content) { // Only generate if content exists
    const html = generator.generatePostHTML(post);
    const filename = path.join(postsDir, `${post.slug}.html`);
    fs.writeFileSync(filename, html);
    console.log(`✅ Generated: ${post.slug}.html`);
  } else {
    console.log(`⚠️  Skipped: ${post.slug}.html (no content)`);
  }
});

// Generate index page
console.log('🔄 Generating index page...');
const indexHTML = generator.generateIndexHTML();
fs.writeFileSync('index.html', indexHTML);
console.log('✅ Generated: index.html');

// Generate tags page
console.log('🔄 Generating tags page...');
const tagsHTML = generator.generateTagsHTML();
fs.writeFileSync('tags.html', tagsHTML);
console.log('✅ Generated: tags.html');

console.log('\n🎉 Site generation complete!');
console.log('\n📝 To add a new post:');
console.log('1. Add post data to posts.json');
console.log('2. Run: node generate-site.js');
console.log('3. Commit and push to GitHub');

// Display statistics
const totalPosts = postsData.posts.length;
const postsWithContent = postsData.posts.filter(post => post.content).length;
const allTags = generator.getAllTags();

console.log('\n📊 Site Statistics:');
console.log(`• Total posts: ${totalPosts}`);
console.log(`• Posts with content: ${postsWithContent}`);
console.log(`• Total tags: ${allTags.length}`);
console.log(`• Tags: ${allTags.join(', ')}`);