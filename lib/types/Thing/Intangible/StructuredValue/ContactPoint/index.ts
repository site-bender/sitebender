import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type ContactPointOption from "../../Enumeration/ContactPointOption/index.ts"
import type GeoShape from "../GeoShape/index.ts"
import type Language from "../../Language/index.ts"
import type OpeningHoursSpecification from "../OpeningHoursSpecification/index.ts"
import type Place from "../../../Place/index.ts"
import type Product from "../../../Product/index.ts"

import ContactPointComponent from "../../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"

export interface ContactPointProps {
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	availableLanguage?: Language | Text
	contactOption?: ContactPointOption
	contactType?: Text
	email?: Text
	faxNumber?: Text
	hoursAvailable?: OpeningHoursSpecification
	productSupported?: Product | Text
	serviceArea?: AdministrativeArea | GeoShape | Place
	telephone?: Text
}

type ContactPoint =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ContactPointProps

export default ContactPoint
