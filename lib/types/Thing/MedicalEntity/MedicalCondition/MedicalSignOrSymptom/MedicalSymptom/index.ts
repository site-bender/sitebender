// MedicalSymptom extends MedicalSignOrSymptom but adds no additional properties
import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalConditionProps } from "../../index.ts"
import type { MedicalSignOrSymptomProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MedicalSymptomProps {}

type MedicalSymptom =
	& Thing
	& MedicalConditionProps
	& MedicalEntityProps
	& MedicalSignOrSymptomProps
	& MedicalSymptomProps

export default MedicalSymptom
