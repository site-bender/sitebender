import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type PostalCodeRangeSpecification from "../PostalCodeRangeSpecification/index.ts"

import { Country as CountryComponent } from "../../../../../../components/index.tsx"
import { PostalCodeRangeSpecification as PostalCodeRangeSpecificationComponent } from "../../../../../../components/index.tsx"

export type DefinedRegionType = "DefinedRegion"

export interface DefinedRegionProps {
	"@type"?: DefinedRegionType
	addressCountry?: Country | Text | ReturnType<typeof CountryComponent>
	addressRegion?: Text
	postalCode?: Text
	postalCodePrefix?: Text
	postalCodeRange?:
		| PostalCodeRangeSpecification
		| ReturnType<typeof PostalCodeRangeSpecificationComponent>
}

type DefinedRegion =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& DefinedRegionProps

export default DefinedRegion
