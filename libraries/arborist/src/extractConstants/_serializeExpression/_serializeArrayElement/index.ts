import _serializeExpression from "../index.ts"

export default function _serializeArrayElement(elem: unknown): string {
	if (!elem) {
		return ""
	}
	const elemObj = elem as Record<string, unknown>
	// Handle ExpressionStatement wrapper
	if (elemObj.expression) {
		return _serializeExpression(elemObj.expression) ?? ""
	}
	return _serializeExpression(elemObj) ?? ""
}
