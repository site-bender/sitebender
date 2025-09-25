import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type Place from "../../../Place/index.ts"
import type Product from "../../../Product/index.ts"
import type ContactPointOption from "../../Enumeration/ContactPointOption/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Language from "../../Language/index.ts"
import type GeoShape from "../GeoShape/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type { PostalAddressType } from "./PostalAddress/index.ts"

import ContactPointOptionComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/ContactPointOption/index.tsx"
import LanguageComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/Language/index.tsx"
import GeoShapeComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/GeoShape/index.tsx"
import OpeningHoursSpecificationComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.tsx"
import AdministrativeAreaComponent from "../../../../../../../pagewright/src/define/Thing/Place/AdministrativeArea/index.tsx"
import PlaceComponent from "../../../../../../../pagewright/src/define/Thing/Place/index.tsx"
import ProductComponent from "../../../../../../../pagewright/src/define/Thing/Product/index.tsx"

export type ContactPointType = "ContactPoint" | PostalAddressType

export interface ContactPointProps {
	"@type"?: ContactPointType
	areaServed?:
		| AdministrativeArea
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	availableLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	contactOption?:
		| ContactPointOption
		| ReturnType<typeof ContactPointOptionComponent>
	contactType?: Text
	email?: Text
	faxNumber?: Text
	hoursAvailable?:
		| OpeningHoursSpecification
		| ReturnType<typeof OpeningHoursSpecificationComponent>
	productSupported?: Product | Text | ReturnType<typeof ProductComponent>
	serviceArea?:
		| AdministrativeArea
		| GeoShape
		| Place
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	telephone?: Text
}

type ContactPoint =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ContactPointProps

export default ContactPoint
