/**
 * Filters an array to return only SCRIPT elements
 * 
 * @param elements - Array of HTML elements to filter
 * @returns Array containing only SCRIPT elements
 * @example
 * ```typescript
 * const scripts = collectScriptElements(document.querySelectorAll('*'))
 * ```
 */
export default function collectScriptElements<T extends { tagName: string }>(
	elements: Array<T>,
): Array<T> {
	return elements.filter((el) => el?.tagName === "SCRIPT")
}
