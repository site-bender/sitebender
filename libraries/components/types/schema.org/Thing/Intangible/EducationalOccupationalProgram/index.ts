import type {
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Course from "../../CreativeWork/Course/index.ts"
import type EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AlignmentObject from "../AlignmentObject/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type Demand from "../Demand/index.ts"
import type DayOfWeek from "../Enumeration/DayOfWeek/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type StructuredValue from "../StructuredValue/index.ts"
import type MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"
import type { WorkBasedProgramType } from "./WorkBasedProgram/index.ts"

import { AlignmentObject as AlignmentObjectComponent } from "../../../../../components/index.tsx"
import { CategoryCode as CategoryCodeComponent } from "../../../../../components/index.tsx"
import { Course as CourseComponent } from "../../../../../components/index.tsx"
import { DayOfWeek as DayOfWeekComponent } from "../../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { Demand as DemandComponent } from "../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { EducationalOccupationalCredential as EducationalOccupationalCredentialComponent } from "../../../../../components/index.tsx"
import { MonetaryAmountDistribution as MonetaryAmountDistributionComponent } from "../../../../../components/index.tsx"
import { Offer as OfferComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { StructuredValue as StructuredValueComponent } from "../../../../../components/index.tsx"

export type EducationalOccupationalProgramType =
	| "EducationalOccupationalProgram"
	| WorkBasedProgramType

export interface EducationalOccupationalProgramProps {
	"@type"?: EducationalOccupationalProgramType
	applicationDeadline?: Date | Text
	applicationStartDate?: Date
	dayOfWeek?: DayOfWeek | ReturnType<typeof DayOfWeekComponent>
	educationalCredentialAwarded?:
		| EducationalOccupationalCredential
		| Text
		| URL
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	educationalProgramMode?: Text | URL
	endDate?: Date | DateTime
	financialAidEligible?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
	hasCourse?: Course | ReturnType<typeof CourseComponent>
	maximumEnrollment?: Integer
	numberOfCredits?:
		| Integer
		| StructuredValue
		| ReturnType<typeof StructuredValueComponent>
	occupationalCategory?:
		| CategoryCode
		| Text
		| ReturnType<typeof CategoryCodeComponent>
	occupationalCredentialAwarded?:
		| EducationalOccupationalCredential
		| Text
		| URL
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	offers?:
		| Demand
		| Offer
		| ReturnType<typeof DemandComponent>
		| ReturnType<typeof OfferComponent>
	programPrerequisites?:
		| AlignmentObject
		| Course
		| EducationalOccupationalCredential
		| Text
		| ReturnType<typeof AlignmentObjectComponent>
		| ReturnType<typeof CourseComponent>
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	programType?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	salaryUponCompletion?:
		| MonetaryAmountDistribution
		| ReturnType<typeof MonetaryAmountDistributionComponent>
	startDate?: Date | DateTime
	termDuration?: Duration | ReturnType<typeof DurationComponent>
	termsPerYear?: Number
	timeOfDay?: Text
	timeToComplete?: Duration | ReturnType<typeof DurationComponent>
	trainingSalary?:
		| MonetaryAmountDistribution
		| ReturnType<typeof MonetaryAmountDistributionComponent>
	typicalCreditsPerTerm?:
		| Integer
		| StructuredValue
		| ReturnType<typeof StructuredValueComponent>
}

type EducationalOccupationalProgram =
	& Thing
	& IntangibleProps
	& EducationalOccupationalProgramProps

export default EducationalOccupationalProgram
