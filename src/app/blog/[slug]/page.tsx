import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir);
  return files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      slug: filename.replace('.md', ''),
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const filePath = path.join(blogDir, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { title: 'Post Not Found' };
  }

  const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(markdownWithMeta);

  return {
    title: `${data.title} - Zahid Hasan Tonmoy`,
    description: data.description,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const filePath = path.join(blogDir, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(markdownWithMeta);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Blog
        </Link>

        <article className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <header className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {data.title}
            </h1>
            <time className="text-gray-500 dark:text-gray-400">
              {data.date}
            </time>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
