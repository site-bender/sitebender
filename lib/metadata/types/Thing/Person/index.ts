import type { Date, Text } from "../../DataType/index.ts"
import type { CreativeWork } from "../CreativeWork/index.ts"
import type { Event } from "../Event/index.ts"
import type {
	Certification,
	ContactPoint,
	Country,
	Demand,
	Distance,
	EducationalOccupationalCredential,
	EducationalOrganization,
	GenderType,
	Grant,
	InteractionCounter,
	Mass,
	MemberProgramTier,
	MonetaryAmount,
	Occupation,
	Offer,
	OfferCatalog,
	OwnershipInfo,
	PostalAddress,
	PriceSpecification,
	ProgramMembership,
	QuantitativeValue,
	Thing,
	URL,
} from "../index.ts"
import type { Brand } from "../Intangible/Brand/index.ts"
import type { DefinedTerm } from "../Intangible/DefinedTerm/index.ts"
import type { Language } from "../Intangible/Language/index.ts"
import type { StructuredValue } from "../Intangible/StructuredValue/index.ts"
import type { Organization } from "../Organization/index.ts"
import type { Place } from "../Place/index.ts"
import type { Product } from "../Product/index.ts"

// Person interface - extends Thing
export interface Person extends Thing {
	additionalName?: Text
	address?: PostalAddress | Text
	affiliation?: Organization
	agentInteractionStatistic?: InteractionCounter
	alumniOf?: EducationalOrganization | Organization
	award?: Text
	birthDate?: Date
	birthPlace?: Place
	brand?: Brand | Organization
	callSign?: Text
	children?: Person
	colleague?: Person | URL
	contactPoint?: ContactPoint
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
	performerIn?: Event
	pronouns?: DefinedTerm | StructuredValue | Text
	publishingPrinciples?: CreativeWork | URL
	relatedTo?: Person
	seeks?: Demand
	sibling?: Person
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
