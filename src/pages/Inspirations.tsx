import { useTranslation } from 'react-i18next';

export default function Inspirations() {
  const { t } = useTranslation();
  
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-4">{t('inspirations.title')}</h1>
      <ul className="list-disc list-inside space-y-2">
        {t('inspirations.list', { returnObjects: true }).map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}