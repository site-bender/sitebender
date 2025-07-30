import type { Date, Text, URL } from "../../DataType/index.ts"
import type Article from "../CreativeWork/Article/index.ts"
import type Certification from "../CreativeWork/Certification/index.ts"
import type EducationalOccupationalCredential from "../CreativeWork/EducationalOccupationalCredential/index.ts"
import type CreativeWork from "../CreativeWork/index.ts"
import type ImageObject from "../CreativeWork/MediaObject/ImageObject/index.ts"
import type Review from "../CreativeWork/Review/index.ts"
import type AboutPage from "../CreativeWork/WebPage/AboutPage/index.ts"
import type Event from "../Event/index.ts"
import type Thing from "../index.ts"
import type Brand from "../Intangible/Brand/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type NonprofitType from "../Intangible/Enumeration/NonprofitType/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type OfferCatalog from "../Intangible/ItemList/OfferCatalog/index.ts"
import type Language from "../Intangible/Language/index.ts"
import type MemberProgram from "../Intangible/MemberProgram/index.ts"
import type MemberProgramTier from "../Intangible/MemberProgramTier/index.ts"
import type MerchantReturnPolicy from "../Intangible/MerchantReturnPolicy/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type PaymentMethod from "../Intangible/PaymentMethod/index.ts"
import type ProgramMembership from "../Intangible/ProgramMembership/index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type LoanOrCredit from "../Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"
import type ContactPoint from "../Intangible/StructuredValue/ContactPoint/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type GeoShape from "../Intangible/StructuredValue/GeoShape/index.ts"
import type InteractionCounter from "../Intangible/StructuredValue/InteractionCounter/index.ts"
import type OwnershipInfo from "../Intangible/StructuredValue/OwnershipInfo/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type ShippingService from "../Intangible/StructuredValue/ShippingService/index.ts"
import type VirtualLocation from "../Intangible/VirtualLocation/index.ts"
import type Person from "../Person/index.ts"
import type AdministrativeArea from "../Place/AdministrativeArea/index.ts"
import type Place from "../Place/index.ts"
import type Product from "../Product/index.ts"

import ArticleComponent from "../../../components/Thing/CreativeWork/Article/index.ts"
import CertificationComponent from "../../../components/Thing/CreativeWork/Certification/index.ts"
import EducationalOccupationalCredentialComponent from "../../../components/Thing/CreativeWork/EducationalOccupationalCredential/index.ts"
import CreativeWorkComponent from "../../../components/Thing/CreativeWork/index.ts"
import ImageObjectComponent from "../../../components/Thing/CreativeWork/MediaObject/ImageObject/index.ts"
import ReviewComponent from "../../../components/Thing/CreativeWork/Review/index.ts"
import AboutPageComponent from "../../../components/Thing/CreativeWork/WebPage/AboutPage/index.ts"
import EventComponent from "../../../components/Thing/Event/index.ts"
import ThingComponent from "../../../components/Thing/index.ts"
import BrandComponent from "../../../components/Thing/Intangible/Brand/index.ts"
import DefinedTermComponent from "../../../components/Thing/Intangible/DefinedTerm/index.ts"
import DemandComponent from "../../../components/Thing/Intangible/Demand/index.ts"
import NonprofitTypeComponent from "../../../components/Thing/Intangible/Enumeration/NonprofitType/index.ts"
import GrantComponent from "../../../components/Thing/Intangible/Grant/index.ts"
import OfferCatalogComponent from "../../../components/Thing/Intangible/ItemList/OfferCatalog/index.ts"
import LanguageComponent from "../../../components/Thing/Intangible/Language/index.ts"
import MemberProgramComponent from "../../../components/Thing/Intangible/MemberProgram/index.ts"
import MemberProgramTierComponent from "../../../components/Thing/Intangible/MemberProgramTier/index.ts"
import MerchantReturnPolicyComponent from "../../../components/Thing/Intangible/MerchantReturnPolicy/index.ts"
import OfferComponent from "../../../components/Thing/Intangible/Offer/index.ts"
import PaymentMethodComponent from "../../../components/Thing/Intangible/PaymentMethod/index.ts"
import ProgramMembershipComponent from "../../../components/Thing/Intangible/ProgramMembership/index.ts"
import AggregateRatingComponent from "../../../components/Thing/Intangible/Rating/AggregateRating/index.ts"
import LoanOrCreditComponent from "../../../components/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"
import ContactPointComponent from "../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import PostalAddressComponent from "../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import GeoShapeComponent from "../../../components/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import InteractionCounterComponent from "../../../components/Thing/Intangible/StructuredValue/InteractionCounter/index.ts"
import OwnershipInfoComponent from "../../../components/Thing/Intangible/StructuredValue/OwnershipInfo/index.ts"
import QuantitativeValueComponent from "../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import ShippingServiceComponent from "../../../components/Thing/Intangible/StructuredValue/ShippingService/index.ts"
import VirtualLocationComponent from "../../../components/Thing/Intangible/VirtualLocation/index.ts"
import OrganizationComponent from "../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../components/Thing/Person/index.ts"
import AdministrativeAreaComponent from "../../../components/Thing/Place/AdministrativeArea/index.ts"
import PlaceComponent from "../../../components/Thing/Place/index.ts"
import ProductComponent from "../../../components/Thing/Product/index.ts"

export interface OrganizationProps {
	"@type"?: "Organization"
	acceptedPaymentMethod?:
		| LoanOrCredit
		| PaymentMethod
		| Text
		| ReturnType<typeof LoanOrCreditComponent>
		| ReturnType<typeof PaymentMethodComponent>
	actionableFeedbackPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	address?: PostalAddress | Text | ReturnType<typeof PostalAddressComponent>
	agentInteractionStatistic?:
		| InteractionCounter
		| ReturnType<typeof InteractionCounterComponent>
	aggregateRating?:
		| AggregateRating
		| ReturnType<typeof AggregateRatingComponent>
	alumni?: Person | ReturnType<typeof PersonComponent>
	areaServed?:
		| AdministrativeArea
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	award?: Text
	awards?: Text
	brand?:
		| Brand
		| Organization
		| ReturnType<typeof BrandComponent>
		| ReturnType<typeof OrganizationComponent>
	companyRegistration?:
		| Certification
		| ReturnType<typeof CertificationComponent>
	contactPoint?: ContactPoint | ReturnType<typeof ContactPointComponent>
	contactPoints?: ContactPoint | ReturnType<typeof ContactPointComponent>
	correctionsPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	department?: Organization | ReturnType<typeof OrganizationComponent>
	dissolutionDate?: Date
	diversityPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	diversityStaffingReport?: Article | URL | ReturnType<typeof ArticleComponent>
	duns?: Text
	email?: Text
	employee?: Person | ReturnType<typeof PersonComponent>
	employees?: Person | ReturnType<typeof PersonComponent>
	ethicsPolicy?: CreativeWork | URL | ReturnType<typeof CreativeWorkComponent>
	event?: Event | ReturnType<typeof EventComponent>
	events?: Event | ReturnType<typeof EventComponent>
	faxNumber?: Text
	founder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	founders?: Person | ReturnType<typeof PersonComponent>
	foundingDate?: Date
	foundingLocation?: Place | ReturnType<typeof PlaceComponent>
	funder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	funding?: Grant | ReturnType<typeof GrantComponent>
	globalLocationNumber?: Text
	hasCertification?: Certification | ReturnType<typeof CertificationComponent>
	hasCredential?:
		| EducationalOccupationalCredential
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	hasGS1DigitalLink?: URL
	hasMemberProgram?: MemberProgram | ReturnType<typeof MemberProgramComponent>
	hasMerchantReturnPolicy?:
		| MerchantReturnPolicy
		| ReturnType<typeof MerchantReturnPolicyComponent>
	hasOfferCatalog?: OfferCatalog | ReturnType<typeof OfferCatalogComponent>
	hasPOS?: Place | ReturnType<typeof PlaceComponent>
	hasProductReturnPolicy?:
		| MerchantReturnPolicy
		| ReturnType<typeof MerchantReturnPolicyComponent>
	hasShippingService?:
		| ShippingService
		| ReturnType<typeof ShippingServiceComponent>
	interactionStatistic?:
		| InteractionCounter
		| ReturnType<typeof InteractionCounterComponent>
	isicV4?: Text
	iso6523Code?: Text
	keywords?: DefinedTerm | Text | URL | ReturnType<typeof DefinedTermComponent>
	knowsAbout?: Text | Thing | URL | ReturnType<typeof ThingComponent>
	knowsLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	legalAddress?: PostalAddress | ReturnType<typeof PostalAddressComponent>
	legalName?: Text
	legalRepresentative?: Person | ReturnType<typeof PersonComponent>
	leiCode?: Text
	location?:
		| Place
		| PostalAddress
		| Text
		| VirtualLocation
		| ReturnType<typeof PlaceComponent>
		| ReturnType<typeof PostalAddressComponent>
		| ReturnType<typeof VirtualLocationComponent>
	logo?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	makesOffer?: Offer | ReturnType<typeof OfferComponent>
	member?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	memberOf?:
		| MemberProgramTier
		| Organization
		| ProgramMembership
		| ReturnType<typeof MemberProgramTierComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof ProgramMembershipComponent>
	members?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	naics?: Text
	nonprofitStatus?: NonprofitType | ReturnType<typeof NonprofitTypeComponent>
	numberOfEmployees?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	ownershipFundingInfo?:
		| AboutPage
		| CreativeWork
		| Text
		| URL
		| ReturnType<typeof AboutPageComponent>
		| ReturnType<typeof CreativeWorkComponent>
	owns?:
		| OwnershipInfo
		| Product
		| ReturnType<typeof OwnershipInfoComponent>
		| ReturnType<typeof ProductComponent>
	parentOrganization?: Organization | ReturnType<typeof OrganizationComponent>
	publishingPrinciples?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	review?: Review | ReturnType<typeof ReviewComponent>
	reviews?: Review | ReturnType<typeof ReviewComponent>
	seeks?: Demand | ReturnType<typeof DemandComponent>
	serviceArea?:
		| AdministrativeArea
		| GeoShape
		| Place
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	skills?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	slogan?: Text
	sponsor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	subOrganization?: Organization | ReturnType<typeof OrganizationComponent>
	taxID?: Text
	telephone?: Text
	unnamedSourcesPolicy?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	vatID?: Text
}

type Organization = Thing & OrganizationProps

export default Organization
