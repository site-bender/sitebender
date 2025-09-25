/**
 * Merge aria-describedby token list with additional ids.
 * - Pure function; returns a space-separated, de-duplicated string or undefined.
 * - Preserves original token order; appends new unique tokens.
 *
 * @example
 * mergeDescribedBy(undefined, "a", undefined, "b") //=> "a b"
 * mergeDescribedBy("a", "b", "a") //=> "a b"
 */
export default function mergeDescribedBy(
	existing: string | undefined,
	...ids: Array<string | undefined>
): string | undefined {
	const base = (existing?.trim() || "").split(/\s+/).filter(Boolean)
	const tokens = new Set(base)
	for (const id of ids) {
		if (!id) continue
		if (!tokens.has(id)) tokens.add(id)
	}
	const result = Array.from(tokens).join(" ")
	return result || undefined
}
