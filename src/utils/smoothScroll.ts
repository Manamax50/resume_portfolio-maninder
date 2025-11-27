export const smoothScroll = (sectionId: string, duration: number = 700) => { //0.7 seconds
  const element = sectionId === 'top' ? null : document.getElementById(sectionId);
  if (sectionId !== 'top' && !element) return;

  // Clamp target so we don't overshoot the document bottom and cut the easing short
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  const rawTargetY = sectionId === 'top' ? 0 : element!.getBoundingClientRect().top + window.scrollY;
  const targetY = Math.min(rawTargetY, maxScrollY);
  const startY = window.scrollY;
  const distance = targetY - startY;
  let start: number | null = null;

 
  const adjustedDuration = duration;

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime: number) => {
    if (start === null) start = currentTime;
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / adjustedDuration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
