import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type MedicalTherapy from "../../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type { MedicalConditionProps } from "../index.ts"

import MedicalTherapyComponent from "../../../../../components/Thing/MedicalEntity/MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

export interface MedicalSignOrSymptomProps {
	"@type"?: "MedicalSignOrSymptom"
	possibleTreatment?:
		| MedicalTherapy
		| ReturnType<typeof MedicalTherapyComponent>
}

type MedicalSignOrSymptom =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& MedicalSignOrSymptomProps

export default MedicalSignOrSymptom
