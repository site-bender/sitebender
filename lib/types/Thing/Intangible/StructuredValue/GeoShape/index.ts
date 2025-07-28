import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"
import type { StructuredValueProps } from "../index.ts"

import PostalAddressComponent from "../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import CountryComponent from "../../../../../components/Thing/Place/AdministrativeArea/Country/index.ts"

export interface GeoShapeProps {
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
