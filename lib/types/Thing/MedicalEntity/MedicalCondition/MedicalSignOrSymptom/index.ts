import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type MedicalTherapy from "../../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type { MedicalConditionProps } from "../index.ts"

export interface MedicalSignOrSymptomProps {
	/** A possible treatment to address this condition, sign or symptom. */
	possibleTreatment?: MedicalTherapy
}

type MedicalSignOrSymptom =
	& Thing
	& MedicalConditionProps
	& MedicalEntityProps
	& MedicalSignOrSymptomProps

export default MedicalSignOrSymptom
