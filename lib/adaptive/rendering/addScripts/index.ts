import collectScriptElements from "../../utilities/collectScriptElements"
import buildDomTree from "../buildDomTree.js"

const addScripts = (component) => {
	const head = document && document.head

	if (head) {
		const scripts = collectScriptElements(component)

		scripts.forEach((script) => buildDomTree(head)(script)())
	}
}

export default addScripts
