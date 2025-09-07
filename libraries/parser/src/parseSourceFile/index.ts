//++ Parses a TypeScript source file into an AST representation
import * as typescript from "npm:typescript@5.7.2"
import type { ParseError, Result } from "../types/index.ts"
import type { ParseOptions } from "./types/index.ts"
import mapTarget from "./mapTarget/index.ts"
import mapModule from "./mapModule/index.ts"

export default function parseSourceFile(filePath: string) {
	return function (
		options?: ParseOptions,
	): Result<typescript.SourceFile, ParseError> {
		try {
			// Find tsconfig if it exists
			const configPath = typescript.findConfigFile(
				filePath,
				typescript.sys.fileExists,
				"tsconfig.json",
			)

			// Read config or use defaults
			const config = configPath
				? typescript.readConfigFile(configPath, typescript.sys.readFile)
				: { config: {} }

			// Parse config options
			const compilerOptions = typescript.parseJsonConfigFileContent(
				config.config,
				typescript.sys,
				"./",
			).options

			// Merge with provided options
			const finalOptions: typescript.CompilerOptions = {
				...compilerOptions,
				target: mapTarget(options?.target),
				module: mapModule(options?.module),
				strict: options?.strict ?? true,
				skipLibCheck: true,
				skipDefaultLibCheck: true,
			}

			// Create program with single file
			const program = typescript.createProgram([filePath], finalOptions)

			// Get the source file
			const sourceFile = program.getSourceFile(filePath)

			if (!sourceFile) {
				return {
					ok: false,
					error: {
						type: "FileNotFound",
						message: `Could not read file: ${filePath}`,
						file: filePath,
					},
				}
			}

			// Check for syntax errors if not skipping
			if (!options?.skipTypeChecking) {
				const diagnostics = typescript.getPreEmitDiagnostics(
					program,
					sourceFile,
				)

				if (diagnostics.length > 0) {
					const firstError = diagnostics[0]
					const message = typescript.flattenDiagnosticMessageText(
						firstError.messageText,
						"\n",
					)

					const position = firstError.file && firstError.start
						? firstError.file.getLineAndCharacterOfPosition(
							firstError.start,
						)
						: undefined

					return {
						ok: false,
						error: {
							type: "SyntaxError",
							message,
							file: filePath,
							line: position ? position.line + 1 : undefined,
							column: position
								? position.character + 1
								: undefined,
						},
					}
				}
			}

			return {
				ok: true,
				value: sourceFile,
			}
		} catch (error) {
			return {
				ok: false,
				error: {
					type: "ParseError",
					message: error instanceof Error
						? error.message
						: "Unknown error parsing file",
					file: filePath,
				},
			}
		}
	}
}

//?? parseSourceFile("./src/add.ts")() // Returns: Result<SourceFile, ParseError>
//?? parseSourceFile("./src/map.ts")({ skipTypeChecking: true }) // Fast parse without type checking
//?? parseSourceFile("./lib.ts")({ target: "ES2020", module: "CommonJS" }) // Custom compiler options
