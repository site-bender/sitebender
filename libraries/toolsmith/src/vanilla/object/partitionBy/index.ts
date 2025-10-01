//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const partitionBy = <K extends string, V>(
	predicate: (entry: [K, V]) => boolean,
) =>
(
	obj: Record<K, V>,
): [Record<K, V>, Record<K, V>] => {
	return (Object.entries(obj) as Array<[K, V]>).reduce(
		([matching, nonMatching], [key, value]) =>
			predicate([key, value])
				? [{ ...matching, [key]: value }, nonMatching]
				: [matching, { ...nonMatching, [key]: value }],
		[{} as Record<K, V>, {} as Record<K, V>],
	)
}

export default partitionBy
