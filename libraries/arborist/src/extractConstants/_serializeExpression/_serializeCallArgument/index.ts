import _serializeExpression from "../index.ts"

export default function _serializeCallArgument(arg: unknown): string {
	const argObj = arg as Record<string, unknown>
	if (argObj.expression) {
		return _serializeExpression(argObj.expression) ?? ""
	}
	return _serializeExpression(argObj) ?? ""
}
