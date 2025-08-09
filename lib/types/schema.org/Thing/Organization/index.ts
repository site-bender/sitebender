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
import type { AirlineType } from "./Airline/index.ts"
import type { ConsortiumType } from "./Consortium/index.ts"
import type { CooperativeType } from "./Cooperative/index.ts"
import type { CorporationType } from "./Corporation/index.ts"
import type { EducationalOrganizationType } from "./EducationalOrganization/index.ts"
import type { FundingSchemeType } from "./FundingScheme/index.ts"
import type { GovernmentOrganizationType } from "./GovernmentOrganization/index.ts"
import type { LibrarySystemType } from "./LibrarySystem/index.ts"
import type { LocalBusinessType } from "./LocalBusiness/index.ts"
import type { MedicalOrganizationType } from "./MedicalOrganization/index.ts"
import type { NewsMediaOrganizationType } from "./NewsMediaOrganization/index.ts"
import type { NGOType } from "./NGO/index.ts"
import type { OnlineBusinessType } from "./OnlineBusiness/index.ts"
import type { PerformingGroupType } from "./PerformingGroup/index.ts"
import type { PoliticalPartyType } from "./PoliticalParty/index.ts"
import type { ProjectType } from "./Project/index.ts"
import type { ResearchOrganizationType } from "./ResearchOrganization/index.ts"
import type { SearchRescueOrganizationType } from "./SearchRescueOrganization/index.ts"
import type { SportsOrganizationType } from "./SportsOrganization/index.ts"
import type { WorkersUnionType } from "./WorkersUnion/index.ts"

import { AboutPage as AboutPageComponent } from "../../../../components/index.tsx"
import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../components/index.tsx"
import { AggregateRating as AggregateRatingComponent } from "../../../../components/index.tsx"
import { Article as ArticleComponent } from "../../../../components/index.tsx"
import { Brand as BrandComponent } from "../../../../components/index.tsx"
import { Certification as CertificationComponent } from "../../../../components/index.tsx"
import { ContactPoint as ContactPointComponent } from "../../../../components/index.tsx"
import { CreativeWork as CreativeWorkComponent } from "../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../components/index.tsx"
import { Demand as DemandComponent } from "../../../../components/index.tsx"
import { EducationalOccupationalCredential as EducationalOccupationalCredentialComponent } from "../../../../components/index.tsx"
import { Event as EventComponent } from "../../../../components/index.tsx"
import { GeoShape as GeoShapeComponent } from "../../../../components/index.tsx"
import { Grant as GrantComponent } from "../../../../components/index.tsx"
import { ImageObject as ImageObjectComponent } from "../../../../components/index.tsx"
import { InteractionCounter as InteractionCounterComponent } from "../../../../components/index.tsx"
import { Language as LanguageComponent } from "../../../../components/index.tsx"
import { LoanOrCredit as LoanOrCreditComponent } from "../../../../components/index.tsx"
import { MemberProgram as MemberProgramComponent } from "../../../../components/index.tsx"
import { MemberProgramTier as MemberProgramTierComponent } from "../../../../components/index.tsx"
import { MerchantReturnPolicy as MerchantReturnPolicyComponent } from "../../../../components/index.tsx"
import { NonprofitType as NonprofitTypeComponent } from "../../../../components/index.tsx"
import { Offer as OfferComponent } from "../../../../components/index.tsx"
import { OfferCatalog as OfferCatalogComponent } from "../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../components/index.tsx"
import { OwnershipInfo as OwnershipInfoComponent } from "../../../../components/index.tsx"
import { PaymentMethod as PaymentMethodComponent } from "../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../components/index.tsx"
import { PostalAddress as PostalAddressComponent } from "../../../../components/index.tsx"
import { Product as ProductComponent } from "../../../../components/index.tsx"
import { ProgramMembership as ProgramMembershipComponent } from "../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../components/index.tsx"
import { Review as ReviewComponent } from "../../../../components/index.tsx"
import { ShippingService as ShippingServiceComponent } from "../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../components/index.tsx"
import { VirtualLocation as VirtualLocationComponent } from "../../../../components/index.tsx"

export type OrganizationType =
	| "Organization"
	| ResearchOrganizationType
	| OnlineBusinessType
	| ConsortiumType
	| SportsOrganizationType
	| PoliticalPartyType
	| NewsMediaOrganizationType
	| CooperativeType
	| EducationalOrganizationType
	| SearchRescueOrganizationType
	| ProjectType
	| MedicalOrganizationType
	| PerformingGroupType
	| GovernmentOrganizationType
	| FundingSchemeType
	| CorporationType
	| NGOType
	| LocalBusinessType
	| AirlineType
	| LibrarySystemType
	| WorkersUnionType

export interface OrganizationProps {
	"@type"?: OrganizationType
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
