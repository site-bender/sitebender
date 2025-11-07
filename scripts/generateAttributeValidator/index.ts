import type { AttributeConfig, GeneratorResult } from "./types/index.ts"
import _generateCommentHeader from "./_generateCommentHeader/index.ts"
import _generateFunctionBody from "./_generateFunctionBody/index.ts"
import _generateImports from "./_generateImports/index.ts"
import _generateTestFile from "./_generateTestFile/index.ts"

/*++
 + Generates attribute validator function and test files
 + Creates directory structure following constitutional rules
 + Returns result with paths and success status
 + [IO] Creates files and directories
 */
export default async function generateAttributeValidator(
	config: Readonly<AttributeConfig>,
): Promise<GeneratorResult> {
	const functionName = `_validate${
		config.attributeName.charAt(0).toUpperCase()
	}${config.attributeName.slice(1)}`
	const targetDir =
		`/Users/guy/Workspace/@sitebender/architect-ai/libraries/architect/src/_html/_validateGlobalAttributes/${functionName}`

	try {
		await Deno.mkdir(targetDir, { recursive: true })

		const imports = _generateImports(config)
		const comments = _generateCommentHeader(config)
		const body = _generateFunctionBody(config)

		const validatorContent = [
			...imports,
			"",
			...comments,
			...body,
		].join("\n") + "\n"

		const validatorPath = `${targetDir}/index.ts`
		await Deno.writeTextFile(validatorPath, validatorContent)

		const testLines = _generateTestFile(config)
		const testContent = testLines.join("\n") + "\n"

		const testPath = `${targetDir}/index.test.ts`
		await Deno.writeTextFile(testPath, testContent)

		return {
			validatorPath,
			testPath,
			success: true,
			message: `Successfully generated ${functionName}`,
		}
	} catch (error) {
		return {
			validatorPath: "",
			testPath: "",
			success: false,
			message: `Failed to generate ${functionName}: ${error}`,
		}
	}
}
