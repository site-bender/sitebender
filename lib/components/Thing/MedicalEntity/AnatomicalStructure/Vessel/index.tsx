import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AnatomicalStructureProps from "../../../../../types/Thing/AnatomicalStructure/index.ts"
import type VesselProps from "../../../../../types/Thing/Vessel/index.ts"

import AnatomicalStructure from "./index.tsx"

// Vessel adds no properties to the AnatomicalStructure schema type
export type Props = BaseComponentProps<
	VesselProps,
	"Vessel",
	ExtractLevelProps<VesselProps, AnatomicalStructureProps>
>

export default function Vessel({
	schemaType = "Vessel",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AnatomicalStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
