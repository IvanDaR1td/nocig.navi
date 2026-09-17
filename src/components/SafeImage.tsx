import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
export default function SafeImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { t } = useTranslation();
  const [failedSrc, setFailedSrc] = useState<string>();
  if (props.src && failedSrc === props.src) {
    return <span className={'image-fallback ' + (props.className || '')} role="img" aria-label={props.alt}>
      {t('common.imageUnavailable')}
    </span>;
  }
  return <img {...props} onError={() => setFailedSrc(props.src)} />;
}
