import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CarProps from "../../../../../types/Thing/Car/index.ts"
import type VehicleProps from "../../../../../types/Thing/Vehicle/index.ts"

import Vehicle from "../index.tsx"

export type Props = BaseComponentProps<
	CarProps,
	"Car",
	ExtractLevelProps<CarProps, VehicleProps>
>

export default function Car(
	{
		acrissCode,
		roofLoad,
		schemaType = "Car",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
