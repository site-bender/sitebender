import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"
import type { StructuredValueProps } from "../index.ts"

import { Country as CountryComponent } from "../../../../../../components/index.tsx"
import { PostalAddress as PostalAddressComponent } from "../../../../../../components/index.tsx"

export type GeoCoordinatesType = "GeoCoordinates"

export interface GeoCoordinatesProps {
	"@type"?: GeoCoordinatesType
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
