import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ProductProps } from "../../../../../types/Thing/Product/index.ts"
import type { VehicleProps } from "../../../../../types/Thing/Product/Vehicle/index.ts"
import type { BusOrCoachProps } from "../../../../../types/Thing/Product/Vehicle/BusOrCoach/index.ts"

import Vehicle from "../index.tsx"

export type Props = BaseComponentProps<
	BusOrCoachProps,
	"BusOrCoach",
	ExtractLevelProps<ThingProps, ProductProps, VehicleProps>
>

export default function BusOrCoach({
	acrissCode,
	roofLoad,
	schemaType = "BusOrCoach",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Vehicle
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				acrissCode,
				roofLoad,
				...subtypeProperties,
			}}
		/>
	)
}
