import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"
import type OccupationalExperienceRequirements from "../OccupationalExperienceRequirements/index.ts"

export interface OccupationProps {
	educationRequirements?: EducationalOccupationalCredential | Text
	estimatedSalary?: MonetaryAmount | MonetaryAmountDistribution | Number
	experienceRequirements?: OccupationalExperienceRequirements | Text
	occupationalCategory?: CategoryCode | Text
	occupationLocation?: AdministrativeArea
	qualifications?: EducationalOccupationalCredential | Text
	responsibilities?: Text
	skills?: DefinedTerm | Text
}

type Occupation =
	& Thing
	& IntangibleProps
	& OccupationProps

export default Occupation
