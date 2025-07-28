import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ProductProps } from "../../../../../types/Thing/Product/index.ts"
import type { VehicleProps } from "../../../../../types/Thing/Product/Vehicle/index.ts"
import type { CarProps } from "../../../../../types/Thing/Product/Vehicle/Car/index.ts"

import Vehicle from "../index.tsx"

export type Props = BaseComponentProps<
	CarProps,
	"Car",
	ExtractLevelProps<ThingProps, ProductProps, VehicleProps>
>

export default function Car({
	acrissCode,
	roofLoad,
	schemaType = "Car",
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
