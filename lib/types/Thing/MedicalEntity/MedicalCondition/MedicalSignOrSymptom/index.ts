import MedicalTherapy from "../../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"
import MedicalCondition from "../index.ts"

export default interface MedicalSignOrSymptom extends MedicalCondition {
	/** A possible treatment to address this condition, sign or symptom. */
	possibleTreatment?: MedicalTherapy
}
