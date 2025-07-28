import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { AnatomicalStructureProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/index.ts"
import type { JointProps } from "../../../../../types/Thing/MedicalEntity/AnatomicalStructure/Joint/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = BaseComponentProps<
	JointProps,
	"Joint",
	ExtractLevelProps<ThingProps, MedicalEntityProps, AnatomicalStructureProps>
>

export default function Joint({
	biomechnicalClass,
	functionalClass,
	structuralClass,
	schemaType = "Joint",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<AnatomicalStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				biomechnicalClass,
				functionalClass,
				structuralClass,
				...subtypeProperties,
			}}
		/>
	)
}
