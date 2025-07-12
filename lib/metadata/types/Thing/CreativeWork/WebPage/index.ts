import type { Date, Text } from "../../../DataType/index.ts"
import type {
	BreadcrumbList,
	ImageObject,
	SpeakableSpecification,
	URL,
	WebPageElement,
} from "../../index.ts"
import type { Organization } from "../../Organization/index.ts"
import type { Person } from "../../Person/index.ts"
import type { CreativeWork } from "../index.ts"

// WebPage interface - extends CreativeWork
// A web page. Every web page is implicitly assumed to be declared to be of type WebPage.
export interface WebPage extends CreativeWork {
	breadcrumb?: BreadcrumbList | Text
	lastReviewed?: Date
	mainContentOfPage?: WebPageElement
	primaryImageOfPage?: ImageObject
	relatedLink?: URL
	reviewedBy?: Organization | Person
	significantLink?: URL
	speakable?: SpeakableSpecification | URL
}
