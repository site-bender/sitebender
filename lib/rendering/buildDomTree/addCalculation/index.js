import not from "../../../../src/utilities/not"
import composeOperators from "../../../operations/composers/composeOperators"
import collectDependencies from "../../../utilities/collectDependencies"
import isLeft from "../../../utilities/isLeft"

const FROM_VALUE = ["DATA", "INPUT", "SELECT", "TEXTAREA"]

const addCalculation = element => calculation => {
	const selectors = collectDependencies(calculation)
	const calculate = composeOperators(calculation)

	element.__sbCalculate = async function () {
		const arg = FROM_VALUE.includes(this.tagName) ? this.value : this.innerHTML
		const value = await calculate(arg)

		if (isLeft(value)) {
			if (not(FROM_VALUE.includes(this.tagName))) {
				this.innerHTML = value.left.join(",")
			}
		} else {
			const result = value.right
			const out = Number.isNaN(result) ? "--" : `${result}`

			if (FROM_VALUE.includes(this.tagName)) {
				this.value = out
			} else {
				this.innerHTML = out
			}
		}

		element.dispatchEvent(
			new InputEvent("input", {
				view: window,
				bubbles: true,
			}),
		)

		return value
	}

	element.dataset.calculated = JSON.stringify(calculation)

	document.__sbCalculators ??= new Set()
	document.__sbCalculators.add(element.id)

	selectors.forEach(selector => {
		document.__sbCalculations ??= {}
		document.__sbCalculations[selector] ??= new Set()
		document.__sbCalculations[selector].add(element.id)
	})
}

export default addCalculation
