//++ Consume contiguous //++ lines starting at startIdx
export type ContiguousResult = { items: Array<string>; nextIdx: number }

export default function consumeContiguous(
	lines: Array<string>,
	startIdx: number,
	prefix: string,
): ContiguousResult {
	const collect = (idx: number, acc: Array<string>): ContiguousResult => {
		if (idx >= lines.length) return { items: acc, nextIdx: idx }
		const trimmed = lines[idx].trim()
		return trimmed.startsWith(prefix)
			? collect(idx + 1, [...acc, trimmed])
			: { items: acc, nextIdx: idx }
	}
	return collect(startIdx, [])
}
