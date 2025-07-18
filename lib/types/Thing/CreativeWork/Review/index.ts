import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type ListItem from "../../Intangible/ListItem/index.ts"
import type Rating from "../../Intangible/Rating/index.ts"
import type CreativeWork from "../index.ts"
import type WebContent from "../WebContent/index.ts"

export default interface Review extends CreativeWork {
	/** An associated [[ClaimReview]], related by specific common content, topic or claim. The expectation is that this property would be most typically used in cases where a single activity is conducting both claim reviews and media reviews, in which case [[relatedMediaReview]] would commonly be used on a [[ClaimReview]], while [[relatedClaimReview]] would be used on [[MediaReview]]. */
	associatedClaimReview?: Review
	/** An associated [[MediaReview]], related by specific common content, topic or claim. The expectation is that this property would be most typically used in cases where a single activity is conducting both claim reviews and media reviews, in which case [[relatedMediaReview]] would commonly be used on a [[ClaimReview]], while [[relatedClaimReview]] would be used on [[MediaReview]]. */
	associatedMediaReview?: Review
	/** An associated [[Review]]. */
	associatedReview?: Review
	/** The item that is being reviewed/rated. */
	itemReviewed?: Thing
	/** Provides negative considerations regarding something, most typically in pro/con lists for reviews (alongside [[positiveNotes]]). For symmetry   In the case of a [[Review]], the property describes the [[itemReviewed]] from the perspective of the review; in the case of a [[Product]], the product itself is being described. Since product descriptions  tend to emphasise positive claims, it may be relatively unusual to find [[negativeNotes]] used in this way. Nevertheless for the sake of symmetry, [[negativeNotes]] can be used on [[Product]].  The property values can be expressed either as unstructured text (repeated as necessary), or if ordered, as a list (in which case the most negative is at the beginning of the list). */
	negativeNotes?: ListItem | WebContent | ItemList | Text
	/** Provides positive considerations regarding something, for example product highlights or (alongside [[negativeNotes]]) pro/con lists for reviews.  In the case of a [[Review]], the property describes the [[itemReviewed]] from the perspective of the review; in the case of a [[Product]], the product itself is being described.  The property values can be expressed either as unstructured text (repeated as necessary), or if ordered, as a list (in which case the most positive is at the beginning of the list). */
	positiveNotes?: ListItem | ItemList | WebContent | Text
	/** This Review or Rating is relevant to this part or facet of the itemReviewed. */
	reviewAspect?: Text
	/** The actual body of the review. */
	reviewBody?: Text
	/** The rating given in this review. Note that reviews can themselves be rated. The ```reviewRating``` applies to rating given by the review. The [[aggregateRating]] property applies to the review itself, as a creative work. */
	reviewRating?: Rating
}
