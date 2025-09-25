import type { Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"

import DefinedTermComponent from "../../../../src/define/Thing/Intangible/DefinedTerm/index.tsx"
import PropertyValueComponent from "../../../../src/define/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"
import TaxonComponent from "../../../../src/define/Thing/Taxon/index.tsx"

export type TaxonType = "Taxon"

export interface TaxonProps {
	"@type"?: TaxonType
	childTaxon?: Taxon | Text | URL | ReturnType<typeof TaxonComponent>
	hasDefinedTerm?: DefinedTerm | ReturnType<typeof DefinedTermComponent>
	parentTaxon?: Taxon | Text | URL | ReturnType<typeof TaxonComponent>
	taxonRank?:
		| PropertyValue
		| Text
		| URL
		| ReturnType<typeof PropertyValueComponent>
}

type Taxon = Thing & TaxonProps

export default Taxon
