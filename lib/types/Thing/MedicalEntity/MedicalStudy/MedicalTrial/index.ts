import MedicalTrialDesign from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalTrialDesign/index.ts"
import MedicalStudy from "../index.ts"

export default interface MedicalTrial extends MedicalStudy {
	/** Specifics about the trial design (enumerated). */
	trialDesign?: MedicalTrialDesign
}
