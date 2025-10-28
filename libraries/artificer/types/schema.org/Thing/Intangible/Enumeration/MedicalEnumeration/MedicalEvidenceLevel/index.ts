import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicalEvidenceLevelType = "MedicalEvidenceLevel"

export interface MedicalEvidenceLevelProps {
	"@type"?: MedicalEvidenceLevelType
}

type MedicalEvidenceLevel =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalEvidenceLevelProps

export default MedicalEvidenceLevel
