import composeConditional from "../../operations/composers/composeConditional/index.ts"
import collectConditionals from "../../rendering/helpers/collectConditionals/index.ts"
import collectDependencies from "../../rendering/helpers/collectDependencies/index.ts"
import makeDisplayToggle from "./makeDisplayToggle/index.ts"

type ComponentLike = { attributes?: { id?: string }; [key: string]: unknown }

const addConditionals = (element: Element) => (component: ComponentLike) => {
	const conditionals = collectConditionals(component)

	Object.entries(conditionals as Record<string, unknown>).forEach(([id, conditional]) => {
		const testCondition = composeConditional(conditional)
		const displayToggle = makeDisplayToggle(id)(testCondition)
		const selectors = collectDependencies(conditional)

	const callbacks = (document.__sbDisplayCallbacks ??= {})

		selectors.forEach((selector) => {
			const { id } = (element as ParentNode).querySelector(selector) ||
				document.querySelector(selector) ||
				({} as { id?: string })

			if (id) {
				callbacks[id] ??= []
				callbacks[id].push(displayToggle)
			}
		})
	})
}

export default addConditionals
