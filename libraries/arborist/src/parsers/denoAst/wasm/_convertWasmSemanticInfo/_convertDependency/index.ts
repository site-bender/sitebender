export default function _convertDependency(
	[k, v]: [string, unknown],
): [string, readonly string[]] {
	return [k, v as readonly string[]]
}
