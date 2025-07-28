import type { Text, URL } from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"

import DefinedTermComponent from "../../../components/Thing/Intangible/DefinedTerm/index.ts"
import PropertyValueComponent from "../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import TaxonComponent from "../../../components/Thing/Taxon/index.ts"

export interface TaxonProps {
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
