#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Generate behavioral tests for the scribe library using prover
 * Tests are organized by behavior, not source structure
 */

import generateTests from "../prover/src/generateTests/index.ts"
import writeTestFile from "../prover/src/writeTestFile/index.ts"
import type { GeneratorConfig } from "../prover/src/types/index.ts"

// Get the absolute path to scribe library
const SCRIBE_ROOT = "/Users/guy/Workspace/@sitebender/scribe-ai/libraries/scribe"

// Behavioral test categories for scribe
const BEHAVIORAL_CATEGORIES = {
  "parsing": [
    `${SCRIBE_ROOT}/src/parser/parseFile/index.ts`,
    `${SCRIBE_ROOT}/src/parser/parseFunction/index.ts`,
  ],
  "detection": [
    `${SCRIBE_ROOT}/src/detectors/detectPurity/index.ts`,
    `${SCRIBE_ROOT}/src/detectors/detectCurrying/index.ts`,
    `${SCRIBE_ROOT}/src/detectors/detectComplexity/index.ts`,
  ],
  "extraction": [
    `${SCRIBE_ROOT}/src/extractors/extractSignature/index.ts`,
    `${SCRIBE_ROOT}/src/extractors/extractReturnType/index.ts`,
  ],
  "generation": [
    `${SCRIBE_ROOT}/src/generators/generateMarkdown/index.ts`,
    `${SCRIBE_ROOT}/src/generators/formatProperties/index.ts`,
  ],
  "integration": [
    `${SCRIBE_ROOT}/src/generateDocs/index.ts`,
  ]
}

// Generate tests for all scribe functions grouped by behavior
async function main() {
  console.log("🧪 Generating behavioral tests for scribe library using prover...")
  
  const config: Partial<GeneratorConfig> = {
    includePropertyTests: true,
    includeEdgeCases: true,
    includeBenchmarks: false,
    targetCoverage: 100,
    maxPropertyRuns: 100
  }
  
  for (const [category, functionPaths] of Object.entries(BEHAVIORAL_CATEGORIES)) {
    console.log(`\n📂 Generating ${category} behavior tests...`)
    
    const allTests = []
    
    for (const path of functionPaths) {
      console.log(`   📝 Analyzing ${path}...`)
      
      try {
        const testSuite = await generateTests(path, config)
        allTests.push(testSuite)
        console.log(`      ✅ Generated ${testSuite.tests.length} tests`)
      } catch (error) {
        console.error(`      ❌ Error: ${error.message}`)
      }
    }
    
    if (allTests.length > 0) {
      // Combine all tests for this behavioral category
      const combinedSuite = {
        functionName: category,
        tests: allTests.flatMap(suite => suite.tests),
        properties: allTests.flatMap(suite => suite.properties || []),
        benchmarks: allTests.flatMap(suite => suite.benchmarks || []),
        imports: [...new Set(allTests.flatMap(suite => suite.imports || []))],
      }
      
      // Write combined test file for this behavior category
      const outputPath = `tests/behaviors/${category}/index.test.ts`
      await writeTestFile(combinedSuite, outputPath)
      
      console.log(`   ✅ Written ${combinedSuite.tests.length} tests to ${outputPath}`)
      
      if (combinedSuite.properties.length > 0) {
        console.log(`   🔬 Includes ${combinedSuite.properties.length} property tests`)
      }
    }
  }
  
  console.log("\n✨ Test generation complete!")
  console.log("\nRun tests with: deno task test")
}

if (import.meta.main) {
  main()
}