// PreventionIndication extends MedicalIndication but adds no additional properties
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PreventionIndicationProps {}

type PreventionIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& PreventionIndicationProps

export default PreventionIndication
