import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalProcedureTypeEnum from "../../Intangible/Enumeration/MedicalEnumeration/MedicalProcedureType/index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type { DiagnosticProcedureType } from "./DiagnosticProcedure/index.ts"
import type { PalliativeProcedureType } from "./PalliativeProcedure/index.ts"
import type { PhysicalExamType } from "./PhysicalExam/index.ts"
import type { SurgicalProcedureType } from "./SurgicalProcedure/index.ts"
import type { TherapeuticProcedureType } from "./TherapeuticProcedure/index.ts"

import MedicalProcedureTypeComponent from "../../../../../src/define/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalProcedureType/index.tsx"
import MedicalStudyStatusComponent from "../../../../../src/define/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.tsx"
import EventStatusTypeComponent from "../../../../../src/define/Thing/Intangible/Enumeration/StatusEnumeration/EventStatusType/index.tsx"
import MedicalEntityComponent from "../../../../../src/define/Thing/MedicalEntity/index.tsx"

export type MedicalProcedureType =
	| "MedicalProcedure"
	| PhysicalExamType
	| SurgicalProcedureType
	| DiagnosticProcedureType
	| TherapeuticProcedureType
	| PalliativeProcedureType

export interface MedicalProcedureProps {
	"@type"?: MedicalProcedureType
	bodyLocation?: Text
	followup?: Text
	howPerformed?: Text
	preparation?:
		| MedicalEntity
		| Text
		| ReturnType<typeof MedicalEntityComponent>
	procedureType?:
		| MedicalProcedureTypeEnum
		| ReturnType<typeof MedicalProcedureTypeComponent>
	status?:
		| EventStatusType
		| MedicalStudyStatus
		| Text
		| ReturnType<typeof EventStatusTypeComponent>
		| ReturnType<typeof MedicalStudyStatusComponent>
}

type MedicalProcedure = Thing & MedicalEntityProps & MedicalProcedureProps

export default MedicalProcedure
