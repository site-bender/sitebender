import type { Date, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type BreadcrumbList from "../../Intangible/ItemList/BreadcrumbList/index.ts"
import type ImageObject from "../MediaObject/ImageObject/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type SpeakableSpecification from "../../Intangible/SpeakableSpecification/index.ts"
import type Specialty from "../../Intangible/Enumeration/Specialty/index.ts"
import type WebPageElement from "../WebPageElement/index.ts"

import WebPageComponent from "../../../../../components/Thing/CreativeWork/WebPage/index.tsx"

export interface WebPageProps {
	breadcrumb?: BreadcrumbList | Text
	lastReviewed?: Date
	mainContentOfPage?: WebPageElement
	primaryImageOfPage?: ImageObject
	relatedLink?: URL
	reviewedBy?: Organization | Person
	significantLink?: URL
	significantLinks?: URL
	speakable?: SpeakableSpecification | URL
	specialty?: Specialty
}

type WebPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps

export default WebPage
