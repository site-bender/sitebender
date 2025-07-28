import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { ContactPointProps } from "../index.ts"
import type Country from "../../../../Place/AdministrativeArea/Country/index.ts"

import PostalAddressComponent from "../../../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"

export interface PostalAddressProps {
	addressCountry?: Country | Text
	addressLocality?: Text
	addressRegion?: Text
	extendedAddress?: Text
	postalCode?: Text
	postOfficeBoxNumber?: Text
	streetAddress?: Text
}

type PostalAddress =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ContactPointProps
	& PostalAddressProps

export default PostalAddress
