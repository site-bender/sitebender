#!/usr/bin/env -S deno run --allow-all

import { TestGenerator } from "./src/index.ts"
import { walk } from "https://deno.land/std@0.212.0/fs/walk.ts"

interface GenerationResult {
	path: string
	success: boolean
	error?: string
	coverage?: number
	testCount?: number
}

async function findAllToolkitFunctions(): Promise<Array<string>> {
	const functions: Array<string> = []
	const toolkitPath = "./libraries/toolkit/src"
	
	for await (const entry of walk(toolkitPath, {
		includeDirs: false,
		match: [/index\.ts$/],
	})) {
		// Skip test files and type files
		if (
			entry.path.includes("test") ||
			entry.path.includes("types/") ||
			entry.path.includes("constants/")
		) {
			continue
		}
		
		functions.push(entry.path)
	}
	
	return functions.sort()
}

async function generateTestsForAll(): Promise<void> {
	console.log("🚀 Starting test generation for all toolkit functions")
	console.log("=" .repeat(60))
	
	const functions = await findAllToolkitFunctions()
	console.log(`📊 Found ${functions.length} functions to process`)
	console.log("")
	
	const generator = new TestGenerator({
		maxPropertyRuns: 100,
		includeEdgeCases: true,
		includePropertyTests: true,
		includeBenchmarks: false,
		targetCoverage: 100,
	})
	
	const results: Array<GenerationResult> = []
	let successCount = 0
	let failureCount = 0
	let totalCoverage = 0
	let totalTestCases = 0
	
	for (const [index, functionPath] of functions.entries()) {
		const progress = `[${index + 1}/${functions.length}]`
		console.log(`\n${progress} Processing: ${functionPath}`)
		console.log("-".repeat(40))
		
		try {
			const suite = await generator.generateTests(functionPath)
			
			results.push({
				path: functionPath,
				success: true,
				coverage: suite.coverage.percentage,
				testCount: suite.testCases.length,
			})
			
			successCount++
			totalCoverage += suite.coverage.percentage
			totalTestCases += suite.testCases.length
			
			console.log(`✅ Success! Coverage: ${suite.coverage.percentage.toFixed(1)}%, Tests: ${suite.testCases.length}`)
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error)
			
			results.push({
				path: functionPath,
				success: false,
				error: errorMessage,
			})
			
			failureCount++
			console.log(`❌ Failed: ${errorMessage}`)
		}
	}
	
	// Print summary
	console.log("\n" + "=".repeat(60))
	console.log("📈 TEST GENERATION SUMMARY")
	console.log("=".repeat(60))
	
	console.log(`\n📊 Overall Statistics:`)
	console.log(`   Total functions: ${functions.length}`)
	console.log(`   ✅ Successful: ${successCount}`)
	console.log(`   ❌ Failed: ${failureCount}`)
	console.log(`   📝 Total test cases: ${totalTestCases}`)
	
	if (successCount > 0) {
		const avgCoverage = totalCoverage / successCount
		const avgTests = totalTestCases / successCount
		console.log(`   📏 Average coverage: ${avgCoverage.toFixed(1)}%`)
		console.log(`   📋 Average tests per function: ${avgTests.toFixed(1)}`)
	}
	
	// List failures if any
	if (failureCount > 0) {
		console.log(`\n⚠️  Failed Functions:`)
		for (const result of results) {
			if (!result.success) {
				console.log(`   • ${result.path}`)
				console.log(`     Error: ${result.error}`)
			}
		}
	}
	
	// List functions with less than 100% coverage
	const lowCoverage = results.filter(
		(r) => r.success && r.coverage && r.coverage < 100
	)
	
	if (lowCoverage.length > 0) {
		console.log(`\n⚠️  Functions with < 100% coverage:`)
		for (const result of lowCoverage) {
			console.log(`   • ${result.path} (${result.coverage?.toFixed(1)}%)`)
		}
	}
	
	// Generate report file
	const reportPath = "./scripts/test-generator/generation-report.json"
	const report = {
		timestamp: new Date().toISOString(),
		summary: {
			total: functions.length,
			successful: successCount,
			failed: failureCount,
			totalTestCases,
			averageCoverage: successCount > 0 ? totalCoverage / successCount : 0,
			averageTestsPerFunction: successCount > 0 ? totalTestCases / successCount : 0,
		},
		results,
	}
	
	await Deno.writeTextFile(reportPath, JSON.stringify(report, null, 2))
	console.log(`\n📄 Detailed report saved to: ${reportPath}`)
	
	// Exit with error if any failures
	if (failureCount > 0) {
		console.log(`\n❌ Test generation completed with ${failureCount} failures`)
		Deno.exit(1)
	} else {
		console.log(`\n✨ Test generation completed successfully!`)
	}
}

// Run if called directly
if (import.meta.main) {
	try {
		await generateTestsForAll()
	} catch (error) {
		console.error(`\n💥 Fatal error: ${error}`)
		Deno.exit(1)
	}
}