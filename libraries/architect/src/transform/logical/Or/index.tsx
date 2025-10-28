import type {
	ComparatorConfig,
	LogicalConfig,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import OrConstructor from "../../../../../artificer/src/constructors/comparators/algebraic/Or/index.ts"

export type OrProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function Or({
	children = [],
}: OrProps): LogicalConfig {
	const childArray = Array.isArray(children) ? children : [children]

	// Or constructor signature: (datatype) => (operands)
	return OrConstructor("Boolean")(
		childArray as unknown as Array<
			ComparatorConfig | LogicalConfig
		>,
	)
}
