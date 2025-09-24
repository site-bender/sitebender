import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type PhysicalExam from "../../../MedicalProcedure/PhysicalExam/index.ts"
import type MedicalTest from "../../../MedicalTest/index.ts"
import type { MedicalConditionProps } from "../../index.ts"
import type { MedicalSignOrSymptomProps } from "../index.ts"
import type { VitalSignType } from "./VitalSign/index.ts"

import MedicalTestComponent from "../../../../../../../../codewright/src/define/Thing/MedicalEntity/MedicalTest/index.tsx"
import { PhysicalExam as PhysicalExamComponent } from "../../../../../../../codewright/index.tsx"

export type MedicalSignType = "MedicalSign" | VitalSignType

export interface MedicalSignProps {
	"@type"?: MedicalSignType
	identifyingExam?: PhysicalExam | ReturnType<typeof PhysicalExamComponent>
	identifyingTest?: MedicalTest | ReturnType<typeof MedicalTestComponent>
}

type MedicalSign =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& MedicalSignOrSymptomProps
	& MedicalSignProps

export default MedicalSign
