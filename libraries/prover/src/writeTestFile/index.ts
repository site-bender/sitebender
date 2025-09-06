import type { TestCase, FunctionSignature } from "../types/index.ts"
import getTestFilePath from "./getTestFilePath/index.ts"
import generateImports from "./generateImports/index.ts"
import generateTestContent from "./generateTestContent/index.ts"
import generateFileHeader from "./generateFileHeader/index.ts"
import formatCode from "./formatCode/index.ts"
import ensureDirectoryExists from "./ensureDirectoryExists/index.ts"

/**
 * Writes test cases to a test file
 * @param functionPath Path to the function being tested
 * @param functionName Name of the function
 * @param tests Array of test cases
 * @param signature Optional function signature information
 * @returns Path to the written test file
 */
export default async function writeTestFile(
	functionPath: string,
	functionName: string,
	tests: Array<TestCase>,
	signature?: FunctionSignature
): Promise<string> {
	const testFilePath = getTestFilePath(functionPath)
	const imports = generateImports(functionPath, functionName, tests, signature)
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