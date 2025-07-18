import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type OfferItemConditionProps from "../../../../../types/Thing/OfferItemCondition/index.ts"

import Enumeration from "../index.tsx"

// OfferItemCondition adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	OfferItemConditionProps,
	"OfferItemCondition",
	ExtractLevelProps<OfferItemConditionProps, EnumerationProps>
>

export default function OfferItemCondition({
	schemaType = "OfferItemCondition",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
