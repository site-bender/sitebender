import type { TestCase, TestSuite, TestFileMetadata, PropertyTest } from "../types/index.ts"

export class TestFileWriter {
	async write(
		functionPath: string,
		functionName: string,
		tests: Array<TestCase>,
		isCurried?: boolean
	): Promise<string> {
		const testFilePath = this.getTestFilePath(functionPath)
		const imports = this.generateImports(functionPath, functionName, tests)
		const testContent = this.generateTestContent(functionName, tests, isCurried)
		const metadata = this.generateMetadata(functionPath, testFilePath)
		
		const fileContent = [
			this.generateFileHeader(metadata),
			imports,
			"",
			testContent,
		].join("\n")
		
		const formattedContent = await this.formatCode(fileContent)
		
		await this.ensureDirectoryExists(testFilePath)
		await Deno.writeTextFile(testFilePath, formattedContent)
		
		return testFilePath
	}
	
	private getTestFilePath(functionPath: string): string {
		const pathParts = functionPath.split("/")
		const libraryIndex = pathParts.indexOf("libraries")
		
		if (libraryIndex === -1) {
			throw new Error("Function path must be in libraries directory")
		}
		
		const libraryName = pathParts[libraryIndex + 1]
		const srcIndex = pathParts.indexOf("src")
		
		if (srcIndex === -1) {
			throw new Error("Function path must contain src directory")
		}
		
		const relativePath = pathParts.slice(srcIndex + 1, -1).join("/")
		const rootDir = pathParts.slice(0, libraryIndex).join("/") || "."
		
		return `${rootDir}/tests/libraries/${libraryName}/${relativePath}/index.test.ts`
	}
	
	private generateImports(
		functionPath: string,
		functionName: string,
		tests: Array<TestCase>
	): string {
		const imports: Array<string> = []
		
		const relativePath = this.getRelativeImportPath(functionPath)
		imports.push(`import ${functionName} from "${relativePath}"`)
		
		imports.push(`import { describe, it } from "https://deno.land/std@0.212.0/testing/bdd.ts"`)
		imports.push(`import { assertEquals, assertThrows } from "https://deno.land/std@0.212.0/assert/mod.ts"`)
		
		const hasPropertyTests = tests.some((test) => test.properties && test.properties.length > 0)
		if (hasPropertyTests) {
			imports.push(`import * as fc from "npm:fast-check@3.15.0"`)
		}
		
		return imports.join("\n")
	}
	
	private getRelativeImportPath(functionPath: string): string {
		const pathParts = functionPath.split("/")
		const libraryIndex = pathParts.indexOf("libraries")
		const srcIndex = pathParts.indexOf("src")
		
		if (srcIndex === -1 || libraryIndex === -1) {
			throw new Error("Invalid function path")
		}
		
		// Calculate from test file location to source file
		// test is at: tests/libraries/{library}/path/to/function/index.test.ts
		// source is at: libraries/{library}/src/path/to/function/index.ts
		
		const functionDepth = pathParts.slice(srcIndex + 1, -1).length
		// Go up from test file location
		const upFromTest = functionDepth + 3 // +3 for tests/libraries/{library}
		const upDirs = Array(upFromTest).fill("..").join("/")
		
		// Build path to source from root
		const sourcePath = pathParts.slice(libraryIndex).join("/").replace(".ts", "")
		
		return `${upDirs}/${sourcePath}`
	}
	
	private generateTestContent(functionName: string, tests: Array<TestCase>, isCurried?: boolean): string {
		const testGroups = this.groupTests(tests)
		const sections: Array<string> = []
		
		sections.push(`describe("${functionName}", () => {`)
		
		if (testGroups.unit.length > 0) {
			sections.push(this.generateUnitTests(testGroups.unit, functionName, isCurried))
		}
		
		if (testGroups.property.length > 0) {
			sections.push(this.generatePropertyTests(functionName, testGroups.property))
		}
		
		if (testGroups.edge.length > 0) {
			sections.push(this.generateEdgeCaseTests(testGroups.edge, functionName, isCurried))
		}
		
		if (testGroups.error.length > 0) {
			sections.push(this.generateErrorTests(testGroups.error, functionName, isCurried))
		}
		
		sections.push("})")
		
		return sections.join("\n\n")
	}
	
	private groupTests(tests: Array<TestCase>): {
		unit: Array<TestCase>
		property: Array<TestCase>
		edge: Array<TestCase>
		error: Array<TestCase>
	} {
		const groups = {
			unit: [] as Array<TestCase>,
			property: [] as Array<TestCase>,
			edge: [] as Array<TestCase>,
			error: [] as Array<TestCase>,
		}
		
		for (const test of tests) {
			if (test.properties && test.properties.length > 0) {
				groups.property.push(test)
			} else if (test.expectedError) {
				groups.error.push(test)
			} else if (this.isEdgeCase(test)) {
				groups.edge.push(test)
			} else {
				groups.unit.push(test)
			}
		}
		
		return groups
	}
	
	private isEdgeCase(test: TestCase): boolean {
		const edgeCaseKeywords = [
			"empty",
			"null",
			"undefined",
			"zero",
			"negative",
			"maximum",
			"minimum",
			"boundary",
			"edge",
		]
		
		const name = test.name.toLowerCase()
		const description = test.description.toLowerCase()
		
		return edgeCaseKeywords.some(
			(keyword) => name.includes(keyword) || description.includes(keyword)
		)
	}
	
	private generateUnitTests(tests: Array<TestCase>, functionName: string, isCurried?: boolean): string {
		const lines: Array<string> = []
		
		lines.push("\tdescribe(\"unit tests\", () => {")
		
		for (const test of tests) {
			const testName = this.escapeTestName(test.name)
			lines.push(`\t\tit("${testName}", () => {`)
			
			const inputStr = test.input.map((v) => this.valueToString(v)).join(", ")
			const expectedStr = this.valueToString(test.expectedOutput)
			
			if (isCurried && test.input.length === 1) {
				// For curried functions with single input, call with dummy second value
				lines.push(`\t\t\tconst result = ${functionName}(${inputStr})(1)`)
			} else {
				lines.push(`\t\t\tconst result = ${functionName}(${inputStr})`)
			}
			lines.push(`\t\t\tassertEquals(result, ${expectedStr})`)
			lines.push("\t\t})")
		}
		
		lines.push("\t})")
		
		return lines.join("\n")
	}
	
	private generatePropertyTests(functionName: string, tests: Array<TestCase>): string {
		const lines: Array<string> = []
		
		lines.push("\tdescribe(\"property tests\", () => {")
		
		for (const test of tests) {
			if (!test.properties) continue
			
			for (const property of test.properties) {
				lines.push(`\t\tit("${property.name}", () => {`)
				lines.push("\t\t\tfc.assert(")
				lines.push(`\t\t\t\tfc.property(${property.generator}, (input) => {`)
				lines.push(`\t\t\t\t\t${property.property}`)
				lines.push("\t\t\t\t})")
				
				if (property.runs) {
					lines.push(`\t\t\t\t{ numRuns: ${property.runs} }`)
				}
				
				lines.push("\t\t\t)")
				lines.push("\t\t})")
			}
		}
		
		lines.push("\t})")
		
		return lines.join("\n")
	}
	
	private generateEdgeCaseTests(tests: Array<TestCase>, functionName: string): string {
		const lines: Array<string> = []
		
		lines.push("\tdescribe(\"edge cases\", () => {")
		
		for (const test of tests) {
			const testName = this.escapeTestName(test.name)
			lines.push(`\t\tit("${testName}", () => {`)
			
			const inputStr = test.input.map((v) => this.valueToString(v)).join(", ")
			const expectedStr = this.valueToString(test.expectedOutput)
			
			lines.push(`\t\t\tconst result = ${functionName}(${inputStr})`)
			lines.push(`\t\t\tassertEquals(result, ${expectedStr})`)
			lines.push("\t\t})")
		}
		
		lines.push("\t})")
		
		return lines.join("\n")
	}
	
	private generateErrorTests(tests: Array<TestCase>, functionName: string): string {
		const lines: Array<string> = []
		
		lines.push("\tdescribe(\"error cases\", () => {")
		
		for (const test of tests) {
			const testName = this.escapeTestName(test.name)
			lines.push(`\t\tit("${testName}", () => {`)
			
			const inputStr = test.input.map((v) => this.valueToString(v)).join(", ")
			
			lines.push("\t\t\tassertThrows(")
			lines.push(`\t\t\t\t() => ${functionName}(${inputStr}),`)
			
			if (test.expectedError) {
				lines.push(`\t\t\t\tError,`)
				lines.push(`\t\t\t\t"${test.expectedError}"`)
			} else {
				lines.push("\t\t\t\tError")
			}
			
			lines.push("\t\t\t)")
			lines.push("\t\t})")
		}
		
		lines.push("\t})")
		
		return lines.join("\n")
	}
	
	private valueToString(value: unknown): string {
		if (value === null) return "null"
		if (value === undefined) return "undefined"
		if (typeof value === "string") return `"${value}"`
		if (typeof value === "number") return String(value)
		if (typeof value === "boolean") return String(value)
		if (Array.isArray(value)) {
			return `[${value.map((v) => this.valueToString(v)).join(", ")}]`
		}
		if (typeof value === "object") {
			const entries = Object.entries(value).map(
				([k, v]) => `${k}: ${this.valueToString(v)}`
			)
			return `{ ${entries.join(", ")} }`
		}
		return String(value)
	}
	
	private generateFileHeader(metadata: TestFileMetadata): string {
		const lines: Array<string> = []
		
		lines.push("/**")
		lines.push(` * Auto-generated test file`)
		lines.push(` * Source: ${metadata.sourceFile}`)
		lines.push(` * Generated: ${metadata.generatedAt}`)
		lines.push(` * Generator: ${metadata.generator} v${metadata.version}`)
		lines.push(" * ")
		lines.push(" * DO NOT EDIT MANUALLY")
		lines.push(" * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts")
		lines.push(" */")
		
		return lines.join("\n")
	}
	
	private generateMetadata(sourceFile: string, testFile: string): TestFileMetadata {
		return {
			sourceFile,
			testFile,
			generatedAt: new Date().toISOString(),
			generator: "@sitebender/test-generator",
			version: "1.0.0",
		}
	}
	
	private async formatCode(code: string): Promise<string> {
		try {
			const command = new Deno.Command("deno", {
				args: ["fmt", "-"],
				stdin: "piped",
				stdout: "piped",
				stderr: "piped",
			})
			
			const process = command.spawn()
			const writer = process.stdin.getWriter()
			await writer.write(new TextEncoder().encode(code))
			await writer.close()
			
			const output = await process.output()
			
			if (output.success) {
				return new TextDecoder().decode(output.stdout)
			}
		} catch {
			// Formatting failed, return unformatted code
		}
		
		return code
	}
	
	private escapeTestName(name: string): string {
		return name.replace(/"/g, '\\"').replace(/\n/g, '\\n')
	}
	
	private async ensureDirectoryExists(filePath: string): Promise<void> {
		const dir = filePath.substring(0, filePath.lastIndexOf("/"))
		await Deno.mkdir(dir, { recursive: true })
	}
}