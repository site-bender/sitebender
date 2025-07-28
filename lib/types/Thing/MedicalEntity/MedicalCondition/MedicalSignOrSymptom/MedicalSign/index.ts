import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type PhysicalExam from "../../../MedicalProcedure/PhysicalExam/index.ts"
import type MedicalTest from "../../../MedicalTest/index.ts"
import type { MedicalConditionProps } from "../../index.ts"
import type { MedicalSignOrSymptomProps } from "../index.ts"

import PhysicalExamComponent from "../../../../../../components/Thing/MedicalEntity/MedicalProcedure/PhysicalExam/index.ts"
import MedicalTestComponent from "../../../../../../components/Thing/MedicalEntity/MedicalTest/index.ts"

export interface MedicalSignProps {
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
