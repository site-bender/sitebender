import type {
	LinguistFunctionSignature,
	Properties,
	TraversalMetadata,
} from "../../types/index.ts"

import deriveComplexity from "../deriveComplexity/index.ts"

//++ Build documentation properties from Linguist's signature and metadata
export default function buildProperties(
	signature: LinguistFunctionSignature,
	metadata: TraversalMetadata,
): Properties {
	return {
		isPure: signature.isPure,
		isCurried: signature.isCurried,
		curryLevels: signature.isCurried ? 2 : undefined, // TODO(@parser): Get from Linguist
		isIdempotent: false, // TODO(@parser): Linguist should provide this
		isCommutative: false, // TODO(@parser): Linguist should provide this
		isAssociative: false, // TODO(@parser): Linguist should provide this
		isDistributive: false, // TODO(@parser): Linguist should provide this
		complexity: deriveComplexity(metadata.cyclomaticComplexity),
		nullHandling: "unknown" as const, // TODO(@parser): Linguist should analyze this
		deterministic: signature.isPure && !metadata.hasGlobalAccess,
	}
}
