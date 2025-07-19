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

export interface WebPageProps {
	/** A set of links that can help a user understand and navigate a website hierarchy. */
	breadcrumb?: BreadcrumbList | Text
	/** Date on which the content on this web page was last reviewed for accuracy and/or completeness. */
	lastReviewed?: Date
	/** Indicates if this web page element is the main subject of the page. */
	mainContentOfPage?: WebPageElement
	/** Indicates the main image on the page. */
	primaryImageOfPage?: ImageObject
	/** A link related to this web page, for example to other related web pages. */
	relatedLink?: URL
	/** People or organizations that have reviewed the content on this web page for accuracy and/or completeness. */
	reviewedBy?: Organization | Person
	/** One of the more significant URLs on the page. Typically, these are the non-navigation links that are clicked on the most. */
	significantLink?: URL
	/** The most significant URLs on the page. Typically, these are the non-navigation links that are clicked on the most. */
	significantLinks?: URL
	/** Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally useful for speech.  The *speakable* property can be repeated an arbitrary number of times, with three kinds of possible 'content-locator' values:  1.) *id-value* URL references - uses *id-value* of an element in the page being annotated. The simplest use of *speakable* has (potentially relative) URL values, referencing identified sections of the document concerned.  2.) CSS Selectors - addresses content in the annotated page, e.g. via class attribute. Use the [[cssSelector]] property.  3.)  XPaths - addresses content via XPaths (assuming an XML view of the content). Use the [[xpath]] property.   For more sophisticated markup of speakable sections beyond simple ID references, either CSS selectors or XPath expressions to pick out document section(s) as speakable. For this we define a supporting type, [[SpeakableSpecification]]  which is defined to be a possible value of the *speakable* property. */
	speakable?: SpeakableSpecification | URL
	/** One of the domain specialities to which this web page's content applies. */
	specialty?: Specialty
}

type WebPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps

export default WebPage
