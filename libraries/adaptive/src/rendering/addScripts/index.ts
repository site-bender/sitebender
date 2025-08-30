import collectScriptElements from "../helpers/collectScriptElements/index.ts"
import buildDomTree from "../buildDomTree/index.ts"

const addScripts = (component: Record<string, unknown>) => {
	const head = document && document.head

	if (head) {
		const scripts = collectScriptElements(component)

		scripts.forEach((script: unknown) => buildDomTree(head)(script)())
	}
}

export default addScripts
