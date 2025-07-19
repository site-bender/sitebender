import type { Date, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MedicalEvidenceLevel from "../../Intangible/Enumeration/MedicalEnumeration/MedicalEvidenceLevel/index.ts"
import type MedicalEntity from "../index.ts"
import type { MedicalEntityProps } from "../index.ts"

export interface MedicalGuidelineProps {
	/** Strength of evidence of the data used to formulate the guideline (enumerated). */
	evidenceLevel?: MedicalEvidenceLevel
	/** Source of the data used to formulate the guidance, e.g. RCT, consensus opinion, etc. */
	evidenceOrigin?: Text
	/** Date on which this guideline's recommendation was made. */
	guidelineDate?: Date
	/** The medical conditions, treatments, etc. that are the subject of the guideline. */
	guidelineSubject?: MedicalEntity
}

type MedicalGuideline =
	& Thing
	& MedicalEntityProps
	& MedicalGuidelineProps

export default MedicalGuideline
