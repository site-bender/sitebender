import * as ts from "npm:typescript@5.7.2"

import type { FunctionSignature } from "../types/index.ts"

import extractFunctionFromSource from "./extractFunctionFromSource/index.ts"
import extractImports from "./extractImports/index.ts"
import extractSignatureFromNode from "./extractSignatureFromNode/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parseSignature(
	filePath: string,
): FunctionSignature | null {
	const configPath = ts.findConfigFile(
		filePath,
		ts.sys.fileExists,
		"tsconfig.json",
	)

	const config = configPath
		? ts.readConfigFile(configPath, ts.sys.readFile)
		: { config: {} }

	const compilerOptions = ts.parseJsonConfigFileContent(
		config.config,
		ts.sys,
		"./",
	).options

	const program = ts.createProgram([filePath], {
		...compilerOptions,
		target: ts.ScriptTarget.Latest,
		module: ts.ModuleKind.ESNext,
	})

	const checker = program.getTypeChecker()
	const sourceFile = program.getSourceFile(filePath)

	if (!sourceFile) {
		throw new Error(`Could not parse file: ${filePath}`)
	}

	const functionNode = extractFunctionFromSource(sourceFile, checker)

	if (!functionNode) {
		return null
	}

	// Extract imports from the source file
	const imports = extractImports(sourceFile)

	const signature = extractSignatureFromNode(functionNode, filePath, checker)

	// Add imports to signature
	return {
		...signature,
		imports,
	}
}
