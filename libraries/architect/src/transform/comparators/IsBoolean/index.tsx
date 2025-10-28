import type { Operand } from "../../../../../artificer/types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import IsBooleanConstructor from "../../../../../artificer/src/constructors/comparators/scalar/IsBoolean/index.ts"

export type Props = {
	children?: JSX.Element | JSX.Element[]
}

export default function IsBoolean({
	children = [],
}: Props): ReturnType<typeof IsBooleanConstructor> {
	const childArray = Array.isArray(children) ? children : [children]
	const operand = childArray[0] as unknown as Operand
	return IsBooleanConstructor(operand)
}
