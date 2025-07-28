import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalConditionProps } from "../../../../../types/Thing/MedicalEntity/MedicalCondition/index.ts"
import type { MedicalSignOrSymptomProps } from "../../../../../types/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/index.ts"

import MedicalCondition from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalSignOrSymptomProps,
	"MedicalSignOrSymptom",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalConditionProps>
>

export default function MedicalSignOrSymptom({
	possibleTreatment,
	schemaType = "MedicalSignOrSymptom",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MedicalCondition
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				possibleTreatment,
				...subtypeProperties,
			}}
		/>
	)
}
