import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Simple utility to get blog posts
function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'src/content/blog');

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);

  const posts = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '');
      const markdownWithMeta = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
      const { data } = matter(markdownWithMeta);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // Sort by date descending

  return posts;
}

export const metadata = {
  title: 'Blog - Zahid Hasan Tonmoy',
  description: 'Writings on full stack development, data analysis, and AI.',
  alternates: {
    canonical: 'https://zahidhasantonmoy.vercel.app/blog',
  },
};

export default function BlogList() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Thoughts, tutorials, and insights on development and technology.
          </p>
        </header>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No posts yet. Check back soon!</p>
          ) : (
            posts.map(post => (
              <article key={post.slug} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <time className="text-sm text-gray-500 dark:text-gray-400 mb-4 block">
                    {post.date}
                  </time>
                  <p className="text-gray-700 dark:text-gray-300">
                    {post.description}
                  </p>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
