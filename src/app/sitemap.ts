import { MetadataRoute } from 'next'
import data from '@/data/data.json'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zahidhasantonmoy.vercel.app'

  const routes = [
    '',
    '/blog',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectRoutes = data.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  let blogRoutes: MetadataRoute.Sitemap = []
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    blogRoutes = files
      .filter(filename => filename.endsWith('.md'))
      .map(filename => ({
        url: `${baseUrl}/blog/${filename.replace('.md', '')}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  }

  return [...routes, ...projectRoutes, ...blogRoutes]
}
