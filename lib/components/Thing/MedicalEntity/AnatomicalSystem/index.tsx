import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { AnatomicalSystemProps } from "../../../../types/Thing/MedicalEntity/AnatomicalSystem/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	AnatomicalSystemProps,
	"AnatomicalSystem",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function AnatomicalSystem({
	associatedPathophysiology,
	comprisedOf,
	relatedCondition,
	relatedStructure,
	relatedTherapy,
	schemaType = "AnatomicalSystem",
	subtypeProperties = {},
	...props
}): Props {
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
