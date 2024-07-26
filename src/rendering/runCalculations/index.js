import concat from "../../utilities/array/concat"
import unique from "../../utilities/array/unique"

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

	unique(elements).forEach(id => {
		const elem = document.getElementById(id)

		elem.__sbCalculate && elem.__sbCalculate(elem.value)
	})
}

export default runCalculations
