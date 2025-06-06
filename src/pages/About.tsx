import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#50fa7b] mb-6">
          {t('about.title')}
        </h1>
        
        <div className="bg-[#44475a] rounded-full w-32 h-32 mx-auto mb-6 overflow-hidden border-4 border-[#bd93f9]">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
        </div>
      </div>
      
      <div className="space-y-6 text-lg">
        <p className="leading-relaxed">
          {t('about.intro1')}
        </p>
        
        <p className="leading-relaxed">
          {t('about.intro2')}
        </p>
        
        <div className="mt-10 p-6 bg-[#44475a] rounded-xl border border-[#6272a4]">
          <p className="italic text-[#bd93f9]">
            {t('about.contact')}
          </p>
          
          <div className="flex space-x-4 mt-4">
            <button className="px-4 py-2 bg-[#bd93f9] text-[#282a36] rounded hover:bg-[#a67de8] transition-colors">
              ✉️ Email
            </button>
            <button className="px-4 py-2 bg-[#6272a4] text-[#f8f8f2] rounded hover:bg-[#54628c] transition-colors">
              💻 GitHub
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <div className="inline-flex space-x-2">
          {['🕹️', '💻', '🎵', '📝', '🎮', '🎨'].map((icon, idx) => (
            <span 
              key={idx} 
              className="text-2xl animate-bounce"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}