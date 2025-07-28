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

import ImageObjectComponent from "../../../../components/Thing/CreativeWork/MediaObject/ImageObject/index.ts"
import ThingComponent from "../../../../components/Thing/index.ts"
import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import CertificationStatusEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/CertificationStatusEnumeration/index.ts"
import RatingComponent from "../../../../components/Thing/Intangible/Rating/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"

export interface CertificationProps {
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
	validIn?: AdministrativeArea | ReturnType<typeof AdministrativeAreaComponent>
}

type Certification = Thing & CreativeWorkProps & CertificationProps

export default Certification
