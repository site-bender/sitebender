import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

export type ApprovedIndicationType = "ApprovedIndication"

export interface ApprovedIndicationProps {
	"@type"?: ApprovedIndicationType
}

type ApprovedIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& ApprovedIndicationProps

export default ApprovedIndication
