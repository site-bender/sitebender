import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalSignOrSymptomProps from "../../../../../../types/Thing/MedicalSignOrSymptom/index.ts"
import type MedicalSymptomProps from "../../../../../../types/Thing/MedicalSymptom/index.ts"

import MedicalSignOrSymptom from "./index.tsx"

// MedicalSymptom adds no properties to the MedicalSignOrSymptom schema type
export type Props = BaseComponentProps<
	MedicalSymptomProps,
	"MedicalSymptom",
	ExtractLevelProps<MedicalSymptomProps, MedicalSignOrSymptomProps>
>

export default function MedicalSymptom({
	schemaType = "MedicalSymptom",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalSignOrSymptom
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
