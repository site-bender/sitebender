/**
 * Converts ARIA attributes object to HTML aria-* attributes
 *
 * @param aria - ARIA attributes object
 * @returns Object with aria-* prefixed attributes
 */
export const getAriaAttributes = (
	aria: Record<string, unknown> | undefined,
): Record<string, unknown> => {
	if (!aria || typeof aria !== "object") {
		return {}
	}

	return Object.entries(aria).reduce(
		(out, [key, value]) => ({
			...out,
			[`aria-${key}`]: value,
		}),
		{},
	)
}

export default getAriaAttributes
