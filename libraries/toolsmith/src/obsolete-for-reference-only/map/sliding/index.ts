//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const sliding =
	<K, V>(size: number) =>
	(step: number = 1) =>
	(map: Map<K, V>): Array<Map<K, V>> => {
		if (size <= 0 || step <= 0) return []

		const entries = Array.from(map.entries())

		return Array.from(
			{ length: Math.floor((entries.length - size) / step) + 1 },
			(_, i) => new Map(entries.slice(i * step, i * step + size)),
		).filter((window) => window.size === size)
	}

export default sliding
