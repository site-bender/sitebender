import type { BoundariesConfig } from "../types/index.ts"

import hashHex from "../../../../libraries/toolsmith/src/crypto/hashHex/index.ts"
import serializeContractGraph from "../serializeContractGraph/index.ts"

//++ Generates contract graph JSON and hash files from boundaries.json

export default async function generateContractGraph(): Promise<void> {
	const boundariesPath = "libraries/contracts/boundaries.json"
	const graphPath = "reports/integrity/contract-graph.json"
	const hashPath = "reports/integrity/contract-graph.hash.json"

	const boundariesText = await Deno.readTextFile(boundariesPath)
	const boundaries = JSON.parse(boundariesText) as BoundariesConfig

	const graphJson = serializeContractGraph(boundaries)
	const graphHash = await hashHex(graphJson)

	const hashMetadata = {
		artifact: "contract-graph",
		version: 1,
		hashes: { sha256: graphHash },
		preferred: "sha256",
		generatedAt: new Date().toISOString(),
		schemaVersion: 1,
	}

	await Deno.writeTextFile(graphPath, graphJson)
	await Deno.writeTextFile(hashPath, JSON.stringify(hashMetadata, null, 2))

	console.log(`✅ Generated contract graph: ${graphPath}`)
	console.log(`✅ Generated graph hash: ${hashPath}`)
	console.log(`   SHA-256: ${graphHash}`)
}

//?? [EXAMPLE] Run as a script
// deno run --allow-read --allow-write scripts/integrity/graph/generateContractGraph/index.ts

if (import.meta.main) {
	await generateContractGraph()
}
