import { Metadata } from 'next';
import Link from 'next/link';
import { FaCode, FaChartLine, FaRobot, FaArrowRight } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Services - Zahid Hasan Tonmoy',
  description: 'Hire Zahid Hasan Tonmoy for Web Development, Data Analysis, and AI Agent Development.',
};

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    icon: <FaCode className="text-4xl text-blue-500 mb-4" />,
    description: 'End-to-end full stack web application development using modern technologies. From responsive frontends to robust backends.',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Supabase'],
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    icon: <FaChartLine className="text-4xl text-green-500 mb-4" />,
    description: 'Transforming complex data into actionable insights through statistical analysis, machine learning, and visualization.',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Data Visualization'],
  },
  {
    id: 'ai-development',
    title: 'AI Agent Development',
    icon: <FaRobot className="text-4xl text-purple-500 mb-4" />,
    description: 'Building intelligent AI solutions, predictive models, and custom AI agents tailored for your business needs.',
    skills: ['Machine Learning', 'NLP', 'Predictive Modeling', 'LLMs', 'Python'],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            My Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Leveraging a unique blend of engineering, analytical prowess, and creative problem-solving to help you achieve your goals.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <div className="flex justify-center">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6 flex-grow">
                {service.description}
              </p>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3 text-center border-b border-gray-200 dark:border-gray-700 pb-2">
                  Core Technologies
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-blue-600 dark:bg-blue-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to start your next project?</h2>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Whether you need a full-stack web application, deep data insights, or an intelligent AI solution, I'm here to help.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-900 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              Hire Me <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
