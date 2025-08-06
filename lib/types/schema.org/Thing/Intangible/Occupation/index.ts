import type { Number, Text } from "../../../DataType/index.ts"
import type EducationalOccupationalCredential from "../../CreativeWork/EducationalOccupationalCredential/index.ts"
import type Thing from "../../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type { IntangibleProps } from "../index.ts"
import type OccupationalExperienceRequirements from "../OccupationalExperienceRequirements/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type MonetaryAmountDistribution from "../StructuredValue/QuantitativeValueDistribution/MonetaryAmountDistribution/index.ts"

import { EducationalOccupationalCredential as EducationalOccupationalCredentialComponent } from "../../../../../components/index.tsx"
import { CategoryCode as CategoryCodeComponent } from "../../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { OccupationalExperienceRequirements as OccupationalExperienceRequirementsComponent } from "../../../../../components/index.tsx"
import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../components/index.tsx"
import { MonetaryAmountDistribution as MonetaryAmountDistributionComponent } from "../../../../../components/index.tsx"
import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"

export type OccupationType = "Occupation"

export interface OccupationProps {
	"@type"?: OccupationType
	educationRequirements?:
		| EducationalOccupationalCredential
		| Text
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	estimatedSalary?:
		| MonetaryAmount
		| MonetaryAmountDistribution
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof MonetaryAmountDistributionComponent>
	experienceRequirements?:
		| OccupationalExperienceRequirements
		| Text
		| ReturnType<typeof OccupationalExperienceRequirementsComponent>
	occupationalCategory?:
		| CategoryCode
		| Text
		| ReturnType<typeof CategoryCodeComponent>
	occupationLocation?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
	qualifications?:
		| EducationalOccupationalCredential
		| Text
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	responsibilities?: Text
	skills?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
}

type Occupation = Thing & IntangibleProps & OccupationProps

export default Occupation
