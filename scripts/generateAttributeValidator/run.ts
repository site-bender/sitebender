import generateAttributeValidator from "./index.ts"
import { ATTRIBUTE_CONFIGS } from "./configs/index.ts"

/*++
 + Runner script to generate all attribute validators
 + Processes all configs and reports results
 + [IO] Generates multiple validator files
 */
async function run(): Promise<void> {
	console.log("🚀 Generating attribute validators...\n")

	let successCount = 0
	let failureCount = 0

	for (const config of ATTRIBUTE_CONFIGS) {
		console.log(
			`Generating _validate${config.attributeName.charAt(0).toUpperCase()}${
				config.attributeName.slice(1)
			}...`,
		)

		const result = await generateAttributeValidator(config)

		if (result.success) {
			console.log(`✅ ${result.message}`)
			console.log(`   Validator: ${result.validatorPath}`)
			console.log(`   Test: ${result.testPath}\n`)
			successCount++
		} else {
			console.log(`❌ ${result.message}\n`)
			failureCount++
		}
	}

	console.log("\n📊 Generation Summary:")
	console.log(`   ✅ Successful: ${successCount}`)
	console.log(`   ❌ Failed: ${failureCount}`)
	console.log(`   📁 Total: ${ATTRIBUTE_CONFIGS.length}`)

	if (failureCount > 0) {
		Deno.exit(1)
	}
}

run()
