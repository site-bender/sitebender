import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DeliveryMethodProps from "../../../../../types/Thing/DeliveryMethod/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"

import Enumeration from "../index.tsx"

// DeliveryMethod adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	DeliveryMethodProps,
	"DeliveryMethod",
	ExtractLevelProps<DeliveryMethodProps, EnumerationProps>
>

export default function DeliveryMethod({
	schemaType = "DeliveryMethod",
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
