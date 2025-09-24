import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"
//++ Generates Quarrier contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }

export default function generateQuarrierDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateQuarrierDoc()
	await Deno.writeTextFile(
		"libraries/quarrier/contracts/contract.md",
		markdown,
	)
	console.log("✅ Generated Quarrier contract documentation")
}
