import collectLinkElements from "../helpers/collectLinkElements/index.ts"
import buildDomTree from "../buildDomTree/index.ts"

const addStylesheets = (component: Record<string, unknown>) => {
	const head = document && document.head

	if (head) {
		const stylesheets = collectLinkElements(component)

		stylesheets.forEach((stylesheet: unknown) => buildDomTree(head)(stylesheet)())
	}
}

export default addStylesheets
