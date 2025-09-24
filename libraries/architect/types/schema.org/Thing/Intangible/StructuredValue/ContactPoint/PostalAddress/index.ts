import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type Country from "../../../../Place/AdministrativeArea/Country/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { ContactPointProps } from "../index.ts"

import CountryComponent from "../../../../../../../../codewright/src/define/Thing/Place/AdministrativeArea/Country/index.tsx"

export type PostalAddressType = "PostalAddress"

export interface PostalAddressProps {
	"@type"?: PostalAddressType
	addressCountry?: Country | Text | ReturnType<typeof CountryComponent>
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
