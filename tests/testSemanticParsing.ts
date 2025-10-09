// Test script for parseFileWithSemantics API
import parseFileWithSemantics from "../libraries/arborist/src/api/parseFileWithSemantics/index.ts"

async function testSemanticParsing() {
	try {
		console.log("Testing parseFileWithSemantics with valid test file...")

		const validResult = await parseFileWithSemantics("./_semanticTest/index.tsx")

		if (validResult && validResult._tag === "Ok") {
			console.log("✅ Valid file parsing successful!")
			console.log("File path:", validResult.value.filePath)
			console.log("Source text length:", validResult.value.sourceText.length)
			console.log("Semantic info keys:", Object.keys(validResult.value.semanticInfo))
			console.log("Purity analysis:", validResult.value.semanticInfo.purity.isPure)
			console.log("Complexity metrics:", validResult.value.semanticInfo.complexity.cyclomatic)
		} else {
			console.log("❌ Valid file parsing failed:", validResult?.error?.message)
		}

		console.log("\nTesting parseFileWithSemantics with invalid test file...")

		const invalidResult = await parseFileWithSemantics("./_invalidTest/index.ts")

		if (invalidResult && invalidResult._tag === "Error") {
			console.log("✅ Invalid file correctly rejected!")
			console.log("Error message:", invalidResult.error.message)
			console.log("Error kind:", invalidResult.error.kind)
		} else {
			console.log("❌ Invalid file should have failed but didn't:", invalidResult)
		}
	} catch (error) {
		console.log("❌ Unexpected error:", error instanceof Error ? error.message : String(error))
	}
}

testSemanticParsing()
