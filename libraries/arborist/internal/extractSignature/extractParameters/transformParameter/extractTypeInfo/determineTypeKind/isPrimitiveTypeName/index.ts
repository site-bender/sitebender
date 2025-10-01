//++ Checks if a type name string represents a primitive type
export default function isPrimitiveTypeName(
	typeName: string,
): boolean {
	return typeName === "string" ||
		typeName === "number" ||
		typeName === "boolean" ||
		typeName === "symbol" ||
		typeName === "bigint"
}
