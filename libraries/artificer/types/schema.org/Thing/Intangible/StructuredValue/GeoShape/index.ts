import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type { GeoCircleType } from "./GeoCircle/index.ts"

import PostalAddressComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"
import CountryComponent from "../../../../../../../architect/src/define/Thing/Place/AdministrativeArea/Country/index.tsx"

export type GeoShapeType = "GeoShape" | GeoCircleType

export interface GeoShapeProps {
	"@type"?: GeoShapeType
	address?: PostalAddress | Text | ReturnType<typeof PostalAddressComponent>
	addressCountry?: Country | Text | ReturnType<typeof CountryComponent>
	box?: Text
	circle?: Text
	elevation?: Number | Text
	line?: Text
	polygon?: Text
	postalCode?: Text
}

type GeoShape = Thing & IntangibleProps & StructuredValueProps & GeoShapeProps

export default GeoShape
