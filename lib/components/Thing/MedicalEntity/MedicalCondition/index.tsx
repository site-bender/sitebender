import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type MedicalConditionProps from "../../../../types/Thing/MedicalCondition/index.ts"
import type MedicalEntityProps from "../../../../types/Thing/MedicalEntity/index.ts"

import MedicalEntity from "./index.tsx"

export type Props = BaseComponentProps<
	MedicalConditionProps,
	"MedicalCondition",
	ExtractLevelProps<MedicalConditionProps, MedicalEntityProps>
>

export default function MedicalCondition(
	{
		associatedAnatomy,
		differentialDiagnosis,
		drug,
		epidemiology,
		expectedPrognosis,
		naturalProgression,
		pathophysiology,
		possibleComplication,
		possibleTreatment,
		primaryPrevention,
		riskFactor,
		secondaryPrevention,
		signOrSymptom,
		stage,
		status,
		typicalTest,
		schemaType = "MedicalCondition",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalEntity
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				associatedAnatomy,
				differentialDiagnosis,
				drug,
				epidemiology,
				expectedPrognosis,
				naturalProgression,
				pathophysiology,
				possibleComplication,
				possibleTreatment,
				primaryPrevention,
				riskFactor,
				secondaryPrevention,
				signOrSymptom,
				stage,
				status,
				typicalTest,
				...subtypeProperties,
			}}
		/>
	)
}
