import type { Date, Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type Brand from "../Intangible/Brand/index.ts"
import type Certification from "../CreativeWork/Certification/index.ts"
import type ContactPoint from "../Intangible/StructuredValue/ContactPoint/index.ts"
import type Country from "../Place/AdministrativeArea/Country/index.ts"
import type CreativeWork from "../CreativeWork/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type Distance from "../Intangible/Quantity/Distance/index.ts"
import type EducationalOccupationalCredential from "../CreativeWork/EducationalOccupationalCredential/index.ts"
import type EducationalOrganization from "../Organization/EducationalOrganization/index.ts"
import type Event from "../Event/index.ts"
import type GenderType from "../Intangible/Enumeration/GenderType/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type InteractionCounter from "../Intangible/StructuredValue/InteractionCounter/index.ts"
import type Language from "../Intangible/Language/index.ts"
import type Mass from "../Intangible/Quantity/Mass/index.ts"
import type MemberProgramTier from "../Intangible/MemberProgramTier/index.ts"
import type MonetaryAmount from "../Intangible/StructuredValue/MonetaryAmount/index.ts"
import type Occupation from "../Intangible/Occupation/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type OfferCatalog from "../Intangible/ItemList/OfferCatalog/index.ts"
import type Organization from "../Organization/index.ts"
import type OwnershipInfo from "../Intangible/StructuredValue/OwnershipInfo/index.ts"
import type Place from "../Place/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type PriceSpecification from "../Intangible/StructuredValue/PriceSpecification/index.ts"
import type Product from "../Product/index.ts"
import type ProgramMembership from "../Intangible/ProgramMembership/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type StructuredValue from "../Intangible/StructuredValue/index.ts"

import PersonComponent from "../../../../components/Thing/Person/index.tsx"

export interface PersonProps {
	additionalName?: Text
	address?: PostalAddress | Text
	affiliation?: Organization
	agentInteractionStatistic?: InteractionCounter
	alumniOf?: EducationalOrganization | Organization
	award?: Text
	awards?: Text
	birthDate?: Date
	birthPlace?: Place
	brand?: Brand | Organization
	callSign?: Text
	children?: Person
	colleague?: Person | URL
	colleagues?: Person
	contactPoint?: ContactPoint
	contactPoints?: ContactPoint
	deathDate?: Date
	deathPlace?: Place
	duns?: Text
	email?: Text
	familyName?: Text
	faxNumber?: Text
	follows?: Person
	funder?: Organization | Person
	funding?: Grant
	gender?: GenderType | Text
	givenName?: Text
	globalLocationNumber?: Text
	hasCertification?: Certification
	hasCredential?: EducationalOccupationalCredential
	hasOccupation?: Occupation
	hasOfferCatalog?: OfferCatalog
	hasPOS?: Place
	height?: Distance | QuantitativeValue
	homeLocation?: ContactPoint | Place
	honorificPrefix?: Text
	honorificSuffix?: Text
	interactionStatistic?: InteractionCounter
	isicV4?: Text
	jobTitle?: DefinedTerm | Text
	knows?: Person
	knowsAbout?: Text | Thing | URL
	knowsLanguage?: Language | Text
	makesOffer?: Offer
	memberOf?: MemberProgramTier | Organization | ProgramMembership
	naics?: Text
	nationality?: Country
	netWorth?: MonetaryAmount | PriceSpecification
	owns?: OwnershipInfo | Product
	parent?: Person
	parents?: Person
	performerIn?: Event
	pronouns?: DefinedTerm | StructuredValue | Text
	publishingPrinciples?: CreativeWork | URL
	relatedTo?: Person
	seeks?: Demand
	sibling?: Person
	siblings?: Person
	skills?: DefinedTerm | Text
	sponsor?: Organization | Person
	spouse?: Person
	taxID?: Text
	telephone?: Text
	vatID?: Text
	weight?: Mass | QuantitativeValue
	workLocation?: ContactPoint | Place
	worksFor?: Organization
}

type Person =
	& Thing
	& PersonProps

export default Person
