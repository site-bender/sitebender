import { Text } from "../../../../DataType/index.ts"
import MedicalAudience from "../../../Intangible/Audience/MedicalAudience/index.ts"
import MedicalAudienceType from "../../../Intangible/Enumeration/MedicalEnumeration/MedicalAudienceType/index.ts"
import WebPage from "../index.ts"

export default interface MedicalWebPage extends WebPage {
	/** An aspect of medical practice that is considered on the page, such as 'diagnosis', 'treatment', 'causes', 'prognosis', 'etiology', 'epidemiology', etc. */
	aspect?: Text
	/** Medical audience for page. */
	medicalAudience?: MedicalAudienceType | MedicalAudience
}
