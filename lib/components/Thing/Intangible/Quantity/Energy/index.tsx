import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnergyProps from "../../../../../types/Thing/Energy/index.ts"
import type QuantityProps from "../../../../../types/Thing/Quantity/index.ts"

import Quantity from "../index.tsx"

// Energy adds no properties to the Quantity schema type
export type Props = BaseComponentProps<
	EnergyProps,
	"Energy",
	ExtractLevelProps<EnergyProps, QuantityProps>
>

export default function Energy({
	schemaType = "Energy",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Quantity
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
