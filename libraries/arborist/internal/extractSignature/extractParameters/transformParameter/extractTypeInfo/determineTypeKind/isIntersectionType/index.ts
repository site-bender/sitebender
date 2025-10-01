import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a type node is an intersection type
export default function isIntersectionType(
	typeNode: typescript.TypeNode,
): boolean {
	return typescript.isIntersectionTypeNode(typeNode)
}
