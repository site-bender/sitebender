import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

export type PreventionIndicationType = "PreventionIndication"

export interface PreventionIndicationProps {
	"@type"?: PreventionIndicationType
}

type PreventionIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& PreventionIndicationProps

export default PreventionIndication
