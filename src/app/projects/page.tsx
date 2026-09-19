import data from '@/data/data.json';
import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects - Zahid Hasan Tonmoy',
  description: 'A complete collection of web applications, ML models, and other projects built by Zahid Hasan Tonmoy.',
  alternates: {
    canonical: 'https://zahidhasantonmoy.vercel.app/projects',
  },
};

export default function ProjectsListingPage() {
  return <ProjectsClient projects={data.projects} />;
}
