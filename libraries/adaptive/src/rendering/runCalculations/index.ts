import concat from "../../utilities/array/concat/index.ts"
import unique from "../../utilities/array/unique/index.ts"

const runCalculations = () => {
	const calculations = Object.entries(document.__sbCalculations || {})

	let elements = []

	document.__sbCalculations = Object.fromEntries(
		calculations.map(([selector, ids]) => {
			const elem = document.querySelector(selector)

			elements = concat(elements)([...ids])

			return [elem?.id, ids]
		}),
	)

	unique(elements).forEach(async (id) => {
		const elem = document.getElementById(id)

		elem.__sbCalculate && (await elem.__sbCalculate(elem.value))
	})
}

export default runCalculations
