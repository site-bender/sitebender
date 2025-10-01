import * as typescript from "npm:typescript@5.7.2"

import type { Parameter } from "../../../types/index.ts"

import extractTypeInfo from "./extractTypeInfo/index.ts"

//++ Transforms a TypeScript parameter node to Parameter type
export default function transformParameter(
	sourceFile: typescript.SourceFile,
) {
	return function (param: typescript.ParameterDeclaration): Parameter {
		const name = typescript.isIdentifier(param.name)
			? param.name.getText(sourceFile)
			: "unknown"

		const type = extractTypeInfo(param.type, sourceFile)
		const isOptional = param.questionToken !== undefined
		const isRest = param.dotDotDotToken !== undefined
		const defaultValue = param.initializer?.getText(sourceFile)

		return {
			name,
			type,
			isOptional,
			isRest,
			defaultValue,
		}
	}
}
