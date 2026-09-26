import '../styles/brand.css';
import foshoOnLight from '../assets/brands/fosho-on-light.png';
import foshoOnDark from '../assets/brands/fosho-on-dark.png';
import metraOnLight from '../assets/brands/metra-on-light.png';
import metraOnDark from '../assets/brands/metra-on-dark.png';

const logos = {
  fosho: {
    light: { src: foshoOnLight, width: 834, height: 1038, viewBox: '71 71 692 896' },
    dark: { src: foshoOnDark, width: 512, height: 512, viewBox: '102 56 308 399' },
  },
  metra: {
    light: { src: metraOnLight, width: 1400, height: 350, viewBox: '230 96 938 154' },
    dark: { src: metraOnDark, width: 1400, height: 350, viewBox: '230 96 938 154' },
  },
};

/** Display the original artwork at matching visual bounds, regardless of PNG padding. */
export default function BrandLogo({ brand, className = '' }: { brand: keyof typeof logos; className?: string }) {
  return <span className={`brand-logo brand-logo--${brand} ${className}`} aria-hidden="true">
    {(['light', 'dark'] as const).map(theme => {
      const logo = logos[brand][theme];
      return <svg key={theme} className={`brand-logo-layer brand-logo-on-${theme}`} viewBox={logo.viewBox} focusable="false">
        <image href={logo.src} width={logo.width} height={logo.height} />
      </svg>;
    })}
  </span>;
}
