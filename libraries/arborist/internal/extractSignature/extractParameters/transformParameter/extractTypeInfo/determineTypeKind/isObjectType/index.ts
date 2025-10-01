import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a type node is an object type literal
export default function isObjectType(
	typeNode: typescript.TypeNode,
): boolean {
	return typescript.isTypeLiteralNode(typeNode)
}
