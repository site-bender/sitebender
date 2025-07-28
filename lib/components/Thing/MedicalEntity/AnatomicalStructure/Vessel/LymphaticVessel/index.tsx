import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../../types/Thing/MedicalEntity/index.ts"
import type { AnatomicalStructureProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import type { VesselProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.ts"
import type { LymphaticVesselProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/LymphaticVessel/index.ts"

import Vessel from "../index.tsx"

export type Props = BaseComponentProps<
	LymphaticVesselProps,
	"LymphaticVessel",
	ExtractLevelProps<ThingProps, MedicalEntityProps, AnatomicalStructureProps, VesselProps>
>

export default function LymphaticVessel({
	originatesFrom,
	regionDrained,
	runsTo,
	schemaType = "LymphaticVessel",
	subtypeProperties = {},
	...props
}): Props {
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
