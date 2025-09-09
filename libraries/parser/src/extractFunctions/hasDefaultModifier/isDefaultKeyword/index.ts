import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a modifier is a default keyword
export default function isDefaultKeyword(modifier: typescript.ModifierLike): boolean {
	return modifier.kind === typescript.SyntaxKind.DefaultKeyword
}

//?? [EXAMPLE] isDefaultKeyword(defaultModifier) // true
//?? [EXAMPLE] isDefaultKeyword(exportModifier) // false
//?? [PRO] Works with any ModifierLike node type