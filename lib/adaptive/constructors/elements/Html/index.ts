import type { HtmlAttributes } from "../../../constructors/elements/types/attributes/index.ts"
import type {
	ElementAttributes,
	ElementConfig,
} from "../../../constructors/elements/types/index.ts"

import Filtered from "../../../constructors/abstracted/Filtered/index.ts"
import filterAttribute from "../../../guards/filterAttribute/index.ts"
import isString from "../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../guards/pickGlobalAttributes/index.ts"

export const filterAttributes = (
	attributes: HtmlAttributes,
) => {
	const { manifest, xmlns, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...globals,
		...filterAttribute(isString)("manifest")(manifest),
		...filterAttribute(isString)("xmlns")(xmlns),
	}
}

/**
 * Creates an Html element configuration object
 *
 * The html element represents the root of an HTML document.
 * It can contain metadata and flow content.
 *
 * @example
 * ```typescript
 * const html = Html({
 *   id: "root",
 *   lang: "en",
 *   manifest: "/app.manifest",
 *   xmlns: "http://www.w3.org/1999/xhtml",
 *   calculation: { ... },
 *   scripts: ["app.js"]
 * })([
 *   Head()([Title()("Page Title")]),
 *   Body()([H1()("Welcome")])
 * ])
 * ```
 */
export const Html: (
	attributes: ElementAttributes<HtmlAttributes>,
) => (children: Array<unknown>) => ElementConfig<HtmlAttributes> = Filtered<
	HtmlAttributes
>(
	"Html",
)(
	filterAttributes,
)

export default Html
