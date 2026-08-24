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

  // Passos: entrada coordenada para evitar tremor entre os cards.
  const passos = document.querySelector<HTMLElement>('[data-passos-reveal]');
  if (passos) {
    const cards = passos.querySelectorAll<HTMLElement>('.passo');
    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
    });

    inView(
      passos,
      () => {
        animate(
          cards,
          { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0px)'] },
          { duration: 0.45, delay: stagger(0.08), ease: [0.22, 1, 0.36, 1] },
        );
        passos.removeAttribute('data-passos-reveal');
      },
      { margin: '0px 0px -15% 0px' },
    );
  }

  // Vídeo: entrada suave antes de assumir a reprodução por visibilidade.
  const videoWrap = document.querySelector<HTMLElement>('[data-video-reveal]');
  if (videoWrap) {
    videoWrap.style.opacity = '0';
    videoWrap.style.transform = 'translateY(12px) scale(0.985)';

    inView(
      videoWrap,
      () => {
        animate(
          videoWrap,
          {
            opacity: [0, 1],
            transform: ['translateY(12px) scale(0.985)', 'translateY(0px) scale(1)'],
          },
          { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        );
        videoWrap.removeAttribute('data-video-reveal');
      },
      { margin: '0px 0px -12% 0px' },
    );
  }
}
