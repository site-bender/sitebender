//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function collectScriptElements<T extends { tagName: string }>(
	elements: Array<T>,
): Array<T> {
	return elements.filter((el) => el?.tagName === "SCRIPT")
}
