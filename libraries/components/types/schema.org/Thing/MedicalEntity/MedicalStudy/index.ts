import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type { MedicalObservationalStudyType } from "./MedicalObservationalStudy/index.ts"
import type { MedicalTrialType } from "./MedicalTrial/index.ts"

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"
import { EventStatusType as EventStatusTypeComponent } from "../../../../../components/index.tsx"
import { MedicalCondition as MedicalConditionComponent } from "../../../../../components/index.tsx"
import { MedicalEntity as MedicalEntityComponent } from "../../../../../components/index.tsx"
import { MedicalStudyStatus as MedicalStudyStatusComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"

export type MedicalStudyType =
	| "MedicalStudy"
	| MedicalTrialType
	| MedicalObservationalStudyType

export interface MedicalStudyProps {
	"@type"?: MedicalStudyType
	healthCondition?:
		| MedicalCondition
		| ReturnType<typeof MedicalConditionComponent>
	sponsor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	status?:
		| EventStatusType
		| MedicalStudyStatus
		| Text
		| ReturnType<typeof EventStatusTypeComponent>
		| ReturnType<typeof MedicalStudyStatusComponent>
	studyLocation?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
	studySubject?: MedicalEntity | ReturnType<typeof MedicalEntityComponent>
}

type MedicalStudy = Thing & MedicalEntityProps & MedicalStudyProps

export default MedicalStudy
