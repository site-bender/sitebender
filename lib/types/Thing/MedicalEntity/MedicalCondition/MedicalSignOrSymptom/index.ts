import type MedicalTherapy from "../../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import type MedicalCondition from "../index.ts"

export default interface MedicalSignOrSymptom extends MedicalCondition {
	/** A possible treatment to address this condition, sign or symptom. */
	possibleTreatment?: MedicalTherapy
}
