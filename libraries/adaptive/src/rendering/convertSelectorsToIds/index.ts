const convertSelectorsToIds = () => {
	if (!document) return

	const calculations = document.__sbCalculations || {}
	const selectors = Object.keys(calculations)

	const out: Record<string, Set<string>> = {}
	for (const selector of selectors) {
		const elem = document.querySelector(selector)
		if (elem && (elem as HTMLElement).id) {
			const id = (elem as HTMLElement).id
			const set = calculations[selector] || new Set<string>()
			out[id] = new Set<string>(Array.from(set as Set<string>))
		}
	}
	document.__sbCalculations = out
}

export default convertSelectorsToIds
