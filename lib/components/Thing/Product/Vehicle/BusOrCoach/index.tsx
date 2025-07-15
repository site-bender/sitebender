import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BusOrCoachProps from "../../../../../types/Thing/BusOrCoach/index.ts"
import type VehicleProps from "../../../../../types/Thing/Vehicle/index.ts"

import Vehicle from "./index.tsx"

export type Props = BaseComponentProps<
	BusOrCoachProps,
	"BusOrCoach",
	ExtractLevelProps<BusOrCoachProps, VehicleProps>
>

export default function BusOrCoach(
	{
		acrissCode,
		roofLoad,
		schemaType = "BusOrCoach",
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
