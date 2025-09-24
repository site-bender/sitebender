import type { Date, Text, URL } from "../../DataType/index.ts"
import type Certification from "../CreativeWork/Certification/index.ts"
import type EducationalOccupationalCredential from "../CreativeWork/EducationalOccupationalCredential/index.ts"
import type CreativeWork from "../CreativeWork/index.ts"
import type Event from "../Event/index.ts"
import type Thing from "../index.ts"
import type Brand from "../Intangible/Brand/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Demand from "../Intangible/Demand/index.ts"
import type GenderType from "../Intangible/Enumeration/GenderType/index.ts"
import type Grant from "../Intangible/Grant/index.ts"
import type OfferCatalog from "../Intangible/ItemList/OfferCatalog/index.ts"
import type Language from "../Intangible/Language/index.ts"
import type MemberProgramTier from "../Intangible/MemberProgramTier/index.ts"
import type Occupation from "../Intangible/Occupation/index.ts"
import type Offer from "../Intangible/Offer/index.ts"
import type ProgramMembership from "../Intangible/ProgramMembership/index.ts"
import type Distance from "../Intangible/Quantity/Distance/index.ts"
import type Mass from "../Intangible/Quantity/Mass/index.ts"
import type ContactPoint from "../Intangible/StructuredValue/ContactPoint/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type StructuredValue from "../Intangible/StructuredValue/index.ts"
import type InteractionCounter from "../Intangible/StructuredValue/InteractionCounter/index.ts"
import type MonetaryAmount from "../Intangible/StructuredValue/MonetaryAmount/index.ts"
import type OwnershipInfo from "../Intangible/StructuredValue/OwnershipInfo/index.ts"
import type PriceSpecification from "../Intangible/StructuredValue/PriceSpecification/index.ts"
import type QuantitativeValue from "../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type EducationalOrganization from "../Organization/EducationalOrganization/index.ts"
import type Organization from "../Organization/index.ts"
import type Country from "../Place/AdministrativeArea/Country/index.ts"
import type Place from "../Place/index.ts"
import type Product from "../Product/index.ts"
import type { PatientType } from "./Patient/index.ts"

import CertificationComponent from "../../../../src/define/Thing/CreativeWork/Certification/index.tsx"
import EducationalOccupationalCredentialComponent from "../../../../src/define/Thing/CreativeWork/EducationalOccupationalCredential/index.tsx"
import CreativeWorkComponent from "../../../../src/define/Thing/CreativeWork/index.tsx"
import EventComponent from "../../../../src/define/Thing/Event/index.tsx"
import ThingComponent from "../../../../src/define/Thing/index.tsx"
import BrandComponent from "../../../../src/define/Thing/Intangible/Brand/index.tsx"
import DefinedTermComponent from "../../../../src/define/Thing/Intangible/DefinedTerm/index.tsx"
import DemandComponent from "../../../../src/define/Thing/Intangible/Demand/index.tsx"
import GenderTypeComponent from "../../../../src/define/Thing/Intangible/Enumeration/GenderType/index.tsx"
import GrantComponent from "../../../../src/define/Thing/Intangible/Grant/index.tsx"
import OfferCatalogComponent from "../../../../src/define/Thing/Intangible/ItemList/OfferCatalog/index.tsx"
import LanguageComponent from "../../../../src/define/Thing/Intangible/Language/index.tsx"
import MemberProgramTierComponent from "../../../../src/define/Thing/Intangible/MemberProgramTier/index.tsx"
import OccupationComponent from "../../../../src/define/Thing/Intangible/Occupation/index.tsx"
import OfferComponent from "../../../../src/define/Thing/Intangible/Offer/index.tsx"
import ProgramMembershipComponent from "../../../../src/define/Thing/Intangible/ProgramMembership/index.tsx"
import DistanceComponent from "../../../../src/define/Thing/Intangible/Quantity/Distance/index.tsx"
import MassComponent from "../../../../src/define/Thing/Intangible/Quantity/Mass/index.tsx"
import ContactPointComponent from "../../../../src/define/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"
import PostalAddressComponent from "../../../../src/define/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"
import StructuredValueComponent from "../../../../src/define/Thing/Intangible/StructuredValue/index.tsx"
import InteractionCounterComponent from "../../../../src/define/Thing/Intangible/StructuredValue/InteractionCounter/index.tsx"
import MonetaryAmountComponent from "../../../../src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import OwnershipInfoComponent from "../../../../src/define/Thing/Intangible/StructuredValue/OwnershipInfo/index.tsx"
import PriceSpecificationComponent from "../../../../src/define/Thing/Intangible/StructuredValue/PriceSpecification/index.tsx"
import QuantitativeValueComponent from "../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import EducationalOrganizationComponent from "../../../../src/define/Thing/Organization/EducationalOrganization/index.tsx"
import OrganizationComponent from "../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../src/define/Thing/Person/index.tsx"
import CountryComponent from "../../../../src/define/Thing/Place/AdministrativeArea/Country/index.tsx"
import PlaceComponent from "../../../../src/define/Thing/Place/index.tsx"
import ProductComponent from "../../../../src/define/Thing/Product/index.tsx"

export type PersonType = "Person" | PatientType

export interface PersonProps {
	"@type"?: PersonType
	additionalName?: Text
	address?: PostalAddress | Text | ReturnType<typeof PostalAddressComponent>
	affiliation?: Organization | ReturnType<typeof OrganizationComponent>
	agentInteractionStatistic?:
		| InteractionCounter
		| ReturnType<typeof InteractionCounterComponent>
	alumniOf?:
		| EducationalOrganization
		| Organization
		| ReturnType<typeof EducationalOrganizationComponent>
		| ReturnType<typeof OrganizationComponent>
	award?: Text
	awards?: Text
	birthDate?: Date
	birthPlace?: Place | ReturnType<typeof PlaceComponent>
	brand?:
		| Brand
		| Organization
		| ReturnType<typeof BrandComponent>
		| ReturnType<typeof OrganizationComponent>
	callSign?: Text
	child?: Person | ReturnType<typeof PersonComponent>
	colleague?: Person | URL | ReturnType<typeof PersonComponent>
	colleagues?: Person | ReturnType<typeof PersonComponent>
	contactPoint?: ContactPoint | ReturnType<typeof ContactPointComponent>
	contactPoints?: ContactPoint | ReturnType<typeof ContactPointComponent>
	deathDate?: Date
	deathPlace?: Place | ReturnType<typeof PlaceComponent>
	duns?: Text
	email?: Text
	familyName?: Text
	faxNumber?: Text
	follows?: Person | ReturnType<typeof PersonComponent>
	funder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	funding?: Grant | ReturnType<typeof GrantComponent>
	gender?: GenderType | Text | ReturnType<typeof GenderTypeComponent>
	givenName?: Text
	globalLocationNumber?: Text
	hasCertification?: Certification | ReturnType<typeof CertificationComponent>
	hasCredential?:
		| EducationalOccupationalCredential
		| ReturnType<typeof EducationalOccupationalCredentialComponent>
	hasOccupation?: Occupation | ReturnType<typeof OccupationComponent>
	hasOfferCatalog?: OfferCatalog | ReturnType<typeof OfferCatalogComponent>
	hasPOS?: Place | ReturnType<typeof PlaceComponent>
	height?:
		| Distance
		| QuantitativeValue
		| ReturnType<typeof DistanceComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	homeLocation?:
		| ContactPoint
		| Place
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof PlaceComponent>
	honorificPrefix?: Text
	honorificSuffix?: Text
	interactionStatistic?:
		| InteractionCounter
		| ReturnType<typeof InteractionCounterComponent>
	isicV4?: Text
	jobTitle?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	knows?: Person | ReturnType<typeof PersonComponent>
	knowsAbout?: Text | Thing | URL | ReturnType<typeof ThingComponent>
	knowsLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	makesOffer?: Offer | ReturnType<typeof OfferComponent>
	memberOf?:
		| MemberProgramTier
		| Organization
		| ProgramMembership
		| ReturnType<typeof MemberProgramTierComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof ProgramMembershipComponent>
	naics?: Text
	nationality?: Country | ReturnType<typeof CountryComponent>
	netWorth?:
		| MonetaryAmount
		| PriceSpecification
		| ReturnType<typeof MonetaryAmountComponent>
		| ReturnType<typeof PriceSpecificationComponent>
	owns?:
		| OwnershipInfo
		| Product
		| ReturnType<typeof OwnershipInfoComponent>
		| ReturnType<typeof ProductComponent>
	parent?: Person | ReturnType<typeof PersonComponent>
	parents?: Person | ReturnType<typeof PersonComponent>
	performerIn?: Event | ReturnType<typeof EventComponent>
	pronouns?:
		| DefinedTerm
		| StructuredValue
		| Text
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof StructuredValueComponent>
	publishingPrinciples?:
		| CreativeWork
		| URL
		| ReturnType<typeof CreativeWorkComponent>
	relatedTo?: Person | ReturnType<typeof PersonComponent>
	seeks?: Demand | ReturnType<typeof DemandComponent>
	sibling?: Person | ReturnType<typeof PersonComponent>
	siblings?: Person | ReturnType<typeof PersonComponent>
	skills?: DefinedTerm | Text | ReturnType<typeof DefinedTermComponent>
	sponsor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	spouse?: Person | ReturnType<typeof PersonComponent>
	taxID?: Text
	telephone?: Text
	vatID?: Text
	weight?:
		| Mass
		| QuantitativeValue
		| ReturnType<typeof MassComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	workLocation?:
		| ContactPoint
		| Place
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof PlaceComponent>
	worksFor?: Organization | ReturnType<typeof OrganizationComponent>
}

type Person = Thing & PersonProps

export default Person
