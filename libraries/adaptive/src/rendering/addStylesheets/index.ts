import collectLinkElements from "../helpers/collectLinkElements/index.ts"
import buildDomTree, { type ElementConfig } from "../buildDomTree/index.ts"

const addStylesheets = (component: Record<string, unknown>) => {
	const head = document && document.head

	if (head) {
		const stylesheets = collectLinkElements(component)

		const toLinkElement = (href: string): ElementConfig => ({
			tag: "LINK",
			attributes: { rel: "stylesheet", href },
		})

		stylesheets.forEach((href) => buildDomTree(head)(toLinkElement(String(href)))())
	}
}

export default addStylesheets
