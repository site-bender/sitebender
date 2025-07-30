import type Thing from "../../../index.ts"
import type MedicalTrialDesign from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalTrialDesign/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalStudyProps } from "../index.ts"

import MedicalTrialDesignComponent from "../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalTrialDesign/index.ts"

export interface MedicalTrialProps {
	"@type"?: "MedicalTrial"
	trialDesign?:
		| MedicalTrialDesign
		| ReturnType<typeof MedicalTrialDesignComponent>
}

type MedicalTrial =
	& Thing
	& MedicalEntityProps
	& MedicalStudyProps
	& MedicalTrialProps

export default MedicalTrial
