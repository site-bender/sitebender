import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"
import type TypeAndQuantityNodeProps from "../../../../../types/Thing/TypeAndQuantityNode/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	TypeAndQuantityNodeProps,
	"TypeAndQuantityNode",
	ExtractLevelProps<TypeAndQuantityNodeProps, StructuredValueProps>
>

export default function TypeAndQuantityNode(
	{
		amountOfThisGood,
		businessFunction,
		typeOfGood,
		unitCode,
		unitText,
		schemaType = "TypeAndQuantityNode",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
