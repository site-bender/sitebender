import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { OwnershipInfoProps } from "../../../../../types/Thing/Intangible/StructuredValue/OwnershipInfo/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	OwnershipInfoProps,
	"OwnershipInfo",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function OwnershipInfo({
	acquiredFrom,
	ownedFrom,
	ownedThrough,
	typeOfGood,
	schemaType = "OwnershipInfo",
	subtypeProperties = {},
	...props
}): Props {
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
