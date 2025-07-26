import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type CertificationStatusEnumeration from "../../Intangible/Enumeration/CertificationStatusEnumeration/index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type ImageObject from "../MediaObject/ImageObject/index.ts"
import type Organization from "../../Organization/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Rating from "../../Intangible/Rating/index.ts"

export interface CertificationProps {
	about?: Thing
	auditDate?: Date | DateTime
	certificationIdentification?: DefinedTerm | Text
	certificationRating?: Rating
	certificationStatus?: CertificationStatusEnumeration
	datePublished?: Date | DateTime
	expires?: Date | DateTime
	hasMeasurement?: QuantitativeValue
	issuedBy?: Organization
	logo?: ImageObject | URL
	validFrom?: Date | DateTime
	validIn?: AdministrativeArea
}

type Certification =
	& Thing
	& CreativeWorkProps
	& CertificationProps

export default Certification
