import type { Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"

export interface TaxonProps {
	childTaxon?: Taxon | Text | URL
	hasDefinedTerm?: DefinedTerm
	parentTaxon?: Taxon | Text | URL
	taxonRank?: PropertyValue | Text | URL
}

type Taxon =
	& Thing
	& TaxonProps

export default Taxon
