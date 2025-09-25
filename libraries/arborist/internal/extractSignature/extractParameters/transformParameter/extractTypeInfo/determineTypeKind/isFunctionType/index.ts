import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a type node is a function type
export default function isFunctionType(
	typeNode: typescript.TypeNode,
): boolean {
	return typescript.isFunctionTypeNode(typeNode)
}

//?? [EXAMPLE] isFunctionType(typeNode) // true for "(x: string) => number"
//?? [EXAMPLE] isFunctionType(typeNode) // false for "string"
