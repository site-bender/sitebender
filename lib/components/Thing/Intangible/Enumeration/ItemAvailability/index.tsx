import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type ItemAvailabilityProps from "../../../../../types/Thing/ItemAvailability/index.ts"

import Enumeration from "../index.tsx"

// ItemAvailability adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	ItemAvailabilityProps,
	"ItemAvailability",
	ExtractLevelProps<ItemAvailabilityProps, EnumerationProps>
>

export default function ItemAvailability({
	schemaType = "ItemAvailability",
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
