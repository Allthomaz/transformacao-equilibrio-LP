import { animate, inView, stagger } from 'motion';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced) {
  // Hero: entrada em cascata
  animate(
    '.hero__texto > *',
    { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0px)'] },
    { duration: 0.7, delay: stagger(0.12), ease: [0.22, 1, 0.36, 1] },
  );

  // Reveals on-scroll
  inView(
    '[data-reveal]',
    (element) => {
      animate(
        element,
        { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      );
      element.removeAttribute('data-reveal');
    },
    { margin: '-15% 0px' },
  );
}
