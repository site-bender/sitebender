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

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../../components/index.tsx"
import { ContactPointOption as ContactPointOptionComponent } from "../../../../../../components/index.tsx"
import { GeoShape as GeoShapeComponent } from "../../../../../../components/index.tsx"
import { Language as LanguageComponent } from "../../../../../../components/index.tsx"
import { OpeningHoursSpecification as OpeningHoursSpecificationComponent } from "../../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../../components/index.tsx"
import { Product as ProductComponent } from "../../../../../../components/index.tsx"

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
