// VitalSign extends MedicalSign but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { MedicalEntityProps } from "../../../../index.ts"
import type { MedicalConditionProps } from "../../../index.ts"
import type { MedicalSignOrSymptomProps } from "../../index.ts"
import type { MedicalSignProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface VitalSignProps {}

type VitalSign =
	& Thing
	& MedicalConditionProps
	& MedicalEntityProps
	& MedicalSignProps
	& MedicalSignOrSymptomProps
	& VitalSignProps

export default VitalSign
