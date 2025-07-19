import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type CertificationStatusEnumeration from "../../Intangible/Enumeration/CertificationStatusEnumeration/index.ts"
import type Rating from "../../Intangible/Rating/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type ImageObject from "../MediaObject/ImageObject/index.ts"

export interface CertificationProps {
	/** The subject matter of the content. */
	about?: Thing
	/** Date when a certification was last audited. See also  [gs1:certificationAuditDate](https://www.gs1.org/voc/certificationAuditDate). */
	auditDate?: Date | DateTime
	/** Identifier of a certification instance (as registered with an independent certification body). Typically this identifier can be used to consult and verify the certification instance. See also [gs1:certificationIdentification](https://www.gs1.org/voc/certificationIdentification). */
	certificationIdentification?: Text | DefinedTerm
	/** Rating of a certification instance (as defined by an independent certification body). Typically this rating can be used to rate the level to which the requirements of the certification instance are fulfilled. See also [gs1:certificationValue](https://www.gs1.org/voc/certificationValue). */
	certificationRating?: Rating
	/** Indicates the current status of a certification: active or inactive. See also  [gs1:certificationStatus](https://www.gs1.org/voc/certificationStatus). */
	certificationStatus?: CertificationStatusEnumeration
	/** Date of first publication or broadcast. For example the date a [[CreativeWork]] was broadcast or a [[Certification]] was issued. */
	datePublished?: Date | DateTime
	/** Date the content expires and is no longer useful or available. For example a [[VideoObject]] or [[NewsArticle]] whose availability or relevance is time-limited, a [[ClaimReview]] fact check whose publisher wants to indicate that it may no longer be relevant (or helpful to highlight) after some date, or a [[Certification]] the validity has expired. */
	expires?: DateTime | Date
	/** A measurement of an item, For example, the inseam of pants, the wheel size of a bicycle, the gauge of a screw, or the carbon footprint measured for certification by an authority. Usually an exact measurement, but can also be a range of measurements for adjustable products, for example belts and ski bindings. */
	hasMeasurement?: QuantitativeValue
	/** The organization issuing the item, for example a [[Permit]], [[Ticket]], or [[Certification]]. */
	issuedBy?: Organization
	/** An associated logo. */
	logo?: URL | ImageObject
	/** The date when the item becomes valid. */
	validFrom?: Date | DateTime
	/** The geographic area where the item is valid. Applies for example to a [[Permit]], a [[Certification]], or an [[EducationalOccupationalCredential]]. */
	validIn?: AdministrativeArea
}

type Certification =
	& Thing
	& CreativeWorkProps
	& CertificationProps

export default Certification
