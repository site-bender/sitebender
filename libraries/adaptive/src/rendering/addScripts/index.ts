import buildDomTree, { type ElementConfig } from "../buildDomTree/index.ts"
import collectScriptElements from "../helpers/collectScriptElements/index.ts"

const addScripts = (component: Record<string, unknown>) => {
	const head = document && document.head

	if (head) {
		const scripts = collectScriptElements(component)

		const toScriptElement = (src: string): ElementConfig => ({
			tag: "SCRIPT",
			attributes: { src },
		})

		scripts.forEach((src) => buildDomTree(head)(toScriptElement(src))())
	}
}

export default addScripts
