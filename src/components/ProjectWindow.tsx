import { useTranslation } from 'react-i18next';

export default function ProjectWindow() {
  const { t } = useTranslation();

  // Safely get progress percent with fallback and proper type conversion
  const progressPercent = parseInt(
    t('projectWindow.progressPercent', { defaultValue: '0' }),
    10
  ) || 0;

  // Progress text with fallback
  const progressText = t('projectWindow.progressText', { 
    percent: progressPercent,
    defaultValue: `Progress: ${progressPercent}%`
  });

  return (
    <div className="glass-card relative mb-16 w-full max-w-5xl mx-auto p-6 flex flex-col space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-secondary)] pb-3">
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-full bg-[#ff5555]" />
          <div className="w-4 h-4 rounded-full bg-[#f1fa8c]" />
          <div className="w-4 h-4 rounded-full bg-[#50fa7b]" />
        </div>
        <div className="text-sm font-semibold tracking-widest text-black dark:text-[var(--color-secondary)]">
          {t('projectWindow.currentProject', { defaultValue: 'Current Project' })}
        </div>
      </div>

      {/* Project info area */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex-1 text-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-black dark:text-[var(--color-text)]">
            {t('projectWindow.projectName', { defaultValue: 'Project Name' })}
          </h2>
          <p className="mb-4 italic text-[var(--color-secondary)]">
            {t('projectWindow.projectDescription', { defaultValue: 'Project description' })}
          </p>

          {/* Progress bar */}
          <div 
            className="w-full bg-gray-700 rounded-full h-4 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="bg-[var(--color-secondary)] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Progress text */}
          <div className="text-sm mt-1 text-gray-400">{progressText}</div>
        </div>

        <div className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden shadow-lg border border-gray-600">
          <img
            src={t('projectWindow.projectPreviewUrl', { defaultValue: '' })}
            alt={t('projectWindow.projectPreviewAlt', { defaultValue: 'Project preview' })}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 italic">
        {t('projectWindow.status', { defaultValue: 'In progress' })}
      </div>
    </div>
  );
}