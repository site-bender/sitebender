//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
