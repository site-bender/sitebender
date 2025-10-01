import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a modifier is a default keyword
export default function isDefaultKeyword(
	modifier: typescript.ModifierLike,
): boolean {
	return modifier.kind === typescript.SyntaxKind.DefaultKeyword
}
