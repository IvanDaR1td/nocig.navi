import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import * as Icons from 'lucide-react';
import { Icon } from '../components/Icon'; // 假设你有一个 Icon 组件来处理 Lucide 图标


function getLucideIcon(name: string, className?: string) {
  const LucideIcon = Icons[name as keyof typeof Icons];
  if (LucideIcon) return <LucideIcon className={className} />;
  const DefaultIcon = Icons.HelpCircle;
  return <DefaultIcon className={className} />;
}

function CollapsibleSection({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  return (
    <div
      ref={contentRef}
      style={{
        maxHeight,
        overflow: 'hidden',
        transition: 'max-height 0.3s ease, opacity 0.3s ease',
        opacity: isOpen ? 1 : 0,
      }}
      aria-hidden={!isOpen}
    >
      {children}
    </div>
  );
}

export default function Inspirations() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<string | null>(null);

  const sections = t('inspirations.sections', { returnObjects: true }) as Record<
    string,
    {
      title: string;
      icon?: string;
      description?: string;
      items: {
        label: string;
        note?: string;
        iframe?: string;
        image?: string;
      }[];
    }
  >;

  const toggle = (key: string) => setOpen(open === key ? null : key);

return (
    <div className="max-w-3xl mx-auto p-6">
      {/* 修改标题部分 */}
      <h1 className="text-4xl md:text-5xl font-handwriting text-center text-primary mb-10 neon-text">
        <span className="flex items-center justify-center gap-2">
          <Icon name={t('inspirations.icon') as keyof typeof Icons} className="w-8 h-8" />
          {t('inspirations.title')}
        </span>
      </h1>

      <div className="space-y-6">
        {Object.entries(sections).map(([key, section]) => (
          <div
            key={key}
            className={clsx(
              'rounded-xl border-2 transition-all duration-300 overflow-hidden',
              open === key
                ? 'bg-[color:var(--color-surface)] border-[color:var(--color-border)] text-[color:var(--color-text)]'
                : 'bg-[color:var(--color-surface)] border-[color:var(--color-border)] text-[color:var(--color-text)] hover:bg-[color:var(--color-surface)]/90'
            )}
          >
            <button
            onClick={() => toggle(key)}
            className={clsx(
              'w-full text-left text-lg font-semibold flex justify-between items-center px-5 py-4 transition-colors duration-300',
              'rounded-lg backdrop-blur-md border border-color',
              'bg-[color:var(--color-surface)] text-title shadow-sm hover:bg-[color:var(--color-surface)]/80'
            )}
            aria-expanded={open === key}
            aria-controls={`${key}-content`}
            id={`${key}-header`}
          >
            <span className="flex items-center gap-3 text-[color:var(--color-title)]">
              {section.icon && getLucideIcon(section.icon, 'w-5 h-5 text-primary')}
              {section.title}
            </span>
            <span className="text-xl text-primary">{open === key ? '−' : '+'}</span>
          </button>


            <CollapsibleSection isOpen={open === key}>
              <div
                id={`${key}-content`}
                role="region"
                aria-labelledby={`${key}-header`}
                className="px-4 mt-2 pb-4"
              >
                {section.description && (
                  <p className="italic text-sm text-[var(--color-secondary)] mb-3 ml-1">
                    {section.description}
                  </p>
                )}

                <ul className="space-y-6 font-handwriting text-lg leading-relaxed">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <div className="before:content-['▹'] before:text-primary before:mr-2 inline-block font-semibold text-[color:var(--color-label)]">
                        {item.label}
                      </div>
                      {item.note && (
                        <p className="ml-6 mt-1 text-sm text-[var(--color-secondary)] italic">
                          {item.note}
                        </p>
                      )}
                      {item.iframe && (
                        <div className="ml-6 mt-3">
                          <iframe
                            src={item.iframe}
                            title={item.label}
                            className="w-full aspect-video rounded-md border border-zinc-600 shadow-md"
                            allowFullScreen
                          />
                        </div>
                      )}
                      {item.image && (
                        <div className="ml-6 mt-3">
                          <img
                            src={item.image}
                            alt={item.label}
                            className="w-full rounded-md border border-zinc-600 shadow"
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleSection>
          </div>
        ))}
      </div>
    </div>
  );
}
