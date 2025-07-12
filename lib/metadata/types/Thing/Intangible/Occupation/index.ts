import type { Number, Text } from "../../../DataType/index.ts"
import type { EducationalOccupationalCredential } from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import type {
	AdministrativeArea,
	CategoryCode,
	MonetaryAmount,
	MonetaryAmountDistribution,
	OccupationalExperienceRequirements,
} from "../../index.ts"
import type { DefinedTerm } from "../DefinedTerm/index.ts"
import type { Intangible } from "../index.ts"

// Occupation interface - extends Intangible
// A profession, may involve prolonged training and/or a formal qualification.
export interface Occupation extends Intangible {
	educationRequirements?: EducationalOccupationalCredential | Text
	estimatedSalary?: MonetaryAmount | MonetaryAmountDistribution | Number
	experienceRequirements?: OccupationalExperienceRequirements | Text
	occupationLocation?: AdministrativeArea
	occupationalCategory?: CategoryCode | Text
	qualifications?: EducationalOccupationalCredential | Text
	responsibilities?: Text
	skills?: DefinedTerm | Text
}
