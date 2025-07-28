import type BaseProps from "../../../../../types/index.ts"
import type { MotorizedBicycleProps } from "../../../../../types/Thing/Product/Vehicle/MotorizedBicycle/index.ts"

import Vehicle from "../index.tsx"

export type Props = MotorizedBicycleProps & BaseProps

export default function MotorizedBicycle({
	_type = "MotorizedBicycle",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Vehicle
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
