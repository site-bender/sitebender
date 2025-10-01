//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toMap = <T extends Record<string, unknown>>(
	obj: T,
): Map<string, T[keyof T]> => {
	return new Map(Object.entries(obj)) as Map<string, T[keyof T]>
}

export default toMap
