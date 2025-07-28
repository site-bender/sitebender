import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

import ApprovedIndicationComponent from "../../../../../../components/Thing/MedicalEntity/MedicalIndication/ApprovedIndication/index.tsx"

export interface ApprovedIndicationProps {
}

type ApprovedIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& ApprovedIndicationProps

export default ApprovedIndication
