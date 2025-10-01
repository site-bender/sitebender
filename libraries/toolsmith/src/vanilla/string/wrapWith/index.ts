//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const wrapWith = (
	prefix: string | null | undefined,
) =>
(
	suffix: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	const safePrefix = prefix ?? ""
	const safeSuffix = suffix ?? ""
	const safeStr = str ?? ""

	return safePrefix + safeStr + safeSuffix
}

export default wrapWith
