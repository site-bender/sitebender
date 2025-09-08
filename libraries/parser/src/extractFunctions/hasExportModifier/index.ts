//++ Checks if a function declaration has an export modifier
import * as typescript from "npm:typescript@5.7.2"

export default function hasExportModifier(
	node: typescript.FunctionDeclaration,
): boolean {
	if (!node.modifiers) return false

	let index = 0
	const length = node.modifiers.length

	while (index < length) {
		const modifier = node.modifiers[index]
		if (modifier.kind === typescript.SyntaxKind.ExportKeyword) {
			return true
		}
		index = index + 1
	}

	return false
}
