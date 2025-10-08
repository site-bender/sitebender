// [IO] This file performs side effects - file I/O and console output
//++ Arborist demo runner - parses example files and displays structured output
//++ Run with: deno task demo:arborist

import parseFile from "@sitebender/arborist/parseFile/index.ts"
import buildParsedFile from "@sitebender/arborist/buildParsedFile/index.ts"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold/index.ts"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold/index.ts"

const EXAMPLES_DIR = new URL("./examples/", import.meta.url).pathname

const exampleFiles = [
	`${EXAMPLES_DIR}add/index.ts`,
	`${EXAMPLES_DIR}multiply/index.ts`,
	`${EXAMPLES_DIR}filter/index.ts`,
	`${EXAMPLES_DIR}UserCard/index.tsx`,
	`${EXAMPLES_DIR}Button/index.tsx`,
	`${EXAMPLES_DIR}types/index.ts`,
	`${EXAMPLES_DIR}fetchUser/index.ts`,
]

console.log("═".repeat(80))
console.log("ARBORIST DEMO - TypeScript/JSX Parser")
console.log("═".repeat(80))
console.log()

let fileIndex = 0

while (fileIndex < exampleFiles.length) {
	const filePath = exampleFiles[fileIndex]

	console.log("─".repeat(80))
	console.log(`FILE: ${filePath}`)
	console.log("─".repeat(80))
	console.log()

	const result = await parseFile(filePath)

	foldResult(
		function handleParseError(error) {
			console.log("❌ PARSE ERROR")
			console.log(`Kind: ${error.kind}`)
			console.log(`Message: ${error.message}`)

			if (error.suggestion) {
				console.log(`Suggestion: ${error.suggestion}`)
			}

			return null
		},
	)(function handleParsedAst(ast) {
		const validation = buildParsedFile(ast)(filePath)

		return foldValidation(
			function handleExtractionErrors(errors) {
				console.log("⚠️  EXTRACTION ERRORS")

				let errorIndex = 0

				while (errorIndex < errors.length) {
					const err = errors[errorIndex]
					console.log(`  - ${err.message}`)
					errorIndex = errorIndex + 1
				}

				return null
			},
		)(function handleParsedFile(parsed) {
			console.log("✓ FUNCTIONS")

			if (parsed.functions.length === 0) {
				console.log("  (none)")
			} else {
				let funcIndex = 0

				while (funcIndex < parsed.functions.length) {
					const func = parsed.functions[funcIndex]
					console.log(`  - ${func.name} (line ${func.position.line})`)
					console.log(`    Parameters: ${func.parameters.length}`)
					console.log(`    Return type: ${func.returnType}`)
					console.log(`    Async: ${func.modifiers.isAsync}`)
					console.log(`    Exported: ${func.modifiers.isExported}`)
					funcIndex = funcIndex + 1
				}
			}

			console.log()
			console.log("✓ COMMENTS")

			if (parsed.comments.length === 0) {
				console.log("  (none)")
			} else {
				let commentIndex = 0

				while (commentIndex < parsed.comments.length) {
					const comment = parsed.comments[commentIndex]
					const marker = comment.envoyMarker
						? ` [${comment.envoyMarker.marker}]`
						: ""
					console.log(`  - Line ${comment.position.line}: ${comment.text.substring(0, 60)}${marker}`)
					commentIndex = commentIndex + 1
				}
			}

			console.log()
			console.log("✓ IMPORTS")

			if (parsed.imports.length === 0) {
				console.log("  (none)")
			} else {
				let importIndex = 0

				while (importIndex < parsed.imports.length) {
					const imp = parsed.imports[importIndex]
					console.log(`  - ${imp.kind}: ${imp.specifier}`)
					importIndex = importIndex + 1
				}
			}

			console.log()
			console.log("✓ EXPORTS")

			if (parsed.exports.length === 0) {
				console.log("  (none)")
			} else {
				let exportIndex = 0

				while (exportIndex < parsed.exports.length) {
					const exp = parsed.exports[exportIndex]
					console.log(`  - ${exp.kind}: ${exp.name}`)
					exportIndex = exportIndex + 1
				}
			}

			console.log()
			console.log("✓ TYPES")

			if (parsed.types.length === 0) {
				console.log("  (none)")
			} else {
				let typeIndex = 0

				while (typeIndex < parsed.types.length) {
					const type = parsed.types[typeIndex]
					console.log(`  - ${type.name} (exported: ${type.isExported})`)
					typeIndex = typeIndex + 1
				}
			}

			console.log()
			console.log("✓ VIOLATIONS")

			const violations = parsed.violations

			if (!violations.hasArrowFunctions && !violations.hasClasses &&
				!violations.hasThrowStatements && !violations.hasTryCatch &&
				!violations.hasLoops && !violations.hasMutations) {
				console.log("  ✓ No constitutional violations detected")
			} else {
				if (violations.hasArrowFunctions) {
					console.log(`  ❌ Arrow functions: ${violations.arrowFunctions.length}`)
				}
				if (violations.hasClasses) {
					console.log(`  ❌ Classes: ${violations.classes.length}`)
				}
				if (violations.hasThrowStatements) {
					console.log(`  ❌ Throw statements: ${violations.throwStatements.length}`)
				}
				if (violations.hasTryCatch) {
					console.log(`  ❌ Try-catch blocks: ${violations.tryCatchBlocks.length}`)
				}
				if (violations.hasLoops) {
					console.log(`  ❌ Loops: ${violations.loops.length}`)
				}
				if (violations.hasMutations) {
					console.log(`  ❌ Mutations: ${violations.mutations.length}`)
				}
			}

			return parsed
		})(validation)
	})(result)

	console.log()
	fileIndex = fileIndex + 1
}

console.log("═".repeat(80))
console.log("DEMO COMPLETE")
console.log("═".repeat(80))
