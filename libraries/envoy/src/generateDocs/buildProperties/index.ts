import type {
	ArboristFunctionSignature,
	Properties,
	TraversalMetadata,
} from "../../types/index.ts"

import deriveComplexity from "../deriveComplexity/index.ts"

//++ Build documentation properties from Arborist's signature and metadata
export default function buildProperties(
	signature: ArboristFunctionSignature,
	metadata: TraversalMetadata,
): Properties {
	return {
		isPure: signature.isPure,
		isCurried: signature.isCurried,
		curryLevels: signature.isCurried ? 2 : undefined, // TODO(@parser): Get from Arborist
		isIdempotent: false, // TODO(@parser): Arborist should provide this
		isCommutative: false, // TODO(@parser): Arborist should provide this
		isAssociative: false, // TODO(@parser): Arborist should provide this
		isDistributive: false, // TODO(@parser): Arborist should provide this
		complexity: deriveComplexity(metadata.cyclomaticComplexity),
		nullHandling: "unknown" as const, // TODO(@parser): Arborist should analyze this
		deterministic: signature.isPure && !metadata.hasGlobalAccess,
	}
}
