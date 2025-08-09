import composeConditional from "../../operations/composers/composeConditional"
import collectConditionals from "../../rendering/helpers/collectConditionals/index.ts"
import collectDependencies from "../../rendering/helpers/collectDependencies/index.ts"
import makeDisplayToggle from "./makeDisplayToggle"

const addConditionals = (element) => (component) => {
	const conditionals = collectConditionals(component)

	Object.entries(conditionals).forEach(([id, conditional]) => {
		const testCondition = composeConditional(conditional)
		const displayToggle = makeDisplayToggle(id)(testCondition)
		const selectors = collectDependencies(conditional)

		document.__sbDisplayCallbacks ??= {}

		selectors.forEach((selector) => {
			const { id } = element.querySelector(selector) ||
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
