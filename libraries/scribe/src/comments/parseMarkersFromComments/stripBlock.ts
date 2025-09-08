export default function stripBlock(full: string): string {
  return full
    .replace(/^\/\*\+\+/, '')
    .replace(/^\/\*\?\?/, '')
    .replace(/^\/\*--/, '')
    .replace(/\*\/$/, '')
    .trim()
}
