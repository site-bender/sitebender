import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a type node is an array type
export default function isArrayType(
	typeNode: typescript.TypeNode,
): boolean {
	return typescript.isArrayTypeNode(typeNode)
}
