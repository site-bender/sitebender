import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"
//++ Generates Arborist contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }

export default function generateArboristDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateArboristDoc()
	await Deno.writeTextFile(
		"libraries/arborist/contracts/contract.md",
		markdown,
	)
	console.log("✅ Generated Arborist contract documentation")
}
