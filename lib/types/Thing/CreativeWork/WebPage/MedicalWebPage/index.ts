import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"
import type MedicalAudience from "../../../Intangible/Audience/MedicalAudience/index.ts"
import type MedicalAudienceType from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalAudienceType/index.ts"

import MedicalWebPageComponent from "../../../../../../components/Thing/CreativeWork/WebPage/MedicalWebPage/index.tsx"

export interface MedicalWebPageProps {
	aspect?: Text
	medicalAudience?: MedicalAudience | MedicalAudienceType
}

type MedicalWebPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& MedicalWebPageProps

export default MedicalWebPage
