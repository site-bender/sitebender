//++ Transforms a TypeParameterDeclaration to a Generic object
import * as typescript from "npm:typescript@5.7.2"

import type { Generic } from "../../../types/index.ts"

export default function transformGeneric(
	sourceFile: typescript.SourceFile,
): (param: typescript.TypeParameterDeclaration) => Generic {
	return function (param: typescript.TypeParameterDeclaration): Generic {
		// Get the base name
		const name = param.name.getText(sourceFile)

		// Build the Generic object with all properties
		return {
			name,
			...(param.constraint &&
				{ constraint: param.constraint.getText(sourceFile) }),
			...(param.default && { default: param.default.getText(sourceFile) }),
		}
	}
}

//?? [EXAMPLE] const transform = transformGeneric(sourceFile)
//?? [EXAMPLE] transform(typeParam) // "T"
//?? [EXAMPLE] transform(typeParam) // "K extends keyof T"
