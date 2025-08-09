import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Child filter for Table element - allows table-specific elements
 */
const isValidTableChild = (child: any): boolean => {
	if (!child || typeof child !== "object" || !child.tag) {
		return false
	}
	return [
		"Caption",
		"ColGroup",
		"THead",
		"TBody",
		"TFoot",
		"Tr",
		"Script",
		"Template",
	].includes(child.tag)
}

/**
 * Creates a Table element configuration object
 *
 * The table element represents tabular data in rows and columns.
 * It can contain caption, colgroup, thead, tbody, tfoot, tr, script, and template elements.
 *
 * @example
 * ```typescript
 * const table = Table({ id: "data-table", class: "table" })([
 *   Caption()("Sales Data"),
 *   THead()([
 *     Tr()([
 *       Th()("Month"),
 *       Th()("Sales")
 *     ])
 *   ]),
 *   TBody()([
 *     Tr()([
 *       Td()("January"),
 *       Td()("$1000")
 *     ])
 *   ])
 * ])
 * ```
 */
export const Table = GlobalOnly("Table")(isValidTableChild)

export default Table
