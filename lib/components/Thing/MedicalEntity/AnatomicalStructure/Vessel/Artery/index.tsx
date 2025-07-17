import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ArteryProps from "../../../../../../types/Thing/Artery/index.ts"
import type VesselProps from "../../../../../../types/Thing/Vessel/index.ts"

import Vessel from "../index.tsx"

export type Props = BaseComponentProps<
	ArteryProps,
	"Artery",
	ExtractLevelProps<ArteryProps, VesselProps>
>

export default function Artery(
	{
		arterialBranch,
		supplyTo,
		schemaType = "Artery",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Vessel
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				arterialBranch,
				supplyTo,
				...subtypeProperties,
			}}
		/>
	)
}
