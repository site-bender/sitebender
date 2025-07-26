import type { Date, Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type AboutPage from "../CreativeWork/WebPage/AboutPage/index.ts"
import type AdministrativeArea from "../Place/AdministrativeArea/index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type Article from "../CreativeWork/Article/index.ts"
import type Brand from "../Intangible/Brand/index.ts"
import type Certification from "../CreativeWork/Certification/index.ts"
import type ContactPoint from "../Intangible/StructuredValue/ContactPoint/index.ts"
import type CreativeWork from "../CreativeWork/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type EducationalOccupationalCredential from "../CreativeWork/EducationalOccupationalCredential/index.ts"
import type Event from "../Event/index.ts"
import type GeoShape from "../Intangible/StructuredValue/GeoShape/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type ImageObject from "../CreativeWork/MediaObject/ImageObject/index.ts"
import type InteractionCounter from "../Intangible/StructuredValue/InteractionCounter/index.ts"
import type Language from "../Intangible/Language/index.ts"
import type LoanOrCredit from "../Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"
import type MemberProgram from "../Intangible/MemberProgram/index.ts"
import type MemberProgramTier from "../Intangible/MemberProgramTier/index.ts"
import type MerchantReturnPolicy from "../Intangible/MerchantReturnPolicy/index.ts"
import type NonprofitType from "../Intangible/Enumeration/NonprofitType/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type OfferCatalog from "../Intangible/ItemList/OfferCatalog/index.ts"
import type OwnershipInfo from "../Intangible/StructuredValue/OwnershipInfo/index.ts"
import type PaymentMethod from "../Intangible/PaymentMethod/index.ts"
import type Person from "../Person/index.ts"
import type Place from "../Place/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type Product from "../Product/index.ts"
import type ProgramMembership from "../Intangible/ProgramMembership/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Review from "../CreativeWork/Review/index.ts"
import type ShippingService from "../Intangible/StructuredValue/ShippingService/index.ts"
import type VirtualLocation from "../Intangible/VirtualLocation/index.ts"

export interface OrganizationProps {
	acceptedPaymentMethod?: LoanOrCredit | PaymentMethod | Text
	actionableFeedbackPolicy?: CreativeWork | URL
	address?: PostalAddress | Text
	agentInteractionStatistic?: InteractionCounter
	aggregateRating?: AggregateRating
	alumni?: Person
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	award?: Text
	awards?: Text
	brand?: Brand | Organization
	companyRegistration?: Certification
	contactPoint?: ContactPoint
	contactPoints?: ContactPoint
	correctionsPolicy?: CreativeWork | URL
	department?: Organization
	dissolutionDate?: Date
	diversityPolicy?: CreativeWork | URL
	diversityStaffingReport?: Article | URL
	duns?: Text
	email?: Text
	employee?: Person
	employees?: Person
	ethicsPolicy?: CreativeWork | URL
	event?: Event
	events?: Event
	faxNumber?: Text
	founder?: Organization | Person
	founders?: Person
	foundingDate?: Date
	foundingLocation?: Place
	funder?: Organization | Person
	funding?: Grant
	globalLocationNumber?: Text
	hasCertification?: Certification
	hasCredential?: EducationalOccupationalCredential
	hasGS1DigitalLink?: URL
	hasMemberProgram?: MemberProgram
	hasMerchantReturnPolicy?: MerchantReturnPolicy
	hasOfferCatalog?: OfferCatalog
	hasPOS?: Place
	hasProductReturnPolicy?: MerchantReturnPolicy
	hasShippingService?: ShippingService
	interactionStatistic?: InteractionCounter
	isicV4?: Text
	iso6523Code?: Text
	keywords?: DefinedTerm | Text | URL
	knowsAbout?: Text | Thing | URL
	knowsLanguage?: Language | Text
	legalAddress?: PostalAddress
	legalName?: Text
	legalRepresentative?: Person
	leiCode?: Text
	location?: Place | PostalAddress | Text | VirtualLocation
	logo?: ImageObject | URL
	makesOffer?: Offer
	member?: Organization | Person
	memberOf?: MemberProgramTier | Organization | ProgramMembership
	members?: Organization | Person
	naics?: Text
	nonprofitStatus?: NonprofitType
	numberOfEmployees?: QuantitativeValue
	ownershipFundingInfo?: AboutPage | CreativeWork | Text | URL
	owns?: OwnershipInfo | Product
	parentOrganization?: Organization
	publishingPrinciples?: CreativeWork | URL
	review?: Review
	reviews?: Review
	seeks?: Demand
	serviceArea?: AdministrativeArea | GeoShape | Place
	skills?: DefinedTerm | Text
	slogan?: Text
	sponsor?: Organization | Person
	subOrganization?: Organization
	taxID?: Text
	telephone?: Text
	unnamedSourcesPolicy?: CreativeWork | URL
	vatID?: Text
}

type Organization =
	& Thing
	& OrganizationProps

export default Organization
