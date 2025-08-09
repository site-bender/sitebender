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

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"
import { CertificationStatusEnumeration as CertificationStatusEnumerationComponent } from "../../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../../components/index.tsx"
import { ImageObject as ImageObjectComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"
import { Rating as RatingComponent } from "../../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../../components/index.tsx"

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
	validIn?: AdministrativeArea | ReturnType<typeof AdministrativeAreaComponent>
}

type Certification = Thing & CreativeWorkProps & CertificationProps

export default Certification
