import type BaseProps from "../../../../../types/index.ts"
import type MotorcycleProps from "../../../../../types/Thing/Product/Vehicle/Motorcycle/index.ts"

import Vehicle from "../index.tsx"

export type Props = MotorcycleProps & BaseProps

export default function Motorcycle({
	_type = "Motorcycle",
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
