import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Child filter for Menu element - allows li, script, and template elements
 */
const isValidMenuChild = (child: any): boolean => {
	if (!child || typeof child !== "object" || !child.tag) {
		return false
	}
	return ["Li", "Script", "Template"].includes(child.tag)
}

/**
 * Creates a Menu element configuration object
 *
 * The menu element represents a list of commands or options.
 * It can only contain li, script, and template elements.
 *
 * @example
 * ```typescript
 * const menu = Menu({ id: "context-menu", class: "menu" })([
 *   Li()([Button()("Copy")]),
 *   Li()([Button()("Paste")]),
 *   Li()([Button()("Delete")])
 * ])
 * ```
 */
export const Menu = GlobalOnly("Menu")(isValidMenuChild)

export default Menu
