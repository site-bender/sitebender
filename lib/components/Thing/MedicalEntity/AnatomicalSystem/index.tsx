import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type AnatomicalSystemProps from "../../../../types/Thing/AnatomicalSystem/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	AnatomicalSystemProps,
	"AnatomicalSystem",
	ExtractLevelProps<AnatomicalSystemProps, MedicalEntityProps>
>

export default function AnatomicalSystem(
	{
		associatedPathophysiology,
		comprisedOf,
		relatedCondition,
		relatedStructure,
		relatedTherapy,
		schemaType = "AnatomicalSystem",
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
				comprisedOf,
				relatedCondition,
				relatedStructure,
				relatedTherapy,
				...subtypeProperties,
			}}
		/>
	)
}
