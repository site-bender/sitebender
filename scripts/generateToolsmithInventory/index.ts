import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import slice from "@sitebender/toolsmith/vanilla/array/slice/index.ts"
import keys from "@sitebender/toolsmith/vanilla/object/keys/index.ts"
import values from "@sitebender/toolsmith/vanilla/object/values/index.ts"
import { stringify } from "jsr:@std/yaml@1.0.0"

import type { ToolsmithInventory } from "./types/index.ts"

import _findIndexFiles from "./_findIndexFiles/index.ts"
import _processFiles from "./_processFiles/index.ts"
import _sumCategoryCounts from "./_sumCategoryCounts/index.ts"
import { OUTPUT_PATH, TOOLSMITH_ROOT } from "./constants/index.ts"

/*++
 | Scans libraries/toolsmith/src/vanilla/ and generates a comprehensive inventory
 | of all functions for use by AI transformation agents.
 */
async function generateToolsmithInventory(): Promise<void> {
	console.log("🔍 Scanning toolsmith for functions...")

	const indexFiles = await _findIndexFiles(TOOLSMITH_ROOT)
	console.log(`📁 Found ${length(indexFiles)} index.ts files`)

	const result = await _processFiles(indexFiles)
	console.log(`✅ Processed ${result.processedCount} functions`)

	// Report aliased functions
	const aliasedCount = length(result.aliasedFiles)
	if (aliasedCount > 0) {
		console.log(`🔄 Found ${aliasedCount} aliased functions`)
	}

	// Report type/constant files
	const typeConstantCount = length(result.typeOrConstantFiles)
	if (typeConstantCount > 0) {
		console.log(`📝 Skipped ${typeConstantCount} type/constant files`)
	}

	// Report actual failures
	const failedCount = length(result.failedFiles)
	if (failedCount > 0) {
		console.error(`❌ Failed to process ${failedCount} files:`)
		const first5 = slice(0)(5)(result.failedFiles)
		map((file: string) => {
			console.error(`   ${file}`)
			return file
		})(first5)
		if (failedCount > 5) {
			console.error(`   ... and ${failedCount - 5} more`)
		}
	}

	// Write inventory to YAML file
	const yaml = stringify(result.inventory)
	await Deno.writeTextFile(OUTPUT_PATH, yaml)

	console.log(`📝 Generated inventory: ${OUTPUT_PATH}`)

	const categoryKeys = keys(result.inventory)
	console.log(`📊 Categories: ${length(categoryKeys)}`)

	const categoryValues = values(result.inventory)
	const totalFunctions = reduce(_sumCategoryCounts)(0)(categoryValues)

	console.log(`🔧 Total functions: ${totalFunctions}`)
}

// Run the generator
if (import.meta.main) {
	try {
		await generateToolsmithInventory()
	} catch (error) {
		console.error("❌ Failed to generate inventory:", error)
		Deno.exit(1)
	}
}
