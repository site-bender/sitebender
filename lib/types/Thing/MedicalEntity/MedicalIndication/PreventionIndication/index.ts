import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

export interface PreventionIndicationProps {
	"@type"?: "PreventionIndication"}

type PreventionIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& PreventionIndicationProps

export default PreventionIndication
