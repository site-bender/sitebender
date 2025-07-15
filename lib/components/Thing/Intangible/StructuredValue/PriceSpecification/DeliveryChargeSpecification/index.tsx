import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DeliveryChargeSpecificationProps from "../../../../../../types/Thing/DeliveryChargeSpecification/index.ts"
import type PriceSpecificationProps from "../../../../../../types/Thing/PriceSpecification/index.ts"

import PriceSpecification from "./index.tsx"

// DeliveryChargeSpecification adds no properties to the PriceSpecification schema type
export type Props = BaseComponentProps<
	DeliveryChargeSpecificationProps,
	"DeliveryChargeSpecification",
	ExtractLevelProps<DeliveryChargeSpecificationProps, PriceSpecificationProps>
>

export default function DeliveryChargeSpecification({
	schemaType = "DeliveryChargeSpecification",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<PriceSpecification
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
