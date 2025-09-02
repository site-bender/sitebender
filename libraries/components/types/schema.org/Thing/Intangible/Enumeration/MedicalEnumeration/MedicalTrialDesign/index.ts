import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicalTrialDesignType = "MedicalTrialDesign"

export interface MedicalTrialDesignProps {
	"@type"?: MedicalTrialDesignType
}

type MedicalTrialDesign =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalTrialDesignProps

export default MedicalTrialDesign
