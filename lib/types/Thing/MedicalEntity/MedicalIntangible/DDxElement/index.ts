import type MedicalCondition from "../../MedicalCondition/index.ts"
import type MedicalSignOrSymptom from "../../MedicalCondition/MedicalSignOrSymptom/index.ts"
import type MedicalIntangible from "../index.ts"

export default interface DDxElement extends MedicalIntangible {
	/** One or more alternative conditions considered in the differential diagnosis process as output of a diagnosis process. */
	diagnosis?: MedicalCondition
	/** One of a set of signs and symptoms that can be used to distinguish this diagnosis from others in the differential diagnosis. */
	distinguishingSign?: MedicalSignOrSymptom
}
