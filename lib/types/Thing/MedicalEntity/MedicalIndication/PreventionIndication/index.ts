import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIndicationProps } from "../index.ts"

import PreventionIndicationComponent from "../../../../../../components/Thing/MedicalEntity/MedicalIndication/PreventionIndication/index.tsx"

export interface PreventionIndicationProps {
}

type PreventionIndication =
	& Thing
	& MedicalEntityProps
	& MedicalIndicationProps
	& PreventionIndicationProps

export default PreventionIndication
