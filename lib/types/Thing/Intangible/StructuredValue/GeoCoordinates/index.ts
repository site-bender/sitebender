import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"
import type { StructuredValueProps } from "../index.ts"

import PostalAddressComponent from "../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import CountryComponent from "../../../../../components/Thing/Place/AdministrativeArea/Country/index.ts"

export interface GeoCoordinatesProps {
	"@type"?: "GeoCoordinates"
	address?: PostalAddress | Text | ReturnType<typeof PostalAddressComponent>
	addressCountry?: Country | Text | ReturnType<typeof CountryComponent>
	elevation?: Number | Text
	latitude?: Number | Text
	longitude?: Number | Text
	postalCode?: Text
}

type GeoCoordinates =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& GeoCoordinatesProps

export default GeoCoordinates
