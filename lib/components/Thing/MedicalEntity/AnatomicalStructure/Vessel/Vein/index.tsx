import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../../types/Thing/MedicalEntity/index.ts"
import type { AnatomicalStructureProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import type { VesselProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.ts"
import type { VeinProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/Vein/index.ts"

import Vessel from "../index.tsx"

export type Props = BaseComponentProps<
	VeinProps,
	"Vein",
	ExtractLevelProps<ThingProps, MedicalEntityProps, AnatomicalStructureProps, VesselProps>
>

export default function Vein({
	drainsTo,
	regionDrained,
	tributary,
	schemaType = "Vein",
	subtypeProperties = {},
	...props
}): Props {
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
