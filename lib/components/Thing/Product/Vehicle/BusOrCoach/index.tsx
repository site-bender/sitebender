import type BaseProps from "../../../../../types/index.ts"
import type { BusOrCoachProps } from "../../../../../types/Thing/Product/Vehicle/BusOrCoach/index.ts"

import Vehicle from "../index.tsx"

export type Props = BusOrCoachProps & BaseProps

export default function BusOrCoach({
	acrissCode,
	roofLoad,
	_type = "BusOrCoach",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Vehicle
			{...props}
			_type={_type}
			subtypeProperties={{
				acrissCode,
				roofLoad,
				...subtypeProperties,
			}}
		/>
	)
}
