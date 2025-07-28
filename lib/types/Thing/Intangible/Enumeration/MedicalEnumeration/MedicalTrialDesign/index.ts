import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

import MedicalTrialDesignComponent from "../../../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalTrialDesign/index.tsx"

export interface MedicalTrialDesignProps {
}

type MedicalTrialDesign =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalTrialDesignProps

export default MedicalTrialDesign
