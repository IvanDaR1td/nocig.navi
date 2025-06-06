import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();
  
  const projects = t('projects.items', { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    content: string;
    status: string;
  }>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#50fa7b] mb-8 text-center">
        {t('projects.title')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <div 
            key={idx}
            className="bg-[#44475a] rounded-xl p-6 border border-[#6272a4] hover:border-[#bd93f9] transition-all duration-300"
          >
            <div className="flex items-start mb-4">
              <span className="text-3xl mr-3">{project.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-[#f8f8f2]">{project.title}</h3>
                <span className="text-sm text-[#bd93f9]">
                  {project.status === 'completed' ? '✅ Completed' : 
                   project.status === 'wip' ? '🚧 In Progress' : 
                   '🕒 Coming Soon'}
                </span>
              </div>
            </div>
            
            <p className="text-[#f8f8f2] mb-4">{project.content}</p>
            
            <button className="px-4 py-2 text-sm bg-[#6272a4] rounded hover:bg-[#54628c] transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-[#44475a] rounded-xl border border-[#6272a4]">
        <p className="text-[#bd93f9] mb-3">
          {t('projects.inspirationPrompt')}
        </p>
        <a 
          href="/inspirations" 
          className="inline-flex items-center text-[#ff79c6] group"
        >
          <span className="mr-2 group-hover:mr-3 transition-all">
            {t('projects.inspirationLinkText')}
          </span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}