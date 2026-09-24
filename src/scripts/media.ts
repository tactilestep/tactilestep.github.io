// Ambient videos only play while visible. Reduced motion and data-saving
// preferences leave playback under the visitor's control.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const ambientVideos = document.querySelectorAll<HTMLVideoElement>('[data-ambient-video]');
const visibleVideos = new Set<HTMLVideoElement>();
const manuallyPaused = new WeakSet<HTMLVideoElement>();
const heroButton = document.querySelector<HTMLButtonElement>('.hero-playback');
const heroVideo = document.querySelector<HTMLVideoElement>('#hero-video');

const automaticPlayback = () => !motionPreference.matches && !connection?.saveData;

function syncPlayback(video: HTMLVideoElement) {
  if (document.hidden || !visibleVideos.has(video)) {
    video.pause();
    return;
  }
  if (automaticPlayback() && !manuallyPaused.has(video)) {
    video.play().catch(() => { /* Autoplay may be blocked; playback controls remain available. */ });
  }
}

function updateHeroButton() {
  if (!heroButton || !heroVideo) return;
  heroButton.textContent = heroVideo.paused ? 'Play' : 'Pause';
  heroButton.setAttribute('aria-label', `${heroVideo.paused ? 'Play' : 'Pause'} hero video`);
}

if (heroVideo && heroButton) {
  heroVideo.controls = false;
  heroButton.hidden = false;
  heroButton.addEventListener('click', () => {
    if (heroVideo.paused) {
      manuallyPaused.delete(heroVideo);
      heroVideo.play().catch(() => { heroVideo.controls = true; });
    } else {
      manuallyPaused.add(heroVideo);
      heroVideo.pause();
    }
  });
  heroVideo.addEventListener('play', updateHeroButton);
  heroVideo.addEventListener('pause', updateHeroButton);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.15) visibleVideos.add(video);
      else visibleVideos.delete(video);
      syncPlayback(video);
    }
  }, { threshold: [0, 0.15] });
  ambientVideos.forEach(video => {
    // Muted is also set as a property for consistent browser autoplay behavior.
    video.muted = true;
    video.addEventListener('pause', () => {
      if (visibleVideos.has(video) && !document.hidden) manuallyPaused.add(video);
    });
    video.addEventListener('play', () => {
      manuallyPaused.delete(video);
      if (document.hidden || !visibleVideos.has(video)) video.pause();
    });
    observer.observe(video);
  });
}

document.addEventListener('visibilitychange', () => ambientVideos.forEach(syncPlayback));
motionPreference.addEventListener('change', () => {
  ambientVideos.forEach(video => {
    if (!automaticPlayback()) video.pause();
    else syncPlayback(video);
  });
});

const copyButton = document.querySelector<HTMLButtonElement>('[data-copy-bibtex]');
const copyStatus = document.querySelector<HTMLElement>('[data-copy-status]');
if (copyButton && navigator.clipboard) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const bibtex = document.querySelector('#bibtex')?.textContent;
    if (!bibtex || !copyStatus) return;
    try {
      await navigator.clipboard.writeText(bibtex);
      copyStatus.textContent = 'Citation copied.';
    } catch {
      copyStatus.textContent = 'Please select and copy the citation below.';
    }
  });
}
