import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MedicalConditionProps from "../../../../../types/Thing/MedicalCondition/index.ts"
import type MedicalSignOrSymptomProps from "../../../../../types/Thing/MedicalSignOrSymptom/index.ts"

import MedicalCondition from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalSignOrSymptomProps,
	"MedicalSignOrSymptom",
	ExtractLevelProps<MedicalSignOrSymptomProps, MedicalConditionProps>
>

export default function MedicalSignOrSymptom(
	{
		possibleTreatment,
		schemaType = "MedicalSignOrSymptom",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
