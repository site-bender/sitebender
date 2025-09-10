import type { ParserFunctionSignature, Properties, TraversalMetadata } from "../../types/index.ts"

import deriveComplexity from "../deriveComplexity/index.ts"

//++ Build documentation properties from Parser's signature and metadata
export default function buildProperties(
	signature: ParserFunctionSignature,
	metadata: TraversalMetadata,
): Properties {
	return {
		isPure: signature.isPure,
		isCurried: signature.isCurried,
		curryLevels: signature.isCurried ? 2 : undefined, // TODO(@parser): Get from Parser
		isIdempotent: false, // TODO(@parser): Parser should provide this
		isCommutative: false, // TODO(@parser): Parser should provide this
		isAssociative: false, // TODO(@parser): Parser should provide this
		isDistributive: false, // TODO(@parser): Parser should provide this
		complexity: deriveComplexity(metadata.cyclomaticComplexity),
		nullHandling: "unknown" as const, // TODO(@parser): Parser should analyze this
		deterministic: signature.isPure && !metadata.hasGlobalAccess,
	}
}
