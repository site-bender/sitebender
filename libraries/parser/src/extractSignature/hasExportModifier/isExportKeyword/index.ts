//++ Checks if a modifier is the export keyword
import * as typescript from "npm:typescript@5.7.2"

export default function isExportKeyword(
	modifier: typescript.ModifierLike,
): boolean {
	return modifier.kind === typescript.SyntaxKind.ExportKeyword
}

//?? [EXAMPLE] isExportKeyword(exportModifier) // true
//?? [EXAMPLE] isExportKeyword(publicModifier) // false
