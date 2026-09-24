import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import Image from 'next/image';
import { Metadata } from 'next';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = data.projects.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Zahid Hasan Tonmoy`,
    description: project.description.substring(0, 160),
  };
}

export async function generateStaticParams() {
  return data.projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = data.projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Projects
        </Link>

        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
            Category: {project.category}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md shadow-blue-500/20"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors font-medium shadow-md"
              >
                <FaGithub /> View Source
              </a>
            )}
          </div>
        </header>

        {project.images && project.images.length > 0 && (
          <div className="mb-12 relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={project.images[0]}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        )}

        <article className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
            About the Project
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            {project.description.split('\n\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('⚙️') || paragraph.trim().startsWith('👤') || paragraph.trim().startsWith('🔐') || paragraph.trim().startsWith('📲') || paragraph.trim().startsWith('💬') || paragraph.trim().startsWith('🛡️') || paragraph.trim().startsWith('💼') || paragraph.trim().startsWith('Functionalities:') || paragraph.trim().startsWith('Key Features:') || paragraph.trim().startsWith('Project Overview') || paragraph.trim().startsWith('Technical Components')) {
                return <h3 key={index} className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">{paragraph.trim()}</h3>;
              } else if (paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('    ')) {
                 return <ul key={index} className="list-disc list-inside ml-4"><li className="mb-1">{paragraph.replace(/^- |^    /, '').trim()}</li></ul>;
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </article>

        {project.images && project.images.length > 1 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-6">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.images.slice(1).map((img, idx) => (
                <div key={idx} className="relative h-64 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${idx + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
