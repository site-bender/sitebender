import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type AnatomicalStructureProps from "../../../../types/Thing/AnatomicalStructure/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"

import MedicalEntity from "./index.tsx"

export type Props = BaseComponentProps<
	AnatomicalStructureProps,
	"AnatomicalStructure",
	ExtractLevelProps<AnatomicalStructureProps, MedicalEntityProps>
>

export default function AnatomicalStructure(
	{
		associatedPathophysiology,
		bodyLocation,
		connectedTo,
		diagram,
		partOfSystem,
		relatedCondition,
		relatedTherapy,
		subStructure,
		schemaType = "AnatomicalStructure",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				associatedPathophysiology,
				bodyLocation,
				connectedTo,
				diagram,
				partOfSystem,
				relatedCondition,
				relatedTherapy,
				subStructure,
				...subtypeProperties,
			}}
		/>
	)
}
