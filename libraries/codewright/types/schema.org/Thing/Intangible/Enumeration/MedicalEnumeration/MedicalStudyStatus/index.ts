import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicalStudyStatusType = "MedicalStudyStatus"

export interface MedicalStudyStatusProps {
	"@type"?: MedicalStudyStatusType
}

type MedicalStudyStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalStudyStatusProps

export default MedicalStudyStatus
