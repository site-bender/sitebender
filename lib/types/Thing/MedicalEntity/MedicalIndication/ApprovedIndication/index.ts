import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

export interface ApprovedIndicationProps {}

type ApprovedIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& ApprovedIndicationProps

export default ApprovedIndication
