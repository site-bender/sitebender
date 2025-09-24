import type Thing from "../../../index.ts"
import type { EnumerationProps } from "../../../Intangible/Enumeration/index.ts"
import type { MedicalEnumerationProps } from "../../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalProcedureProps } from "../index.ts"

export type PhysicalExamType = "PhysicalExam"

export interface PhysicalExamProps {
	"@type"?: PhysicalExamType
}

type PhysicalExam =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalEntityProps
	& MedicalProcedureProps
	& PhysicalExamProps

export default PhysicalExam
