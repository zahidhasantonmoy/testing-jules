'use client';
import Link from 'next/link';
import data from '@/data/data.json';
import { FaArrowLeft } from 'react-icons/fa';
import ProjectCard from '@/components/ProjectCard';
import { useRouter } from 'next/navigation';

export default function ProjectsListingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">All Projects</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A complete collection of my web applications, ML models, and other projects.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project) => (
            <div key={project.id} className="block h-full">
              <ProjectCard
                title={project.title}
                description={project.description}
                images={project.images}
                technologies={project.technologies || []}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                onClick={() => router.push(`/projects/${project.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
