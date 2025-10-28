import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DefinedTerm from "../../Intangible/DefinedTerm/index.ts"
import type CertificationStatusEnumeration from "../../Intangible/Enumeration/CertificationStatusEnumeration/index.ts"
import type Rating from "../../Intangible/Rating/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../../Organization/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type ImageObject from "../MediaObject/ImageObject/index.ts"

import ImageObjectComponent from "../../../../../src/define/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"
import ThingComponent from "../../../../../src/define/Thing/index.tsx"
import DefinedTermComponent from "../../../../../src/define/Thing/Intangible/DefinedTerm/index.tsx"
import CertificationStatusEnumerationComponent from "../../../../../src/define/Thing/Intangible/Enumeration/CertificationStatusEnumeration/index.tsx"
import RatingComponent from "../../../../../src/define/Thing/Intangible/Rating/index.tsx"
import QuantitativeValueComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"
import AdministrativeAreaComponent from "../../../../../src/define/Thing/Place/AdministrativeArea/index.tsx"

export type CertificationType = "Certification"

export interface CertificationProps {
	"@type"?: CertificationType
	about?: Thing | ReturnType<typeof ThingComponent>
	auditDate?: Date | DateTime
	certificationIdentification?:
		| DefinedTerm
		| Text
		| ReturnType<typeof DefinedTermComponent>
	certificationRating?: Rating | ReturnType<typeof RatingComponent>
	certificationStatus?:
		| CertificationStatusEnumeration
		| ReturnType<typeof CertificationStatusEnumerationComponent>
	datePublished?: Date | DateTime
	expires?: Date | DateTime
	hasMeasurement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	issuedBy?: Organization | ReturnType<typeof OrganizationComponent>
	logo?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	validFrom?: Date | DateTime
	validIn?:
		| AdministrativeArea
		| ReturnType<typeof AdministrativeAreaComponent>
}

type Certification = Thing & CreativeWorkProps & CertificationProps

export default Certification
