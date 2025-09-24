import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"
//++ Generates Logician contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }

export default function generateLogicianDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateLogicianDoc()
	await Deno.writeTextFile(
		"libraries/logician/contracts/contract.md",
		markdown,
	)
	console.log("✅ Generated Logician contract documentation")
}
