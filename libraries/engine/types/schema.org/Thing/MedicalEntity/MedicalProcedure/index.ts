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

import { EventStatusType as EventStatusTypeComponent } from "../../../../../components/index.tsx"
import { MedicalEntity as MedicalEntityComponent } from "../../../../../components/index.tsx"
import { MedicalProcedureType as MedicalProcedureTypeComponent } from "../../../../../components/index.tsx"
import { MedicalStudyStatus as MedicalStudyStatusComponent } from "../../../../../components/index.tsx"

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
