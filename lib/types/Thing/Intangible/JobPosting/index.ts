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

import EducationalOccupationalCredentialComponent from "../../../../components/Thing/CreativeWork/EducationalOccupationalCredential/index.ts"
import CategoryCodeComponent from "../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"
import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import OccupationComponent from "../../../../components/Thing/Intangible/Occupation/index.ts"
import OccupationalExperienceRequirementsComponent from "../../../../components/Thing/Intangible/OccupationalExperienceRequirements/index.ts"
import ContactPointComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import MonetaryAmountComponent from "../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import PriceSpecificationComponent from "../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import MonetaryAmountDistributionComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"
import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface JobPostingProps {
	"@type"?: "JobPosting"
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
