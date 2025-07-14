import { Text, URL } from "../../DataType/index.ts"
import Thing from "../index.ts"
import DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"

export default interface Taxon extends Thing {
	/** Closest child taxa of the taxon in question. */
	childTaxon?: Taxon | Text | URL
	/** A Defined Term contained in this term set. */
	hasDefinedTerm?: DefinedTerm
	/** Closest parent taxon of the taxon in question. */
	parentTaxon?: Taxon | Text | URL
	/** The taxonomic rank of this taxon given preferably as a URI from a controlled vocabulary – typically the ranks from TDWG TaxonRank ontology or equivalent Wikidata URIs. */
	taxonRank?: PropertyValue | URL | Text
}
