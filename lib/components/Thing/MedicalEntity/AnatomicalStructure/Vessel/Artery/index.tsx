import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../../types/Thing/MedicalEntity/index.ts"
import type { AnatomicalStructureProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import type { VesselProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/index.ts"
import type { ArteryProps } from "../../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Vessel/Artery/index.ts"

import Vessel from "../index.tsx"

export type Props = BaseComponentProps<
	ArteryProps,
	"Artery",
	ExtractLevelProps<ThingProps, MedicalEntityProps, AnatomicalStructureProps, VesselProps>
>

export default function Artery({
	arterialBranch,
	supplyTo,
	schemaType = "Artery",
	subtypeProperties = {},
	...props
}): Props {
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
