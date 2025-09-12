import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"
//++ Generates Prover contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }

export default function generateProverDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateProverDoc()
	await Deno.writeTextFile(
		"libraries/prover/contracts/contract.md",
		markdown,
	)
	console.log("✅ Generated Prover contract documentation")
}
