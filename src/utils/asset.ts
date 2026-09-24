// Keep local media and resource links valid under the GitHub Pages base path.
export function assetUrl(path: string): string {
  if (!path || /^(https?:\/\/|#)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
}
