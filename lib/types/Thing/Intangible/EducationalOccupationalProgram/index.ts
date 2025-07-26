import type {
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AlignmentObject from "../AlignmentObject/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type Course from "../../CreativeWork/Course/index.ts"
import type DayOfWeek from "../Enumeration/DayOfWeek/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type Demand from "../Demand/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import type MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"
import type Offer from "../Offer/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type StructuredValue from "../StructuredValue/index.ts"

export interface EducationalOccupationalProgramProps {
	applicationDeadline?: Date | Text
	applicationStartDate?: Date
	dayOfWeek?: DayOfWeek
	educationalCredentialAwarded?: EducationalOccupationalCredential | Text | URL
	educationalProgramMode?: Text | URL
	endDate?: Date | DateTime
	financialAidEligible?: DefinedTerm | Text
	hasCourse?: Course
	maximumEnrollment?: Integer
	numberOfCredits?: Integer | StructuredValue
	occupationalCategory?: CategoryCode | Text
	occupationalCredentialAwarded?: EducationalOccupationalCredential | Text | URL
	offers?: Demand | Offer
	programPrerequisites?:
		| AlignmentObject
		| Course
		| EducationalOccupationalCredential
		| Text
	programType?: DefinedTerm | Text
	provider?: Organization | Person
	salaryUponCompletion?: MonetaryAmountDistribution
	startDate?: Date | DateTime
	termDuration?: Duration
	termsPerYear?: Number
	timeOfDay?: Text
	timeToComplete?: Duration
	trainingSalary?: MonetaryAmountDistribution
	typicalCreditsPerTerm?: Integer | StructuredValue
}

type EducationalOccupationalProgram =
	& Thing
	& IntangibleProps
	& EducationalOccupationalProgramProps

export default EducationalOccupationalProgram
