import type { LocalValues, Operand } from "../../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import composeOperators from "../../../operations/composers/composeOperators/index.ts"
import collectDependencies from "../../../rendering/helpers/collectDependencies/index.ts"
import isDefined from "../../../utilities/isDefined/index.ts"
import not from "../../../utilities/predicates/not/index.ts"

const FROM_VALUE = ["DATA", "INPUT", "SELECT", "TEXTAREA"]

const addCalculation =
	(element: HTMLElement) => async (calculation: unknown) => {
		const selectors = collectDependencies(calculation)
		const calculate = await composeOperators(calculation as Operand)

		element.__sbCalculate = async function (
			arg?: unknown,
			localValues?: LocalValues,
		) {
			const a = isDefined(arg)
				? arg
				: FROM_VALUE.includes(this.tagName)
				? (this as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
					.value
				: this.innerHTML
			const value = await calculate(a, localValues)

			if (isLeft(value)) {
				if (not(FROM_VALUE.includes(this.tagName))) {
					this.innerHTML = value.left.map((e) => e.message).join(",")
				}
			} else {
				const result = value.right
				const out = `${result}`

				if (FROM_VALUE.includes(this.tagName)) {
					const inputEl = this as
						| HTMLInputElement
						| HTMLTextAreaElement
						| HTMLSelectElement
					inputEl.value = out
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

		element.dataset.calculation = JSON.stringify(calculation)

		document.__sbCalculators ??= new Set()
		document.__sbCalculators.add(element.id)

		selectors.forEach((selector) => {
			document.__sbCalculations ??= {}
			document.__sbCalculations[selector] ??= new Set()
			document.__sbCalculations[selector].add(element.id)
		})
	}

export default addCalculation
