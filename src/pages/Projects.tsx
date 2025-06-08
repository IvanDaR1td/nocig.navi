import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';

function getLucideIcon(name: string, className?: string) {
  const LucideIcon = Icons[name as keyof typeof Icons];
  return LucideIcon ? <LucideIcon className={className} aria-hidden="true" /> : null;
}

export default function Projects() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) as {
    icon: string;
    title: string;
    content: string;
    detail?: string;   // 加上detail字段
    link?: string;
  }[];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-primary mb-8">{t('projects.title')}</h1>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={project.title + index}
              role="button"
              tabIndex={0}
              onClick={() => toggleOpen(index)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleOpen(index);
                }
              }}
              aria-expanded={isOpen}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/20 cursor-pointer transition hover:shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-primary text-2xl">
                  {getLucideIcon(project.icon, 'w-6 h-6')}
                </div>
                <h2 className="text-lg font-semibold text-secondary">{project.title}</h2>
              </div>

              <p
                className={`text-text transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[500px]' : 'max-h-[40px] overflow-hidden'
                }`}
              >
                {project.content}
              </p>

              {isOpen && project.detail && (
                <div className="mt-4 space-y-3 text-text">
                  <p>
                    {project.detail.split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
                      onClick={e => e.stopPropagation()}
                    >
                      查看项目
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
