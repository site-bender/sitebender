import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"
//++ Generates Linguist contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }

export default function generateLinguistDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateLinguistDoc()
	await Deno.writeTextFile(
		"libraries/linguist/contracts/contract.md",
		markdown,
	)
	console.log("✅ Generated Linguist contract documentation")
}
