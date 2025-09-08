//++ Checks if a function declaration has a default modifier
import * as typescript from "npm:typescript@5.7.2"

export default function hasDefaultModifier(
	node: typescript.FunctionDeclaration,
): boolean {
	if (!node.modifiers) return false
	
	let index = 0
	const length = node.modifiers.length
	
	while (index < length) {
		const modifier = node.modifiers[index]
		if (modifier.kind === typescript.SyntaxKind.DefaultKeyword) {
			return true
		}
		index = index + 1
	}
	
	return false
}