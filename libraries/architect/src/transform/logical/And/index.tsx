import type {
	ComparatorConfig,
	LogicalConfig,
} from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import AndConstructor from "../../../../../artificer/src/constructors/comparators/algebraic/And/index.ts"

export type AndProps = {
	children?: JSX.Element | JSX.Element[]
}

export default function And({
	children = [],
}: AndProps): LogicalConfig {
	const childArray = Array.isArray(children) ? children : [children]

	// And constructor signature: (datatype) => (operands)
	return AndConstructor("Boolean")(
		childArray as unknown as Array<
			ComparatorConfig | LogicalConfig
		>,
	)
}
