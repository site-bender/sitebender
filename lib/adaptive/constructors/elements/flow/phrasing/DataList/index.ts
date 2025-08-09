import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Child filter that validates DataList content (phrasing content + Option elements)
 */
const dataListContentFilter = (child: any): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// Allow Option elements
	if (child.tag === "Option") {
		return true
	}

	// For other element configs, check if they're valid phrasing content
	return isPhrasingContent()(child)
}

/**
 * Creates a DataList element configuration object
 *
 * The datalist element represents a set of option elements that represent
 * predefined options for other controls.
 *
 * @example
 * ```typescript
 * const datalist = DataList({
 *   id: "browsers"
 * })([
 *   Option({ value: "Chrome" })("Chrome"),
 *   Option({ value: "Firefox" })("Firefox"),
 *   Option({ value: "Safari" })("Safari")
 * ])
 * ```
 */
export const DataList = GlobalOnly("DataList")(dataListContentFilter)

export default DataList
