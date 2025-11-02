import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicineSystemType = "MedicineSystem"

export interface MedicineSystemProps {
	"@type"?: MedicineSystemType
}

type MedicineSystem =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicineSystemProps

export default MedicineSystem
