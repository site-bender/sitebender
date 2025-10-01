import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a type node is a literal type
export default function isLiteralType(
	typeNode: typescript.TypeNode,
): boolean {
	return typescript.isLiteralTypeNode(typeNode)
}
