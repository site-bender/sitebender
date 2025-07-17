import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LymphaticVesselProps from "../../../../../../types/Thing/LymphaticVessel/index.ts"
import type VesselProps from "../../../../../../types/Thing/Vessel/index.ts"

import Vessel from "../index.tsx"

export type Props = BaseComponentProps<
	LymphaticVesselProps,
	"LymphaticVessel",
	ExtractLevelProps<LymphaticVesselProps, VesselProps>
>

export default function LymphaticVessel(
	{
		originatesFrom,
		regionDrained,
		runsTo,
		schemaType = "LymphaticVessel",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Vessel
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				originatesFrom,
				regionDrained,
				runsTo,
				...subtypeProperties,
			}}
		/>
	)
}
