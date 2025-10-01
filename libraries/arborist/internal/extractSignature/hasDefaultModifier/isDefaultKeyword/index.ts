//++ Checks if a modifier is the default keyword
import * as typescript from "npm:typescript@5.7.2"

export default function isDefaultKeyword(
	modifier: typescript.ModifierLike,
): boolean {
	return modifier.kind === typescript.SyntaxKind.DefaultKeyword
}
