import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MedicalSignProps from "../../../../../../types/Thing/MedicalSign/index.ts"
import type MedicalSignOrSymptomProps from "../../../../../../types/Thing/MedicalSignOrSymptom/index.ts"

import MedicalSignOrSymptom from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalSignProps,
	"MedicalSign",
	ExtractLevelProps<MedicalSignProps, MedicalSignOrSymptomProps>
>

export default function MedicalSign(
	{
		identifyingExam,
		identifyingTest,
		schemaType = "MedicalSign",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalSignOrSymptom
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				identifyingExam,
				identifyingTest,
				...subtypeProperties,
			}}
		/>
	)
}
