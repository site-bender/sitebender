import type {
	Boolean,
	Date,
	DateTime,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Place from "../../Place/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Occupation from "../Occupation/index.ts"
import type OccupationalExperienceRequirements from "../OccupationalExperienceRequirements/index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"
import { CategoryCode as CategoryCodeComponent } from "../../../../../components/index.tsx"
import { ContactPoint as ContactPointComponent } from "../../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { EducationalOccupationalCredential as EducationalOccupationalCredentialComponent } from "../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../components/index.tsx"
import { MonetaryAmountDistribution as MonetaryAmountDistributionComponent } from "../../../../../components/index.tsx"
import { Occupation as OccupationComponent } from "../../../../../components/index.tsx"
import { OccupationalExperienceRequirements as OccupationalExperienceRequirementsComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../components/index.tsx"
import { PriceSpecification as PriceSpecificationComponent } from "../../../../../components/index.tsx"

export type JobPostingType = "JobPosting"

export interface JobPostingProps {
	"@type"?: JobPostingType
	applicantLocationRequirements?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
	applicationContact?: ContactPoint | ReturnType<typeof ContactPointComponent>
	baseSalary?:
		| MonetaryAmount
		| Number
		| PriceSpecification
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof PriceSpecificationComponent>
	benefits?: Text
	datePosted?: Date | DateTime
	directApply?: Boolean
	educationRequirements?:
		| EducationalOccupationalCredential
		| Text
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	eligibilityToWorkRequirement?: Text
	employerOverview?: Text
	employmentType?: Text
	employmentUnit?: Organization | ReturnType<typeof OrganizationComponent>
	estimatedSalary?:
		| MonetaryAmount
		| MonetaryAmountDistribution
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof MonetaryAmountDistributionComponent>
	experienceInPlaceOfEducation?: Boolean
	experienceRequirements?:
		| OccupationalExperienceRequirements
		| Text
		| ReturnType<typeof OccupationalExperienceRequirementsComponent>
	hiringOrganization?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	incentiveCompensation?: Text
	incentives?: Text
	industry?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	jobBenefits?: Text
	jobImmediateStart?: Boolean
	jobLocation?: Place | ReturnType<typeof PlaceComponent>
	jobLocationType?: Text
	jobStartDate?: Date | Text
	occupationalCategory?:
		| CategoryCode
		| Text
		| ReturnType<typeof CategoryCodeComponent>
	physicalRequirement?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	qualifications?:
		| EducationalOccupationalCredential
		| Text
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	relevantOccupation?: Occupation | ReturnType<typeof OccupationComponent>
	responsibilities?: Text
	salaryCurrency?: Text
	securityClearanceRequirement?: Text | URL
	sensoryRequirement?:
		| DefinedTerm
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
	skills?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	specialCommitments?: Text
	title?: Text
	totalJobOpenings?: Integer
	validThrough?: Date | DateTime
	workHours?: Text
}

type JobPosting = Thing & IntangibleProps & JobPostingProps

export default JobPosting
