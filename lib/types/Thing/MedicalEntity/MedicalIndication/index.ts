// MedicalIndication extends MedicalEntity but adds no additional properties
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MedicalIndicationProps {}

type MedicalIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps

export default MedicalIndication
