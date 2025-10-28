// [IO] This file performs side effects - file I/O and console output
//++ Arborist demo runner - shows practical usage across Sitebender libraries
//++ Run with: deno task demo:arborist

async function runDemo() {
	// Hardcode the absolute path to avoid path calculation issues
	const EXAMPLES_DIR =
		"/Users/guy/Workspace/@sitebender/artificer-ai/libraries/arborist/demo/examples/"

	console.log("═".repeat(80))
	console.log("ARBORIST DEMO - Practical Usage Across Sitebender Libraries")
	console.log("═".repeat(80))
	console.log()

	//++ Demonstrate Envoy documentation generation
	console.log("📚 ENVOY - Documentation Intelligence")
	console.log("─".repeat(50))

	// Show source code
	const envoySource = await Deno.readTextFile(
		`${EXAMPLES_DIR}envoyDocumentation/index.ts`,
	)
	console.log("📄 SOURCE CODE:")
	console.log(envoySource.trim())
	console.log()

	const { generateDocumentation } = await import(
		`${EXAMPLES_DIR}envoyDocumentation/index.ts`
	)
	const envoyResult = await generateDocumentation(
		`${EXAMPLES_DIR}envoyDocumentation/index.ts`,
	)

	if (envoyResult.error) {
		console.log(`❌ ${envoyResult.error}`)
	} else {
		console.log("✅ DOCUMENTATION GENERATED:")
		Object.entries(envoyResult.documentation).forEach(([key, value]) => {
			console.log(`  ${key}: ${value}`)
		})
	}
	console.log()

	console.log()

	//++ Demonstrate Artificer JSX analysis
	console.log("🏗️  ARCHITECT - Reactive Component Analysis")
	console.log("─".repeat(50))

	// Show source code
	const architectSource = await Deno.readTextFile(
		`${EXAMPLES_DIR}architectJsxAnalysis/index.tsx`,
	)
	console.log("📄 SOURCE CODE:")
	console.log(architectSource.trim())
	console.log()

	const { analyzeJsxStructure } = await import(
		`${EXAMPLES_DIR}architectJsxAnalysis/index.tsx`
	)
	const architectResult = await analyzeJsxStructure(
		`${EXAMPLES_DIR}architectJsxAnalysis/index.tsx`,
	)

	if (architectResult.error) {
		console.log(`❌ ${architectResult.error}`)
	} else {
		console.log("✅ JSX STRUCTURE ANALYZED:")
		Object.entries(architectResult.structure).forEach(([key, value]) => {
			console.log(`  ${key}: ${value}`)
		})
	}
	console.log()

	//++ Demonstrate Warden constitutional rule checking
	console.log("⚖️  WARDEN - Architectural Governance")
	console.log("─".repeat(50))

	// Show source code
	const wardenSource = await Deno.readTextFile(
		`${EXAMPLES_DIR}wardenRuleChecking/index.ts`,
	)
	console.log("📄 SOURCE CODE:")
	console.log(wardenSource.trim())
	console.log()

	const { checkConstitutionalRules } = await import(
		`${EXAMPLES_DIR}wardenRuleChecking/index.ts`
	)
	const wardenResult = await checkConstitutionalRules(
		`${EXAMPLES_DIR}wardenRuleChecking/index.ts`,
	)

	if (wardenResult.error) {
		console.log(`❌ ${wardenResult.error}`)
	} else {
		console.log("✅ CONSTITUTIONAL RULES CHECKED:")
		if (typeof wardenResult.violations === "string") {
			console.log(`  ${wardenResult.violations}`)
		} else {
			Object.entries(wardenResult.violations).forEach(([rule, status]) => {
				console.log(`  ${rule}: ${status}`)
			})
		}
	}
	console.log()

	//++ Demonstrate Auditor test generation
	console.log("🧪 AUDITOR - Test Generation & Verification")
	console.log("─".repeat(50))

	// Show source code
	const auditorSource = await Deno.readTextFile(
		`${EXAMPLES_DIR}auditorTestGeneration/index.ts`,
	)
	console.log("📄 SOURCE CODE:")
	console.log(auditorSource.trim())
	console.log()

	const { generateTests } = await import(
		`${EXAMPLES_DIR}auditorTestGeneration/index.ts`
	)
	const auditorResult = await generateTests(
		`${EXAMPLES_DIR}auditorTestGeneration/index.ts`,
	)

	if (auditorResult.error) {
		console.log(`❌ ${auditorResult.error}`)
	} else {
		console.log("✅ TEST GENERATION PLANNED:")
		Object.entries(auditorResult.tests).forEach(([aspect, plan]) => {
			console.log(`  ${aspect}: ${plan}`)
		})
	}
	console.log()

	//++ Demonstrate Quarrier property testing
	console.log("🎲 QUARRIER - Property-Based Testing")
	console.log("─".repeat(50))

	// Show source code
	const quarrierSource = await Deno.readTextFile(
		`${EXAMPLES_DIR}quarrierPropertyTesting/index.ts`,
	)
	console.log("📄 SOURCE CODE:")
	console.log(quarrierSource.trim())
	console.log()

	const { generatePropertyTests } = await import(
		`${EXAMPLES_DIR}quarrierPropertyTesting/index.ts`
	)
	const quarrierResult = await generatePropertyTests(
		`${EXAMPLES_DIR}quarrierPropertyTesting/index.ts`,
	)

	if (quarrierResult.error) {
		console.log(`❌ ${quarrierResult.error}`)
	} else {
		console.log("✅ PROPERTY TESTS GENERATED:")
		Object.entries(quarrierResult.properties).forEach(
			([property, description]) => {
				console.log(`  ${property}: ${description}`)
			},
		)
	}

	console.log()
	console.log("═".repeat(80))
	console.log("🎯 WHY THIS MATTERS")
	console.log("═".repeat(80))
	console.log()
	console.log(
		"Arborist provides the semantic foundation for the entire Sitebender ecosystem:",
	)
	console.log("• 📚 Envoy uses semantic analysis for intelligent documentation")
	console.log(
		"• 🏗️  Artificer uses fast parsing for reactive component analysis",
	)
	console.log(
		"• ⚖️  Warden uses structural analysis for architectural governance",
	)
	console.log(
		"• 🧪 Auditor uses type information for comprehensive test generation",
	)
	console.log(
		"• 🎲 Quarrier uses semantic info for mathematical property testing",
	)
	console.log()
	console.log(
		"All powered by dual-parser architecture: SWC for speed, deno_ast for depth.",
	)
	console.log()
	console.log("═".repeat(80))
	console.log("DEMO COMPLETE - Arborist is ready for production!")
	console.log("═".repeat(80))
}

runDemo()
