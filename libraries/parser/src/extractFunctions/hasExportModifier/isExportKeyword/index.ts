import * as typescript from "npm:typescript@5.7.2"

//++ Checks if a modifier is an export keyword
export default function isExportKeyword(modifier: typescript.ModifierLike): boolean {
	return modifier.kind === typescript.SyntaxKind.ExportKeyword
}

//?? [EXAMPLE] isExportKeyword(exportModifier) // true
//?? [EXAMPLE] isExportKeyword(asyncModifier) // false
//?? [PRO] Works with any ModifierLike node type