import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MotorizedBicycleProps from "../../../../../types/Thing/MotorizedBicycle/index.ts"
import type VehicleProps from "../../../../../types/Thing/Vehicle/index.ts"

import Vehicle from "../index.tsx"

// MotorizedBicycle adds no properties to the Vehicle schema type
export type Props = BaseComponentProps<
	MotorizedBicycleProps,
	"MotorizedBicycle",
	ExtractLevelProps<MotorizedBicycleProps, VehicleProps>
>

export default function MotorizedBicycle({
	schemaType = "MotorizedBicycle",
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
