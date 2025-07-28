import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"

import GeoCoordinatesComponent from "../../../../../../components/Thing/Intangible/StructuredValue/GeoCoordinates/index.tsx"

export interface GeoCoordinatesProps {
	address?: PostalAddress | Text
	addressCountry?: Country | Text
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
