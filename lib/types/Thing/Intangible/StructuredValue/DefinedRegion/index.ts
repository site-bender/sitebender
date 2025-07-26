import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type Country from "../../../Place/AdministrativeArea/Country/index.ts"
import type PostalCodeRangeSpecification from "../PostalCodeRangeSpecification/index.ts"

export interface DefinedRegionProps {
	addressCountry?: Country | Text
	addressRegion?: Text
	postalCode?: Text
	postalCodePrefix?: Text
	postalCodeRange?: PostalCodeRangeSpecification
}

type DefinedRegion =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& DefinedRegionProps

export default DefinedRegion
