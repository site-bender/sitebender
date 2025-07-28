import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type EventStatusType from "../../Intangible/Enumeration/StatusEnumeration/EventStatusType/index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalEntity from "../index.ts"
import type MedicalStudyStatus from "../../Intangible/Enumeration/MedicalEnumeration/MedicalStudyStatus/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

import MedicalStudyComponent from "../../../../../components/Thing/MedicalEntity/MedicalStudy/index.tsx"

export interface MedicalStudyProps {
	healthCondition?: MedicalCondition
	sponsor?: Organization | Person
	status?: EventStatusType | MedicalStudyStatus | Text
	studyLocation?: AdministrativeArea
	studySubject?: MedicalEntity
}

type MedicalStudy =
	& Thing
	& MedicalEntityProps
	& MedicalStudyProps

export default MedicalStudy
