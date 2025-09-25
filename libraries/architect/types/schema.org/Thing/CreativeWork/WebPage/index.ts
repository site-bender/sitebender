import type { Date, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Specialty from "../../Intangible/Enumeration/Specialty/index.ts"
import type BreadcrumbList from "../../Intangible/ItemList/BreadcrumbList/index.ts"
import type SpeakableSpecification from "../../Intangible/SpeakableSpecification/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type ImageObject from "../MediaObject/ImageObject/index.ts"
import type WebPageElement from "../WebPageElement/index.ts"
import type { AboutPageType } from "./AboutPage/index.ts"
import type { CheckoutPageType } from "./CheckoutPage/index.ts"
import type { CollectionPageType } from "./CollectionPage/index.ts"
import type { ContactPageType } from "./ContactPage/index.ts"
import type { FAQPageType } from "./FAQPage/index.ts"
import type { ItemPageType } from "./ItemPage/index.ts"
import type { MedicalWebPageType } from "./MedicalWebPage/index.ts"
import type { ProfilePageType } from "./ProfilePage/index.ts"
import type { QAPageType } from "./QAPage/index.ts"
import type { RealEstateListingType } from "./RealEstateListing/index.ts"
import type { SearchResultsPageType } from "./SearchResultsPage/index.ts"

import ImageObjectComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"
import WebPageElementComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/WebPageElement/index.tsx"
import SpecialtyComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/Specialty/index.tsx"
import BreadcrumbListComponent from "../../../../../../pagewright/src/define/Thing/Intangible/ItemList/BreadcrumbList/index.tsx"
import SpeakableSpecificationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/SpeakableSpecification/index.tsx"
import OrganizationComponent from "../../../../../../pagewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../pagewright/src/define/Thing/Person/index.tsx"

export type WebPageType =
	| "WebPage"
	| ContactPageType
	| CheckoutPageType
	| MedicalWebPageType
	| RealEstateListingType
	| FAQPageType
	| CollectionPageType
	| AboutPageType
	| SearchResultsPageType
	| QAPageType
	| ItemPageType
	| ProfilePageType

export interface WebPageProps {
	"@type"?: WebPageType
	breadcrumb?:
		| BreadcrumbList
		| Text
		| ReturnType<typeof BreadcrumbListComponent>
	lastReviewed?: Date
	mainContentOfPage?:
		| WebPageElement
		| ReturnType<typeof WebPageElementComponent>
	primaryImageOfPage?: ImageObject | ReturnType<typeof ImageObjectComponent>
	relatedLink?: URL
	reviewedBy?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	significantLink?: URL
	significantLinks?: URL
	speakable?:
		| SpeakableSpecification
		| URL
		| ReturnType<typeof SpeakableSpecificationComponent>
	specialty?: Specialty | ReturnType<typeof SpecialtyComponent>
}

type WebPage = Thing & CreativeWorkProps & WebPageProps

export default WebPage
