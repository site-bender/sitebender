import type Thing from "../../../index.ts"
import type MedicalTrialDesign from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalTrialDesign/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalStudyProps } from "../index.ts"

import { MedicalTrialDesign as MedicalTrialDesignComponent } from "../../../../../../components/index.tsx"

export type MedicalTrialType = "MedicalTrial"

export interface MedicalTrialProps {
	"@type"?: MedicalTrialType
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
