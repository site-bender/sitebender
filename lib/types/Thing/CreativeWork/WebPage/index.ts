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

import ImageObjectComponent from "../../../../components/Thing/CreativeWork/MediaObject/ImageObject/index.ts"
import WebPageElementComponent from "../../../../components/Thing/CreativeWork/WebPageElement/index.ts"
import SpecialtyComponent from "../../../../components/Thing/Intangible/Enumeration/Specialty/index.ts"
import BreadcrumbListComponent from "../../../../components/Thing/Intangible/ItemList/BreadcrumbList/index.ts"
import SpeakableSpecificationComponent from "../../../../components/Thing/Intangible/SpeakableSpecification/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface WebPageProps {
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
