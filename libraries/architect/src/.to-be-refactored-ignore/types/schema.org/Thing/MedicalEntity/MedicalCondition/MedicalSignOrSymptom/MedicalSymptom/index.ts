import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalConditionProps } from "../../index.ts"
import type { MedicalSignOrSymptomProps } from "../index.ts"

export type MedicalSymptomType = "MedicalSymptom"

export interface MedicalSymptomProps {
	"@type"?: MedicalSymptomType
}

type MedicalSymptom =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& MedicalSignOrSymptomProps
	& MedicalSymptomProps

export default MedicalSymptom
