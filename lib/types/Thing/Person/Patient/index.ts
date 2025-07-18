import type MedicalAudience from "../../Intangible/Audience/MedicalAudience/index.ts"
import type MedicalCondition from "../../MedicalEntity/MedicalCondition/index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type Person from "../index.ts"

export default interface Patient extends Person, MedicalAudience {
	/** One or more alternative conditions considered in the differential diagnosis process as output of a diagnosis process. */
	diagnosis?: MedicalCondition
	/** Specifying a drug or medicine used in a medication procedure. */
	drug?: Drug
	/** Specifying the health condition(s) of a patient, medical study, or other target audience. */
	healthCondition?: MedicalCondition
}
