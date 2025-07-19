import type Thing from "../../../index.ts"
import type MedicalTrialDesign from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalTrialDesign/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalStudyProps } from "../index.ts"

export interface MedicalTrialProps {
	/** Specifics about the trial design (enumerated). */
	trialDesign?: MedicalTrialDesign
}

type MedicalTrial =
	& Thing
	& MedicalEntityProps
	& MedicalStudyProps
	& MedicalTrialProps

export default MedicalTrial
