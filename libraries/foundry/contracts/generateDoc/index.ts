//++ Generates Foundry contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }
import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"

export default function generateFoundryDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateFoundryDoc()
	await Deno.writeTextFile(
		"libraries/foundry/contracts/contract.md",
		markdown
	)
	console.log("✅ Generated Foundry contract documentation")
}