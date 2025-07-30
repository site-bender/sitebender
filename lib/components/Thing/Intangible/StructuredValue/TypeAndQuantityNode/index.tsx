import type BaseProps from "../../../../../types/index.ts"
import type TypeAndQuantityNodeProps from "../../../../../types/Thing/Intangible/StructuredValue/TypeAndQuantityNode/index.ts"

import StructuredValue from "../index.tsx"

export type Props = TypeAndQuantityNodeProps & BaseProps

export default function TypeAndQuantityNode({
	amountOfThisGood,
	businessFunction,
	typeOfGood,
	unitCode,
	unitText,
	_type = "TypeAndQuantityNode",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
			subtypeProperties={{
				amountOfThisGood,
				businessFunction,
				typeOfGood,
				unitCode,
				unitText,
				...subtypeProperties,
			}}
		>{children}</StructuredValue>
	)
}
