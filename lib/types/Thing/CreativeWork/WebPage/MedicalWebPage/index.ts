import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MedicalAudience from "../../../Intangible/Audience/MedicalAudience/index.ts"
import type MedicalAudienceType from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalAudienceType/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export interface MedicalWebPageProps {
	/** An aspect of medical practice that is considered on the page, such as 'diagnosis', 'treatment', 'causes', 'prognosis', 'etiology', 'epidemiology', etc. */
	aspect?: Text
	/** Medical audience for page. */
	medicalAudience?: MedicalAudienceType | MedicalAudience
}

type MedicalWebPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& MedicalWebPageProps

export default MedicalWebPage
