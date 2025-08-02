import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalConditionProps } from "../../../index.ts"
import type { MedicalSignOrSymptomProps } from "../../index.ts"
import type { MedicalSignProps } from "../index.ts"

export type VitalSignType = "VitalSign"

export interface VitalSignProps {
	"@type"?: VitalSignType
}

type VitalSign =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& MedicalSignOrSymptomProps
	& MedicalSignProps
	& VitalSignProps

export default VitalSign
