import type { ElementConfig } from "../../../../../types/index.ts"

import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Child filter for Dl element - allows dt, dd, script, and template elements
 */
const isValidDlChild = (child: ElementConfig): boolean => {
	if (!child || typeof child !== "object" || !child.tag) {
		return false
	}
	return ["Dt", "Dd", "Script", "Template"].includes(child.tag)
}

/**
 * Creates a Dl element configuration object
 *
 * The dl element represents a description list of name-value groups.
 * It can only contain dt, dd, script, and template elements.
 *
 * @example
 * ```typescript
 * const dl = Dl({ id: "definitions", class: "definition-list" })([
 *   Dt()("HTML"),
 *   Dd()("HyperText Markup Language"),
 *   Dt()("CSS"),
 *   Dd()("Cascading Style Sheets")
 * ])
 * ```
 */
const Dl = GlobalOnly("Dl")(isValidDlChild)

export default Dl
