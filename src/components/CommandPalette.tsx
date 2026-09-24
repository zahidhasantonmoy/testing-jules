'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCode, FaBook, FaBriefcase, FaEnvelope, FaHome } from 'react-icons/fa';

interface Command {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Toggle Command Palette on Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands: Command[] = [
    {
      id: 'home',
      title: 'Home',
      icon: <FaHome className="text-gray-400" />,
      action: () => router.push('/'),
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <FaCode className="text-gray-400" />,
      action: () => router.push('/projects'),
    },
    {
      id: 'blog',
      title: 'Blog',
      icon: <FaBook className="text-gray-400" />,
      action: () => router.push('/blog'),
    },
    {
      id: 'services',
      title: 'Services',
      icon: <FaBriefcase className="text-gray-400" />,
      action: () => router.push('/services'),
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: <FaEnvelope className="text-gray-400" />,
      action: () => router.push('/#contact'),
    },
  ];

  const filteredCommands = query === ''
    ? commands
    : commands.filter((command) => command.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (action: () => void) => {
    action();
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden z-[101] border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-gray-800">
              <FaSearch className="text-gray-400 mr-3 text-lg" />
              <input
                autoFocus
                type="text"
                className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-lg"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-gray-50 dark:bg-gray-800">
                ESC
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No results found.</div>
              ) : (
                filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    onClick={() => handleSelect(command.action)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      index === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''
                    }`}
                  >
                    <span className="mr-3">{command.icon}</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {command.title}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
