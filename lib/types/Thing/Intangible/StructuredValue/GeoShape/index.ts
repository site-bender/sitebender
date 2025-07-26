import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type PostalAddress from "../ContactPoint/PostalAddress/index.ts"

export interface GeoShapeProps {
	address?: PostalAddress | Text
	addressCountry?: Country | Text
	box?: Text
	circle?: Text
	elevation?: Number | Text
	line?: Text
	polygon?: Text
	postalCode?: Text
}

type GeoShape =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& GeoShapeProps

export default GeoShape
