import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type { ApprovedIndicationType } from "./ApprovedIndication/index.ts"
import type { PreventionIndicationType } from "./PreventionIndication/index.ts"
import type { TreatmentIndicationType } from "./TreatmentIndication/index.ts"

export type MedicalIndicationType =
	| "MedicalIndication"
	| TreatmentIndicationType
	| PreventionIndicationType
	| ApprovedIndicationType

export interface MedicalIndicationProps {
	"@type"?: MedicalIndicationType
}

type MedicalIndication = Thing & MedicalEntityProps & MedicalIndicationProps

export default MedicalIndication
