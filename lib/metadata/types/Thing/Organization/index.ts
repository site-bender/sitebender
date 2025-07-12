import type { Date, Text } from "../../DataType/index.ts"
import type { Article } from "../CreativeWork/Article/index.ts"
import type { CreativeWork } from "../CreativeWork/index.ts"
import type { Event } from "../Event/index.ts"
import type {
	AdministrativeArea,
	AggregateRating,
	Certification,
	ContactPoint,
	Demand,
	EducationalOccupationalCredential,
	GeoShape,
	Grant,
	ImageObject,
	InteractionCounter,
	LoanOrCredit,
	MemberProgramTier,
	MerchantReturnPolicy,
	NonprofitType,
	Offer,
	OfferCatalog,
	OpeningHoursSpecification,
	OwnershipInfo,
	PaymentMethod,
	PostalAddress,
	ProductReturnPolicy,
	ProgramMembership,
	Review,
	Thing,
	URL,
	VirtualLocation,
} from "../index.ts"
import type { Brand } from "../Intangible/Brand/index.ts"
import type { DefinedTerm } from "../Intangible/DefinedTerm/index.ts"
import type { Language } from "../Intangible/Language/index.ts"
import type { QuantitativeValue } from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { Person } from "../Person/index.ts"
import type { Place } from "../Place/index.ts"
import type { Product } from "../Product/index.ts"

// Organization interface - extends Thing
export interface Organization extends Thing {
	acceptedPaymentMethod?: LoanOrCredit | PaymentMethod | Text
	actionableFeedbackPolicy?: CreativeWork | URL
	address?: PostalAddress | Text
	agentInteractionStatistic?: InteractionCounter
	aggregateRating?: AggregateRating
	alumni?: Person
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	award?: Text
	brand?: Brand | Organization
	companyRegistration?: Certification
	contactPoint?: ContactPoint
	correctionsPolicy?: CreativeWork | URL
	department?: Organization
	dissolutionDate?: Date
	diversityPolicy?: CreativeWork | URL
	diversityStaffingReport?: Article | URL
	duns?: Text
	email?: Text
	employee?: Person
	event?: Event
	faxNumber?: Text
	founder?: Person
	foundingDate?: Date
	foundingLocation?: Place
	funder?: Organization | Person
	funding?: Grant
	globalLocationNumber?: Text
	hasCertification?: Certification
	hasCredential?: EducationalOccupationalCredential
	hasMerchantReturnPolicy?: MerchantReturnPolicy
	hasOfferCatalog?: OfferCatalog
	hasPOS?: Place
	hasProductReturnPolicy?: ProductReturnPolicy
	interactionStatistic?: InteractionCounter
	isicV4?: Text
	iso6523Code?: Text
	keywords?: DefinedTerm | Text | URL
	knowsAbout?: Text | Thing | URL
	knowsLanguage?: Language | Text
	legalName?: Text
	leiCode?: Text
	location?: Place | PostalAddress | Text | VirtualLocation
	logo?: ImageObject | URL
	makesOffer?: Offer
	member?: Organization | Person
	memberOf?: MemberProgramTier | Organization | ProgramMembership
	naics?: Text
	nonprofitStatus?: NonprofitType
	numberOfEmployees?: QuantitativeValue
	openingHours?: Text
	openingHoursSpecification?: OpeningHoursSpecification
	owns?: OwnershipInfo | Product
	parentOrganization?: Organization
	publishingPrinciples?: CreativeWork | URL
	review?: Review
	seeks?: Demand
	serviceArea?: AdministrativeArea | GeoShape | Place
	slogan?: Text
	sponsor?: Organization | Person
	subOrganization?: Organization
	taxID?: Text
	telephone?: Text
	unnamedSourcesPolicy?: CreativeWork | URL
	vatID?: Text
}
