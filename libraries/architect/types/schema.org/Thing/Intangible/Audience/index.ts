import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { IntangibleProps } from "../index.ts"
import type { BusinessAudienceType } from "./BusinessAudience/index.ts"
import type { EducationalAudienceType } from "./EducationalAudience/index.ts"
import type { MedicalAudienceType } from "./MedicalAudience/index.ts"
import type { PeopleAudienceType } from "./PeopleAudience/index.ts"
import type { ResearcherType } from "./Researcher/index.ts"

import AdministrativeAreaComponent from "../../../../../../codewright/src/define/Thing/Place/AdministrativeArea/index.tsx"

export type AudienceType =
	| "Audience"
	| PeopleAudienceType
	| BusinessAudienceType
	| MedicalAudienceType
	| ResearcherType
	| EducationalAudienceType

export interface AudienceProps {
	"@type"?: AudienceType
	audienceType?: Text
	geographicArea?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
}

type Audience = Thing & IntangibleProps & AudienceProps

export default Audience
