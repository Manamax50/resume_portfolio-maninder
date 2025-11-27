export const smoothScroll = (sectionId: string, duration: number = 1500) => {
  const element = sectionId === 'top' ? null : document.getElementById(sectionId);
  if (sectionId !== 'top' && !element) return;

  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  const rawTargetY = sectionId === 'top' ? 0 : element!.getBoundingClientRect().top + window.scrollY;
  const targetY = Math.min(rawTargetY, maxScrollY);
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  // Prevent double-smoothing from CSS scroll-behavior when JS is animating
  const rootStyle = document.documentElement.style;
  const previousScrollBehavior = rootStyle.scrollBehavior;
  rootStyle.scrollBehavior = 'auto';

  const easeInOutCubic = (t: number) => (
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  );

  const animation = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      rootStyle.scrollBehavior = previousScrollBehavior;
    }
  };

  requestAnimationFrame(animation);
};
