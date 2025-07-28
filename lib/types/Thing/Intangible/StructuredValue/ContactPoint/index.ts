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

import ContactPointOptionComponent from "../../../../../components/Thing/Intangible/Enumeration/ContactPointOption/index.ts"
import LanguageComponent from "../../../../../components/Thing/Intangible/Language/index.ts"
import GeoShapeComponent from "../../../../../components/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import OpeningHoursSpecificationComponent from "../../../../../components/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.ts"
import AdministrativeAreaComponent from "../../../../../components/Thing/Place/AdministrativeArea/index.ts"
import PlaceComponent from "../../../../../components/Thing/Place/index.ts"
import ProductComponent from "../../../../../components/Thing/Product/index.ts"

export interface ContactPointProps {
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
