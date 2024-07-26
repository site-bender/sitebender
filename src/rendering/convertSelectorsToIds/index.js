const convertSelectorsToIds = () => {
	if (document) {
		const calculations = document.__sbCalculations || {}
		const selectors = Object.keys(calculations)

		document.__sbCalculations = selectors.reduce((out, selector) => {
			const elem = document.querySelector(selector)

			if (elem?.id) {
				out[elem.id] = calculations[selector]
			}

			return out
		}, {})
	}
}

export default convertSelectorsToIds
