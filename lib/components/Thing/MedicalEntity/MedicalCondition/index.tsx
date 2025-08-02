import type BaseProps from "../../../../types/index.ts"
import type MedicalConditionProps from "../../../../types/Thing/MedicalEntity/MedicalCondition/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalConditionProps & BaseProps

export default function MedicalCondition({
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
	_type = "MedicalCondition",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MedicalEntity
			{...props}
			_type={_type}
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
		>
			{children}
		</MedicalEntity>
	)
}
