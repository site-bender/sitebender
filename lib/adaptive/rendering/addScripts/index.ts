import collectScriptElements from "../../utilities/collectScriptElements/index.ts"
import buildDomTree from "../buildDomTree/index.ts"

const addScripts = (component) => {
	const head = document && document.head

	if (head) {
		const scripts = collectScriptElements(component)

		scripts.forEach((script) => buildDomTree(head)(script)())
	}
}

export default addScripts
