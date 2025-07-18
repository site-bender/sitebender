import type { Text } from "../../../../../DataType/index.ts"
import type ScholarlyArticle from "../index.ts"

export default interface MedicalScholarlyArticle extends ScholarlyArticle {
	/** The type of the medical article, taken from the US NLM MeSH publication type catalog. See also [MeSH documentation](http://www.nlm.nih.gov/mesh/pubtypes.html). */
	publicationType?: Text
}
