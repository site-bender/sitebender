import { Date, Text } from "../../../DataType/index.ts"
import MedicalEvidenceLevel from "../../Intangible/Enumeration/MedicalEnumeration/MedicalEvidenceLevel/index.ts"
import MedicalEntity from "../index.ts"

export default interface MedicalGuideline extends MedicalEntity {
	/** Strength of evidence of the data used to formulate the guideline (enumerated). */
	evidenceLevel?: MedicalEvidenceLevel
	/** Source of the data used to formulate the guidance, e.g. RCT, consensus opinion, etc. */
	evidenceOrigin?: Text
	/** Date on which this guideline's recommendation was made. */
	guidelineDate?: Date
	/** The medical conditions, treatments, etc. that are the subject of the guideline. */
	guidelineSubject?: MedicalEntity
}
