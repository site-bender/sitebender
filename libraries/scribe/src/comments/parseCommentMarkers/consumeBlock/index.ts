//++ Consume /*++ or /*?? block returning collected lines + termination state
export type BlockResult = { collected: Array<string>; terminated: boolean; nextIdx: number }

export default function consumeBlock(lines: Array<string>, startIdx: number, marker: '/*++' | '/*??'): BlockResult {
	const first = lines[startIdx].trim()
	const openerPattern = marker === '/*++' ? /^\/\*\+\+/ : /^\/\*\?\?/
	const strippedInitial = first.replace(openerPattern, '')
	const immediateClose = strippedInitial.endsWith('*/')
	if (immediateClose) {
		const inner = strippedInitial.slice(0, -2).trim()
		return { collected: inner ? [inner] : [], terminated: true, nextIdx: startIdx + 1 }
	}
	const walk = (idx: number, acc: Array<string>): BlockResult => {
		if (idx >= lines.length) return { collected: acc, terminated: false, nextIdx: idx }
		const current = lines[idx].trim()
		if (current.endsWith('*/')) {
			const body = current.slice(0, -2).trim()
			return { collected: body ? [...acc, body] : acc, terminated: true, nextIdx: idx + 1 }
		}
		return walk(idx + 1, current ? [...acc, current] : acc)
	}
	return walk(startIdx + 1, [])
}
