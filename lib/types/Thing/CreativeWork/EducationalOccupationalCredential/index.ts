import type { Text, URL } from "../../../DataType/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type CreativeWork from "../index.ts"

export default interface EducationalOccupationalCredential
	extends CreativeWork {
	/** Knowledge, skill, ability or personal attribute that must be demonstrated by a person or other entity in order to do something such as earn an Educational Occupational Credential or understand a LearningResource. */
	competencyRequired?: URL | Text | DefinedTerm
	/** The category or type of credential being described, for example "degree”, “certificate”, “badge”, or more specific term. */
	credentialCategory?: Text | URL | DefinedTerm
	/** The level in terms of progression through an educational or training context. Examples of educational levels include 'beginner', 'intermediate' or 'advanced', and formal sets of level indicators. */
	educationalLevel?: URL | Text | DefinedTerm
	/** An organization that acknowledges the validity, value or utility of a credential. Note: recognition may include a process of quality assurance or accreditation. */
	recognizedBy?: Organization
	/** The duration of validity of a permit or similar thing. */
	validFor?: Duration
	/** The geographic area where the item is valid. Applies for example to a [[Permit]], a [[Certification]], or an [[EducationalOccupationalCredential]]. */
	validIn?: AdministrativeArea
}
