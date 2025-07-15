import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type OwnershipInfoProps from "../../../../../types/Thing/OwnershipInfo/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	OwnershipInfoProps,
	"OwnershipInfo",
	ExtractLevelProps<OwnershipInfoProps, StructuredValueProps>
>

export default function OwnershipInfo(
	{
		acquiredFrom,
		ownedFrom,
		ownedThrough,
		typeOfGood,
		schemaType = "OwnershipInfo",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				acquiredFrom,
				ownedFrom,
				ownedThrough,
				typeOfGood,
				...subtypeProperties,
			}}
		/>
	)
}
