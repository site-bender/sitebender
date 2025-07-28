import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalConditionProps } from "../../../../../../types/Thing/MedicalEntity/MedicalCondition/index.ts"
import type { MedicalSignOrSymptomProps } from "../../../../../../types/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/index.ts"
import type { MedicalSignProps } from "../../../../../../types/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.ts"

import MedicalSignOrSymptom from "../index.tsx"

export type Props = BaseComponentProps<
	MedicalSignProps,
	"MedicalSign",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalConditionProps, MedicalSignOrSymptomProps>
>

export default function MedicalSign({
	identifyingExam,
	identifyingTest,
	schemaType = "MedicalSign",
	subtypeProperties = {},
	...props
}): Props {
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
