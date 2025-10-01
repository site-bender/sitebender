import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a type node is a union type
export default function isUnionType(
	typeNode: typescript.TypeNode,
): boolean {
	return typescript.isUnionTypeNode(typeNode)
}
