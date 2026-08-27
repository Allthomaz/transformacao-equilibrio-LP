declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | IArguments>;
  }
}

window.dataLayer = window.dataLayer || [];

const pushEvent = (event: string, parameters: Record<string, unknown> = {}) => {
  window.dataLayer.push({ event, ...parameters });
};

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const link = event.target.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;

  const url = new URL(link.href, window.location.href);
  const label = link.textContent?.trim().replace(/\s+/g, ' ') || 'Link sem texto';
  const section = link.closest('section, header, footer')?.id
    || link.closest('header')?.className
    || link.closest('footer')?.className
    || 'pagina';

  if (url.hostname === 'wa.me' || url.hostname.endsWith('whatsapp.com')) {
    pushEvent('click_whatsapp', {
      link_url: url.href,
      link_text: label,
      link_location: section,
    });
  }

  if (url.hostname === 'doctoralia.com.br' || url.hostname.endsWith('.doctoralia.com.br')) {
    pushEvent('click_doctoralia', {
      link_url: url.href,
      link_text: label,
      link_location: section,
    });
  }
});

const reachedDepths = new Set<number>();
const depthMarks = [25, 50, 75, 90];
let ticking = false;

const measureScrollDepth = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;

  for (const depth of depthMarks) {
    if (progress >= depth && !reachedDepths.has(depth)) {
      reachedDepths.add(depth);
      pushEvent('scroll_depth', { percent_scrolled: depth });
    }
  }

  ticking = false;
};

window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(measureScrollDepth);
}, { passive: true });

measureScrollDepth();

export {};
