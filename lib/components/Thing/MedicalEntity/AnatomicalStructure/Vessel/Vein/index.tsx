import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type VeinProps from "../../../../../../types/Thing/Vein/index.ts"
import type VesselProps from "../../../../../../types/Thing/Vessel/index.ts"

import Vessel from "./index.tsx"

export type Props = BaseComponentProps<
	VeinProps,
	"Vein",
	ExtractLevelProps<VeinProps, VesselProps>
>

export default function Vein(
	{
		drainsTo,
		regionDrained,
		tributary,
		schemaType = "Vein",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Vessel
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				drainsTo,
				regionDrained,
				tributary,
				...subtypeProperties,
			}}
		/>
	)
}
