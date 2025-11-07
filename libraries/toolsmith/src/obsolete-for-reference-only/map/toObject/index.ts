//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toObject = <V>(map: Map<unknown, V>): Record<string, V> =>
	Array.from(map)
		.filter(([key]) => typeof key !== "symbol")
		.reduce(
			(acc, [key, value]) => ({ ...acc, [String(key)]: value }),
			{} as Record<string, V>,
		)

export default toObject
