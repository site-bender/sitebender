import isDefined from "../../../../utilities/isDefined/index.ts"

/**
 * Creates a Fragment element configuration object
 *
 * The Fragment element allows grouping of children without creating a wrapper element.
 * It can optionally include scripts and stylesheets.
 *
 * @example
 * ```typescript
 * const fragment = Fragment({
 *   scripts: ["script1.js"],
 *   stylesheets: ["style1.css"]
 * })([
 *   H1()("Title"),
 *   P()("Content")
 * ])
 * ```
 */
export const Fragment =
	(attributes: Record<string, unknown> = {}) => (children: unknown[] = []) => {
		const { scripts, stylesheets } = attributes
		const kids = Array.isArray(children) ? children : [children]

		return {
			children: kids,
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			tag: "Fragment",
		}
	}

export default Fragment
