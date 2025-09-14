export default function countNewlines(text: string): number {
  const m = text.match(/\n/g)

  return (m?.length ?? 0)
}
