import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MotorcycleProps from "../../../../../types/Thing/Motorcycle/index.ts"
import type VehicleProps from "../../../../../types/Thing/Vehicle/index.ts"

import Vehicle from "../index.tsx"

// Motorcycle adds no properties to the Vehicle schema type
export type Props = BaseComponentProps<
	MotorcycleProps,
	"Motorcycle",
	ExtractLevelProps<MotorcycleProps, VehicleProps>
>

export default function Motorcycle({
	schemaType = "Motorcycle",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Vehicle
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
