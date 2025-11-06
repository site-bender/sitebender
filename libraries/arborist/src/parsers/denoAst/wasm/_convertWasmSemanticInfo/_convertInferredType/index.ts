export default function _convertInferredType(
	[k, v]: [string, unknown],
): [string, string] {
	return [k, String(v)]
}
