import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalStudyProps } from "../index.ts"
import type MedicalTrialDesign from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalTrialDesign/index.ts"

import MedicalTrialComponent from "../../../../../../components/Thing/MedicalEntity/MedicalStudy/MedicalTrial/index.tsx"

export interface MedicalTrialProps {
	trialDesign?: MedicalTrialDesign
}

type MedicalTrial =
	& Thing
	& MedicalEntityProps
	& MedicalStudyProps
	& MedicalTrialProps

export default MedicalTrial
