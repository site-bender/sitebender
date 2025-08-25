export default function Fragment(
  { children }: { children?: unknown[] }
): unknown {
  if (Array.isArray(children)) {
    const flat = children.flat(Infinity)
    return flat.length === 1 ? flat[0] : flat
  }
  return children
}
