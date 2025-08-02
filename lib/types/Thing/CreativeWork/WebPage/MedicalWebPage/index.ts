import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MedicalAudience from "../../../Intangible/Audience/MedicalAudience/index.ts"
import type MedicalAudienceType from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalAudienceType/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import MedicalAudienceComponent from "../../../../../components/Thing/Intangible/Audience/MedicalAudience/index.ts"
import MedicalAudienceTypeComponent from "../../../../../components/Thing/Intangible/Enumeration/MedicalEnumeration/MedicalAudienceType/index.ts"

export type MedicalWebPageType = "MedicalWebPage"

export interface MedicalWebPageProps {
	"@type"?: MedicalWebPageType
	aspect?: Text
	medicalAudience?:
		| MedicalAudience
		| MedicalAudienceType
		| ReturnType<typeof MedicalAudienceComponent>
		| ReturnType<typeof MedicalAudienceTypeComponent>
}

type MedicalWebPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& MedicalWebPageProps

export default MedicalWebPage
