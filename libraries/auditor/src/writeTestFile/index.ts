import type { FunctionSignature, TestCase } from "../types/index.ts"

import ensureDirectoryExists from "./ensureDirectoryExists/index.ts"
import formatCode from "./formatCode/index.ts"
import generateFileHeader from "./generateFileHeader/index.ts"
import generateImports from "./generateImports/index.ts"
import generateTestContent from "./generateTestContent/index.ts"
import getTestFilePath from "./getTestFilePath/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default async function writeTestFile(
	functionPath: string,
	functionName: string,
	tests: Array<TestCase>,
	signature?: FunctionSignature,
): Promise<string> {
	const testFilePath = getTestFilePath(functionPath)
	const imports = generateImports(
		functionPath,
		functionName,
		tests,
		signature,
	)
	const testContent = generateTestContent(functionName, tests, signature)

	const metadata = {
		sourceFile: functionPath,
		testFile: testFilePath,
		generatedAt: new Date().toISOString(),
		generator: "@sitebender/test-generator",
		version: "1.0.0",
	}

	const fileContent = [
		generateFileHeader(metadata),
		imports,
		"",
		testContent,
	].join("\n")

	const formattedContent = await formatCode(fileContent)

	await ensureDirectoryExists(testFilePath)
	await Deno.writeTextFile(testFilePath, formattedContent)

	return testFilePath
}
