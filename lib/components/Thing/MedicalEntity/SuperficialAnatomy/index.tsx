import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../types/Thing/MedicalEntity/index.ts"
import type { SuperficialAnatomyProps } from "../../../../types/Thing/MedicalEntity/SuperficialAnatomy/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = BaseComponentProps<
	SuperficialAnatomyProps,
	"SuperficialAnatomy",
	ExtractLevelProps<ThingProps, MedicalEntityProps>
>

export default function SuperficialAnatomy({
	associatedPathophysiology,
	relatedAnatomy,
	relatedCondition,
	relatedTherapy,
	significance,
	schemaType = "SuperficialAnatomy",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				associatedPathophysiology,
				relatedAnatomy,
				relatedCondition,
				relatedTherapy,
				significance,
				...subtypeProperties,
			}}
		/>
	)
}
