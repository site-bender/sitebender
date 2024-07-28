import composeConditional from "../../calculations/composers/composeConditional"
import collectConditionals from "../../utilities/collectConditionals"
import collectDependencies from "../../utilities/collectDependencies"
import makeDisplayToggle from "./makeDisplayToggle"

const addConditionals = element => component => {
	const conditionals = collectConditionals(component)

	Object.entries(conditionals).forEach(([id, conditional]) => {
		const testCondition = composeConditional(conditional)
		const displayToggle = makeDisplayToggle(id)(testCondition)
		const selectors = collectDependencies(conditional)

		document.__sbDisplayCallbacks ??= {}

		selectors.forEach(selector => {
			const { id } =
				element.querySelector(selector) ||
				document.querySelector(selector) ||
				{}

			if (id) {
				document.__sbDisplayCallbacks[id] ??= []
				document.__sbDisplayCallbacks[id].push(displayToggle)
			}
		})
	})
}

export default addConditionals
