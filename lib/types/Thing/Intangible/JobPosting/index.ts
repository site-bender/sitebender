import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"
import type Occupation from "../Occupation/index.ts"
import type OccupationalExperienceRequirements from "../OccupationalExperienceRequirements/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Place from "../../Place/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"

import JobPostingComponent from "../../../../../components/Thing/Intangible/JobPosting/index.tsx"

export interface JobPostingProps {
	applicantLocationRequirements?: AdministrativeArea
	applicationContact?: ContactPoint
	baseSalary?: MonetaryAmount | Number | PriceSpecification
	benefits?: Text
	datePosted?: Date | DateTime
	directApply?: Boolean
	educationRequirements?: EducationalOccupationalCredential | Text
	eligibilityToWorkRequirement?: Text
	employerOverview?: Text
	employmentType?: Text
	employmentUnit?: Organization
	estimatedSalary?: MonetaryAmount | MonetaryAmountDistribution | Number
	experienceInPlaceOfEducation?: Boolean
	experienceRequirements?: OccupationalExperienceRequirements | Text
	hiringOrganization?: Organization | Person
	incentiveCompensation?: Text
	incentives?: Text
	industry?: DefinedTerm | Text
	jobBenefits?: Text
	jobImmediateStart?: Boolean
	jobLocation?: Place
	jobLocationType?: Text
	jobStartDate?: Date | Text
	occupationalCategory?: CategoryCode | Text
	physicalRequirement?: DefinedTerm | Text | URL
	qualifications?: EducationalOccupationalCredential | Text
	relevantOccupation?: Occupation
	responsibilities?: Text
	salaryCurrency?: Text
	securityClearanceRequirement?: Text | URL
	sensoryRequirement?: DefinedTerm | Text | URL
	skills?: DefinedTerm | Text
	specialCommitments?: Text
	title?: Text
	totalJobOpenings?: Integer
	validThrough?: Date | DateTime
	workHours?: Text
}

type JobPosting =
	& Thing
	& IntangibleProps
	& JobPostingProps

export default JobPosting
