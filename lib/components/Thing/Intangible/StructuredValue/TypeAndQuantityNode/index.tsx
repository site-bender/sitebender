import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { TypeAndQuantityNodeProps } from "../../../../../types/Thing/Intangible/StructuredValue/TypeAndQuantityNode/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	TypeAndQuantityNodeProps,
	"TypeAndQuantityNode",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function TypeAndQuantityNode({
	amountOfThisGood,
	businessFunction,
	typeOfGood,
	unitCode,
	unitText,
	schemaType = "TypeAndQuantityNode",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				amountOfThisGood,
				businessFunction,
				typeOfGood,
				unitCode,
				unitText,
				...subtypeProperties,
			}}
		/>
	)
}
