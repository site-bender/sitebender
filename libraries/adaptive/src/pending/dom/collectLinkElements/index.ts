/**
 * Filters an array to return only LINK elements
 * 
 * @param elements - Array of HTML elements to filter
 * @returns Array containing only LINK elements
 * @example
 * ```typescript
 * const links = collectLinkElements(document.querySelectorAll('*'))
 * ```
 */
export default function collectLinkElements<T extends { tagName: string }>(
	elements: Array<T>,
): Array<T> {
	return elements.filter((el) => el?.tagName === "LINK")
}
